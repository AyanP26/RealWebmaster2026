import { CommunityResource } from "../types/resource";

// --- Configuration & Dictionaries ---

// Map common keywords to official schema categories
const CATEGORY_MAP: Record<string, string> = {
    "food": "Food & Basic Needs",
    "pantry": "Food & Basic Needs",
    "pantries": "Food & Basic Needs",
    "groceries": "Food & Basic Needs",
    "meals": "Food & Basic Needs",
    "bank": "Food & Basic Needs",
    "shelter": "Food & Basic Needs",
    "shelters": "Food & Basic Needs",
    "homeless": "Food & Basic Needs",
    "hospital": "Healthcare & Mental Health",
    "hospitals": "Healthcare & Mental Health",
    "clinic": "Healthcare & Mental Health",
    "clinics": "Healthcare & Mental Health",
    "doctor": "Healthcare & Mental Health",
    "doctors": "Healthcare & Mental Health",
    "medical": "Healthcare & Mental Health",
    "health": "Healthcare & Mental Health",
    "mental": "Healthcare & Mental Health",
    "therapy": "Healthcare & Mental Health",
    "counseling": "Healthcare & Mental Health",
    "library": "Education & Libraries",
    "libraries": "Education & Libraries",
    "books": "Education & Libraries",
    "school": "Education & Libraries",
    "schools": "Education & Libraries",
    "education": "Education & Libraries",
    "job": "Government & Legal Services",
    "jobs": "Government & Legal Services",
    "career": "Government & Legal Services",
    "careers": "Government & Legal Services",
    "resume": "Government & Legal Services",
    "employment": "Government & Legal Services",
    "legal": "Government & Legal Services",
    "lawyer": "Government & Legal Services",
    "lawyers": "Government & Legal Services",
    "attorney": "Government & Legal Services",
    "attorneys": "Government & Legal Services",
    "youth": "Community & Recreation",
    "family": "Community & Recreation",
    "families": "Community & Recreation",
    "kids": "Community & Recreation",
    "child": "Community & Recreation",
    "children": "Community & Recreation",
    "senior": "Community & Recreation",
    "seniors": "Community & Recreation",
    "aging": "Community & Recreation",
    "elderly": "Community & Recreation",
    "community": "Community & Recreation",
    "recreation": "Community & Recreation",
    "park": "Community & Recreation",
    "parks": "Community & Recreation",
    "pool": "Community & Recreation",
    "restaurant": "Restaurants",
    "restaurants": "Restaurants",
    "dining": "Restaurants",
    "eat": "Restaurants",
    "cafe": "Restaurants"
};

const VALID_LOCATIONS = [
    "chantilly", "fairfax", "arlington", "reston", "alexandria",
    "woodbridge", "leesburg", "ashburn", "herndon", "manassas",
    "vienna", "falls church", "centreville", "annandale", "sterling"
];

const STOP_WORDS = new Set(["in", "the", "near", "for", "a", "an", "and", "or", "of", "to", "at"]);

// --- Interfaces ---

export interface ParsedQuery {
    raw: string;
    keywords: string[];
    inferredCategory: string | null;
    targetLocation: string | null;
    isFreeRequested: boolean;
    isSpanishRequested: boolean;
}

export interface RankedResource extends CommunityResource {
    matchScore: number;
}

// --- Pipeline Step 1: Normalization & Parsing ---
export function parseQuery(rawQuery: string): ParsedQuery {
    const normalized = rawQuery.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    const rawTokens = normalized.split(/\s+/).filter(t => t.length > 0);

    const keywords: string[] = [];
    let inferredCategory: string | null = null;
    let targetLocation: string | null = null;
    let isFreeRequested = false;
    let isSpanishRequested = false;

    for (const token of rawTokens) {
        if (STOP_WORDS.has(token)) continue;

        if (token === "free") {
            isFreeRequested = true;
            continue;
        }

        if (token === "spanish") {
            isSpanishRequested = true;
            continue;
        }

        if (VALID_LOCATIONS.includes(token)) {
            targetLocation = token;
            continue;
        }

        if (!inferredCategory && CATEGORY_MAP[token]) {
            inferredCategory = CATEGORY_MAP[token];
        }

        keywords.push(token);

        // Simple stemming for plurals so "libraries" matches "library" in text descriptions
        if (token.endsWith("ies")) {
            keywords.push(token.slice(0, -3) + "y");
        } else if (token.endsWith("s") && !token.endsWith("ss")) {
            keywords.push(token.slice(0, -1));
        }
    }

    return {
        raw: rawQuery,
        keywords,
        inferredCategory,
        targetLocation,
        isFreeRequested,
        isSpanishRequested
    };
}

// --- Pipeline Step 2: Scoring Algorithm ---
export function rankResources(resources: CommunityResource[], parsedQuery: ParsedQuery): RankedResource[] {
    // If no query, return all
    if (!parsedQuery.raw) {
        return resources.map(r => ({ ...r, matchScore: 1 }));
    }

    const scored: RankedResource[] = [];

    for (const resource of resources) {
        let score = 0;

        const resourceName = resource.name.toLowerCase();
        const resourceDesc = resource.short_description.toLowerCase();
        const resourceCity = resource.city.toLowerCase();
        const resourceCategory = resource.category.toLowerCase();

        // 1. Keyword Matching (10 pts per match)
        for (const kw of parsedQuery.keywords) {
            if (resourceName.includes(kw)) score += 15; // Higher weight for name match
            else if (resourceDesc.includes(kw)) score += 10;
            else if (resource.tags && resource.tags.some(t => t.toLowerCase() === kw)) score += 10;
        }

        // 2. Category Match (Very Strong Weight)
        if (parsedQuery.inferredCategory) {
            if (resourceCategory.includes(parsedQuery.inferredCategory.toLowerCase())) {
                score += 50; // Massive boost for exact category match
            } else {
                score -= 30; // Heavy penalty if the query clearly wanted one category but this is another
            }
        }

        // 3. Location Match (15 pts)
        if (parsedQuery.targetLocation) {
            if (resourceCity === parsedQuery.targetLocation) {
                score += 15;
            } else if (resource.zip_code === parsedQuery.targetLocation) {
                score += 15;
            } else {
                // If they asked for a specific location and this isn't it, penalize heavily.
                score -= 10;
            }
        }

        // 4. Boolean Boosts
        if (parsedQuery.isFreeRequested && resource.is_free_service) {
            score += 10;
        }
        if (parsedQuery.isSpanishRequested && resource.languages_supported?.includes("Spanish")) {
            score += 10;
        }

        // 5. Minimum Threshold Filtering
        // If an explicit category was requested, require a much higher minimum score to prevent random keyword matches
        // from dragging in completely irrelevant items to the RAG pipeline or fallback UI.
        const minimumThreshold = parsedQuery.inferredCategory ? 20 : 5;

        // Only include if score beats the strict threshold
        if (score >= minimumThreshold) {
            scored.push({ ...resource, matchScore: score });
        }
    }

    // Sort descending by score
    return scored.sort((a, b) => b.matchScore - a.matchScore);
}

export interface AIOverview {
    preRailText: string;
    postRailText: string;
}

// --- Pipeline Step 3: AI Overview Generator ---
export function generateAIOverview(parsedQuery: ParsedQuery, topResults: RankedResource[], totalResultsCount: number): AIOverview {
    if (topResults.length === 0) {
        return {
            preRailText: `We couldn't find any resources that perfectly match "${parsedQuery.raw}".`,
            postRailText: "Try adjusting your search terms or clearing some filters to see more options in the Northern Virginia area."
        };
    }

    // --- Pre-Rail Text Generation ---
    let preRail = "Several organizations ";

    if (parsedQuery.targetLocation) {
        const city = parsedQuery.targetLocation.charAt(0).toUpperCase() + parsedQuery.targetLocation.slice(1);
        preRail = `In the ${city} area, several organizations `;
    } else {
        preRail = "Across Northern Virginia, several organizations ";
    }

    let serviceType = "community services";
    if (parsedQuery.inferredCategory) {
        if (parsedQuery.inferredCategory === "Food & Basic Needs") serviceType = "food assistance and emergency provisions";
        else if (parsedQuery.inferredCategory === "Healthcare & Mental Health") serviceType = "vital healthcare and mental wellness services";
        else if (parsedQuery.inferredCategory === "Education & Libraries") serviceType = "educational resources and library services";
        else if (parsedQuery.inferredCategory === "Government & Legal Services") serviceType = "government, legal, and workforce assistance";
        else if (parsedQuery.inferredCategory === "Community & Recreation") serviceType = "community centers and recreational programs";
        else if (parsedQuery.inferredCategory === "Restaurants") serviceType = "local dining and restaurant options";
    }

    preRail += `provide ${serviceType} `;

    if (parsedQuery.isFreeRequested) {
        preRail += "at no cost ";
    }

    preRail += "for individuals and families in need.";

    // --- Post-Rail Text Generation ---
    let postRail = "";

    if (topResults.length === 1) {
        postRail = `Programs like ${topResults[0].name} provide reliable access to these services. We found ${totalResultsCount} total matching resources based on your search.`;
    } else if (topResults.length === 2) {
        postRail = `Programs like ${topResults[0].name} and ${topResults[1].name} provide reliable access to these essential services throughout the community. We found ${totalResultsCount} total resources based on your criteria.`;
    } else if (topResults.length >= 3) {
        postRail = `Dedicated programs including ${topResults[0].name}, ${topResults[1].name}, and others provide reliable access to these essential services throughout the community. We found ${totalResultsCount} total resources matching your criteria.`;
    }

    return {
        preRailText: preRail,
        postRailText: postRail
    };
}
