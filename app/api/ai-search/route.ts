import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { parseQuery, rankResources, generateAIOverview } from '../../utils/searchEngine';
import resourcesData from '../../Northern Virginia Community Resources.json';
import { CommunityResource } from '../../types/resource';

// If the API key is available initialize it 
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { query, filterFreeOnly, selectedCategories, selectedCity } = body;

        // 1. Initial Filtering (Deterministic)
        // We use our existing fast algorithm to filter and get the top 20 candidates to avoid sending the entire database to the LLM (saves time & credits)
        const typedResources = resourcesData as CommunityResource[];
        let candidates = typedResources;

        // Apply strict filters first
        if (filterFreeOnly) {
            candidates = candidates.filter(r => r.is_free_service);
        }
        if (selectedCategories && selectedCategories.length > 0) {
            candidates = candidates.filter(r => selectedCategories.includes(r.category));
        }
        if (selectedCity) {
            candidates = candidates.filter(r => r.city === selectedCity);
        }

        // Rank remaining candidates based on the query to find top 20
        const parsed = parseQuery(query || "");
        let rankedCandidates = rankResources(candidates, parsed, { strict: true });
        let isFallback = false;

        // If the strict filters + strict ranking yielded 0 results, execute a LOOSE pass against the ENTIRE database
        // This ensures the user *never* sees an empty screen, as requested.
        if (rankedCandidates.length === 0) {
            isFallback = true;
            // Bypass user filters (candidates) and use the raw typedResources
            rankedCandidates = rankResources(typedResources, parsed, { strict: false });

            // If even the loose text search found absolutely nothing (e.g., gibberish search),
            // fulfill the user constraint to *never* show 0 results by grabbing 5 default generic resources.
            if (rankedCandidates.length === 0) {
                rankedCandidates = typedResources
                    .slice(0, 5)
                    .map(r => ({ ...r, matchScore: 1 }));
            }
        }

        // If there is no query, or we found matches, take the top 20
        const top20 = rankedCandidates.slice(0, 20);

        let lastAiError = null;

        // 2. AI Semantic Processing
        // We only invoke the expensive LLM if we found *strict* matches. 
        // If we are in fallback mode, we skip the LLM because it might hallucinate connections.
        if (!isFallback && genAI && query?.trim()?.length > 0 && top20.length > 0) {
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: { responseMimeType: "application/json" } });

                const prompt = `
                You are a helpful community resource assistant for Northern Virginia.
                The user is searching for: "${query}"
                
                Here are the top potential matches from our local database (JSON):
                ${JSON.stringify(top20.map(r => ({ name: r.name, description: r.short_description, city: r.city, category: r.category, free: r.is_free_service, languages: r.languages_supported })), null, 2)}
                
                Your task is to:
                1. Semantically analyze the user's query and the provided JSON resources.
                2. Select the absolute best 1 to 5 resources from the provided JSON that match the user's intent.
                3. Author a 1-2 sentence "preRailText" that introduces the resources found and mentions the geographic area (act like a Google AI Overview).
                4. Author a 1-2 sentence "postRailText" that follows up, referencing 1 or 2 of the top organizations by name to summarize how they help.
                
                Return exactly this JSON format:
                {
                    "preRailText": "string",
                    "postRailText": "string",
                    "topResourceNames": ["string", "string"] // Array of the exact "name" fields of the best resources you selected
                }
                `;

                const result = await model.generateContent(prompt);
                const text = result.response.text();
                const aiResponse = JSON.parse(text);

                // Map the returned names back to the full resource objects
                const finalResources = aiResponse.topResourceNames
                    .map((name: string) => top20.find(r => r.name === name))
                    .filter(Boolean);

                // Ensure we return *something* even if the AI filtered out everything
                if (finalResources.length > 0) {
                    return NextResponse.json({
                        preRailText: aiResponse.preRailText,
                        postRailText: aiResponse.postRailText,
                        results: finalResources,
                        totalCount: rankedCandidates.length,
                        isAI: true,
                        isFallback: false
                    });
                }
            } catch (aiError: any) {
                console.warn("AI Generation Failed or timed out. Falling back to deterministic engine.", aiError);
                lastAiError = aiError.message || String(aiError);
                // Fall down to the deterministic return below
            }
        }

        // 3. Deterministic / Fallback Engine
        // This guarantees we search the FULL JSON file using the robust deterministic engine we built earlier
        const fallbackResults = rankedCandidates.slice(0, 5); // Take top 5 from the ranked dataset
        const fallbackOverview = generateAIOverview(parsed, fallbackResults, rankedCandidates.length, isFallback);

        return NextResponse.json({
            preRailText: fallbackOverview.preRailText,
            postRailText: fallbackOverview.postRailText,
            results: fallbackResults,
            totalCount: rankedCandidates.length,
            isAI: false,
            isFallback: isFallback,
            errorDebug: lastAiError
        });

    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
