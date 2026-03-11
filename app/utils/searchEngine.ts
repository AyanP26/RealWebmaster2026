import { CommunityResource } from "../types/resource";
import nlp from 'compromise';
import Fuse from 'fuse.js';

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

// --- Fuzzy Search Initialization ---
const categoryKeys = Object.keys(CATEGORY_MAP);
const fuseLocations = new Fuse(VALID_LOCATIONS, { threshold: 0.4 });
const fuseCategories = new Fuse(categoryKeys, { threshold: 0.4 });

// --- Pipeline Step 1: Normalization & Parsing (Powered by Compromise NLP + Fuse Typo Tolerance) ---
export function parseQuery(rawQuery: string): ParsedQuery {
    // Initialize the NLP document
    const doc = nlp(rawQuery);

    // Compute root forms (lemmatization) so "pantries" becomes "pantry"
    doc.compute('root');

    // 1. Intelligent Flag Detection
    // We can easily check for synonyms and complex phrases instead of exact string matches
    const isFreeRequested = doc.has('(free|pro bono|no cost|volunteer)');
    const isSpanishRequested = doc.has('(spanish|bilingual|español|hispanic)');

    // 2. Entity Extraction for Locations
    let targetLocation: string | null = null;

    // First, ask Compromise if it found any explicit places (e.g. "Arlington" or multi-word "Falls Church")
    const places = doc.places().out('array') as string[];
    for (const place of places) {
        const p = place.toLowerCase();
        if (VALID_LOCATIONS.includes(p)) {
            targetLocation = p;
            break;
        }

        // Fallback to fuzzy matching if Compromise isolated a place but spelling is slightly off
        const fuzzyLoc = fuseLocations.search(p);
        if (fuzzyLoc.length > 0) {
            targetLocation = fuzzyLoc[0].item;
            break;
        }
    }

    // If it didn't strictly classify it as a place, do a fallback check against our local dictionary
    if (!targetLocation) {
        // Run completely raw fuzzy search on words that are longer than 4 chars (to avoid matching stop words like "near" or "me")
        const textTokens = rawQuery.toLowerCase().split(/\s+/).filter(t => t.length >= 4);
        for (const token of textTokens) {
            const fuzzyLoc = fuseLocations.search(token);
            if (fuzzyLoc.length > 0) {
                targetLocation = fuzzyLoc[0].item;
                break;
            }
        }
    }

    // 3. Keyword & Category Extraction using Lemmas
    const keywords: string[] = [];
    let inferredCategory: string | null = null;

    // Extract the normalized root data from Compromise
    const jsonTerms = doc.terms().json() as Array<any>;

    for (const termObj of jsonTerms) {
        // Compromise provides the "root" (lemma) or falls back to "normal" (lowercase, stripped punctuation)
        const token = termObj.terms[0]?.root || termObj.terms[0]?.normal;

        if (!token || STOP_WORDS.has(token)) continue;

        // Skip adding the location to the keyword search to prevent double-scoring
        if (targetLocation && token.includes(targetLocation.split(' ')[0])) continue;

        // Skip adding the boolean flags to keywords
        if (isFreeRequested && ['free', 'cost', 'bono', 'pro', 'volunteer'].includes(token)) continue;
        if (isSpanishRequested && ['spanish', 'bilingual', 'español', 'hispanic'].includes(token)) continue;

        // Map to standard schema category (Exact Match)
        let exactMatchedWord = token;

        // Fuzzy Match (Typo Tolerance) against Category Dictionary
        if (!CATEGORY_MAP[token] && token.length >= 4) {
            const fuzzyCat = fuseCategories.search(token);
            if (fuzzyCat.length > 0) {
                exactMatchedWord = fuzzyCat[0].item; // E.g., translates "libraris" -> "libraries"
            }
        }

        if (!inferredCategory && CATEGORY_MAP[exactMatchedWord]) {
            inferredCategory = CATEGORY_MAP[exactMatchedWord];
        }

        keywords.push(exactMatchedWord);
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

export interface RankingOptions {
    strict?: boolean;
}

// --- Pipeline Step 2: Scoring Algorithm ---
export function rankResources(resources: CommunityResource[], parsedQuery: ParsedQuery, options: RankingOptions = { strict: true }): RankedResource[] {
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
            } else if (options.strict) {
                score -= 30; // Heavy penalty if the query clearly wanted one category but this is another
            }
        }

        // 3. Location Match (15 pts)
        if (parsedQuery.targetLocation) {
            if (resourceCity === parsedQuery.targetLocation) {
                score += 15;
            } else if (resource.zip_code === parsedQuery.targetLocation) {
                score += 15;
            } else if (options.strict) {
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
        const minimumThreshold = options.strict ? (parsedQuery.inferredCategory ? 20 : 5) : 1;

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
export function generateAIOverview(parsedQuery: ParsedQuery, topResults: RankedResource[], totalResultsCount: number, isFallback: boolean = false): AIOverview {
    if (topResults.length === 0) {
        return {
            preRailText: `We couldn't find any resources related to "${parsedQuery.raw}".`,
            postRailText: "Please try adjusting or broadening your search terms."
        };
    }

    if (isFallback) {
        return {
            preRailText: `We were not able to find exact matches, but here are our closest matches.`,
            postRailText: "You can find alternates through 211 Virginia or local community centers."
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
