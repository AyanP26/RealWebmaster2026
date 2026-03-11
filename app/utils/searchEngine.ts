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
    "housing": "Food & Basic Needs",
    "rent": "Government & Legal Services",
    "bills": "Government & Legal Services",
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
    "college": "Education & Libraries",
    "colleges": "Education & Libraries",
    "university": "Education & Libraries",
    "universities": "Education & Libraries",
    "student": "Education & Libraries",
    "students": "Education & Libraries",
    "degree": "Education & Libraries",
    "class": "Education & Libraries",
    "classes": "Education & Libraries",
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
    "cafe": "Restaurants",
    "pizza": "Restaurants",
    "burger": "Restaurants",
    "burgers": "Restaurants",
    "sushi": "Restaurants",
    "tacos": "Restaurants",
    "brunch": "Restaurants",
    "breakfast": "Restaurants",
    "lunch": "Restaurants",
    "dinner": "Restaurants",
    "coffee": "Restaurants",
    "bakery": "Restaurants",
    "deli": "Restaurants",
    "gym": "Community & Recreation",
    "fitness": "Community & Recreation",
    "sports": "Community & Recreation",
    "swim": "Community & Recreation",
    "swimming": "Community & Recreation",
    "soccer": "Community & Recreation",
    "baseball": "Community & Recreation",
    "basketball": "Community & Recreation",
    "camp": "Community & Recreation",
    "camps": "Community & Recreation",
    "daycare": "Community & Recreation",
    "preschool": "Education & Libraries",
    "tutoring": "Education & Libraries",
    "tutor": "Education & Libraries",
    "ged": "Education & Libraries",
    "esl": "Education & Libraries",
    "english": "Education & Libraries",
    "insurance": "Government & Legal Services",
    "medicaid": "Healthcare & Mental Health",
    "medicare": "Healthcare & Mental Health",
    "dentist": "Healthcare & Mental Health",
    "dental": "Healthcare & Mental Health",
    "pharmacy": "Healthcare & Mental Health",
    "vision": "Healthcare & Mental Health",
    "eye": "Healthcare & Mental Health",
    "pregnancy": "Healthcare & Mental Health",
    "addiction": "Healthcare & Mental Health",
    "rehab": "Healthcare & Mental Health",
    "substance": "Healthcare & Mental Health",
    "depression": "Healthcare & Mental Health",
    "anxiety": "Healthcare & Mental Health",
    "clothing": "Food & Basic Needs",
    "clothes": "Food & Basic Needs",
    "diapers": "Food & Basic Needs",
    "furniture": "Food & Basic Needs",
    "utility": "Government & Legal Services",
    "utilities": "Government & Legal Services",
    "immigration": "Government & Legal Services",
    "citizenship": "Government & Legal Services",
    "tax": "Government & Legal Services",
    "taxes": "Government & Legal Services",
    "volunteer": "Community & Recreation",
    "volunteering": "Community & Recreation",
    "donate": "Community & Recreation",
    "donation": "Community & Recreation"
};

// Cuisine words that disambiguate "food" from Food & Basic Needs → Restaurants
const CUISINE_WORDS = new Set([
    "indian", "mexican", "chinese", "thai", "japanese", "korean", "vietnamese",
    "italian", "french", "greek", "mediterranean", "ethiopian", "turkish",
    "lebanese", "persian", "american", "southern", "bbq", "barbecue",
    "seafood", "vegan", "vegetarian", "halal", "kosher", "organic",
    "salvadoran", "peruvian", "colombian", "brazilian", "cuban", "caribbean",
    "african", "moroccan", "spanish", "tapas", "ramen", "pho", "dim sum",
    "fast", "fine"
]);

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
// Require a much stricter threshold (0.2 means closer match) to prevent "where" from matching "herndon" 
const fuseLocations = new Fuse(VALID_LOCATIONS, { threshold: 0.2 });
// Require stricter threshold for categories so "cheap" doesn't match "health"
const fuseCategories = new Fuse(categoryKeys, { threshold: 0.2 });

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
        // Run completely raw fuzzy search on words that are longer than 5 chars (to avoid matching stop words like "near", "where", "cheap")
        const textTokens = rawQuery.toLowerCase().split(/\s+/).filter(t => t.length >= 5);
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
        // Only run fuzzy search on sufficiently long tokens (5+ length) to prevent wild guesses
        if (!CATEGORY_MAP[token] && token.length >= 5) {
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

    // --- CUISINE DISAMBIGUATION ---
    // If the query contains a cuisine word (e.g. "indian", "mexican", "thai"),
    // override the category to "Restaurants" even if "food" mapped to "Food & Basic Needs".
    // This ensures "indian food" returns Indian restaurants, not food banks.
    const lowerTokens = rawQuery.toLowerCase().split(/\s+/);
    const hasCuisineWord = lowerTokens.some(t => CUISINE_WORDS.has(t));
    if (hasCuisineWord && (inferredCategory === "Food & Basic Needs" || !inferredCategory)) {
        inferredCategory = "Restaurants";
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

// --- Pipeline Step 2: UNIVERSAL Scoring Algorithm (Fuse.js-First) ---
// This engine works for ANY query by using full-text fuzzy search as the PRIMARY
// ranking mechanism. Category inference and location are applied as BONUS boosts,
// not hard filters. This guarantees relevant results for every possible search.
export function rankResources(resources: CommunityResource[], parsedQuery: ParsedQuery, options: RankingOptions = { strict: true }): RankedResource[] {
    // If no query, return all
    if (!parsedQuery.raw) {
        return resources.map(r => ({ ...r, matchScore: 1 }));
    }

    // ========================================================================
    // STEP 1: Full-Text Fuzzy Search (THE PRIMARY RANKING SIGNAL)
    // This searches across name, description, category, tags, and address
    // for ANY query, even ones with no mapped keywords whatsoever.
    // ========================================================================
    const fuseAllResources = new Fuse(resources, {
        keys: [
            { name: 'name', weight: 0.4 },
            { name: 'short_description', weight: 0.25 },
            { name: 'category', weight: 0.1 },
            { name: 'tags', weight: 0.15 },
            { name: 'address', weight: 0.05 },
            { name: 'city', weight: 0.05 }
        ],
        threshold: 0.45,
        ignoreLocation: true,
        includeScore: true
    });

    // Search using the RAW query (not just extracted keywords) so the full context is used
    const fuzzyResults = fuseAllResources.search(parsedQuery.raw);

    // Build a map of resource name -> fuzzy relevance score (0 = perfect match, 1 = no match)
    // We invert it so higher = better
    const fuzzyScoreMap = new Map<string, number>();
    fuzzyResults.forEach((result, index) => {
        const fuseScore = result.score ?? 1;
        // Convert Fuse score (0=best, 1=worst) to our score (100=best, 0=worst)
        const relevanceScore = Math.round((1 - fuseScore) * 100);
        // Also give a small positional bonus so earlier fuzzy results rank higher
        const positionalBonus = Math.max(0, 20 - index);
        fuzzyScoreMap.set(result.item.name, relevanceScore + positionalBonus);
    });

    // ALSO search by each individual keyword separately and merge scores.
    // This handles conversational queries like "fun things to do with kids" where
    // the raw query doesn't match directly but individual words like "kid" and "fun" do.
    for (const kw of parsedQuery.keywords) {
        if (kw.length < 3 || STOP_WORDS.has(kw)) continue; // Skip tiny/stop words
        const kwResults = fuseAllResources.search(kw);
        kwResults.forEach((result, index) => {
            const fuseScore = result.score ?? 1;
            const relevanceScore = Math.round((1 - fuseScore) * 60); // Slightly lower weight per-keyword
            const positionalBonus = Math.max(0, 10 - index);
            const existing = fuzzyScoreMap.get(result.item.name) ?? 0;
            // Add to existing score (cumulative — matching multiple keywords = higher score)
            fuzzyScoreMap.set(result.item.name, existing + relevanceScore + positionalBonus);
        });
    }

    // ========================================================================
    // STEP 2: Apply structured boosts on top of the fuzzy base score
    // Category, location, and boolean flags act as BONUSES, not hard filters
    // ========================================================================
    const scored: RankedResource[] = [];

    for (const resource of resources) {
        // Start with the fuzzy relevance score as the base (or 0 if not in fuzzy results)
        let score = fuzzyScoreMap.get(resource.name) ?? 0;

        const resourceName = resource.name.toLowerCase();
        const resourceDesc = resource.short_description.toLowerCase();
        const resourceCity = resource.city.toLowerCase();
        const resourceCategory = resource.category.toLowerCase();

        // Bonus 1: Direct keyword matching in name/description (strong signal)
        for (const kw of parsedQuery.keywords) {
            if (resourceName.includes(kw)) score += 20;
            else if (resourceDesc.includes(kw)) score += 12;
            else if (resource.tags && resource.tags.some(t => t.toLowerCase() === kw)) score += 10;
        }

        // Bonus 2: Category match (boost, NOT a hard filter or penalty)
        if (parsedQuery.inferredCategory) {
            if (resourceCategory.includes(parsedQuery.inferredCategory.toLowerCase())) {
                score += 40; // Significant boost for matching category
            }
            // NO PENALTY for mismatched category — the fuzzy score handles relevance
        }

        // Bonus 3: Location match
        if (parsedQuery.targetLocation) {
            if (resourceCity === parsedQuery.targetLocation) {
                score += 25; // Strong boost for location match
            } else if (resource.zip_code === parsedQuery.targetLocation) {
                score += 25;
            }
            // NO PENALTY for wrong location — just no bonus
        }

        // Bonus 4: Boolean boosts
        if (parsedQuery.isFreeRequested && resource.is_free_service) {
            score += 15;
        }
        if (parsedQuery.isSpanishRequested && resource.languages_supported?.includes("Spanish")) {
            score += 15;
        }

        // Only include resources that have SOME relevance (either from fuzzy or keyword match)
        if (score > 0) {
            scored.push({ ...resource, matchScore: score });
        }
    }

    // Sort descending by score
    let finalScored = scored.sort((a, b) => b.matchScore - a.matchScore);

    // SAFETY NET: If somehow nothing scored above 0, do a raw fuzzy search as last resort
    if (finalScored.length === 0 && parsedQuery.raw.trim() !== "") {
        console.log(`[SearchEngine] No results for "${parsedQuery.raw}". Raw fuzzy fallback.`);
        finalScored = fuzzyResults.slice(0, 20).map((result, index) => ({
            ...result.item,
            matchScore: Math.max(1, 20 - index)
        }));
    }

    return finalScored;
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
