'use client';

import { useState, useMemo, useEffect } from 'react';
import { CommunityResource } from "../types/resource";
import ResourceCard from "../components/ResourceCard";
import CompactResourceCard from "../components/CompactResourceCard";
import HomeSearchBar from "../components/HomeSearchBar";
import ResultMap from "../components/ResultMap";
import { parseQuery, rankResources, generateAIOverview } from "../utils/searchEngine";
import { Filter, Map as MapIcon, Check, X, Sparkles } from "lucide-react";

interface SearchClientProps {
    initialQuery: string;
    allResources: CommunityResource[];
}

// Extract unique categories from data
const getAllCategories = (data: CommunityResource[]) => {
    return Array.from(new Set(data.map(r => r.category))).sort();
};

const getAllCities = (data: CommunityResource[]) => {
    return Array.from(new Set(data.map(r => r.city))).sort();
};

export default function SearchClient({ initialQuery, allResources }: SearchClientProps) {
    // We keep the query in state to sync with the URL or allow local tracking
    const [query, setQuery] = useState(initialQuery);

    // Sidebar Filter State
    const [filterFreeOnly, setFilterFreeOnly] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    // Available filter options
    const uniqueCategories = useMemo(() => getAllCategories(allResources), [allResources]);
    const uniqueCities = useMemo(() => getAllCities(allResources), [allResources]);

    // Sync state if initialQuery prop changes (e.g. user submitted new search from header)
    useEffect(() => {
        setQuery(initialQuery);
        // When a new raw query comes in, we might want to reset manual filters, or keep them.
        // Let's keep them for now, it's a standard e-commerce pattern.
    }, [initialQuery]);

    // AI API States
    const [isLoadingAI, setIsLoadingAI] = useState(false);
    const [aiPreRail, setAiPreRail] = useState("");
    const [aiPostRail, setAiPostRail] = useState("");
    const [aiResults, setAiResults] = useState<CommunityResource[]>([]);
    const [aiTotalCount, setAiTotalCount] = useState(0);
    const [isUsingRealAI, setIsUsingRealAI] = useState(false);

    // --- Core API Fetching Effect ---
    useEffect(() => {
        let isMounted = true;

        async function fetchAIResults() {
            setIsLoadingAI(true);
            try {
                const res = await fetch('/api/ai-search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: query,
                        filterFreeOnly,
                        selectedCategories: Array.from(selectedCategories),
                        selectedCity: selectedCity
                    })
                });

                if (!res.ok) throw new Error("API Route Failed");

                const data = await res.json();

                if (isMounted) {
                    setAiPreRail(data.preRailText);
                    setAiPostRail(data.postRailText);
                    setAiResults(data.results || []);
                    setAiTotalCount(data.totalCount || 0);
                    setIsUsingRealAI(data.isAI === true);
                }
            } catch (error) {
                console.error("Error fetching AI search:", error);
            } finally {
                if (isMounted) setIsLoadingAI(false);
            }
        }

        // Add a slight debounce to avoid API spam
        const timeoutId = setTimeout(() => {
            fetchAIResults();
        }, 300);

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [query, filterFreeOnly, selectedCategories, selectedCity]);


    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start w-full">

            {/* SIDEBAR FILTERS */}
            <aside className="w-full md:w-1/4 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-text-dark flex items-center">
                        <Filter className="w-5 h-5 mr-2 text-primary-teal" />
                        Filters
                    </h2>
                    {(filterFreeOnly || selectedCategories.length > 0 || selectedCity) && (
                        <button
                            onClick={() => {
                                setFilterFreeOnly(false);
                                setSelectedCategories([]);
                                setSelectedCity(null);
                            }}
                            className="text-xs text-gray-400 hover:text-accent-orange font-medium flex items-center"
                        >
                            <X className="w-3 h-3 mr-1" /> Clear All
                        </button>
                    )}
                </div>

                {/* Quick Filters */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Requirements</h3>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={filterFreeOnly}
                            onChange={(e) => setFilterFreeOnly(e.target.checked)}
                        />
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${filterFreeOnly ? 'bg-primary-teal border-primary-teal text-white' : 'bg-white border-gray-300 group-hover:border-primary-teal'}`}>
                            {filterFreeOnly && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-gray-700 font-medium select-none">Free Services Only</span>
                    </label>
                </div>

                {/* Category Filters */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Category</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {uniqueCategories.map(cat => (
                            <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => toggleCategory(cat)}
                                />
                                <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${selectedCategories.includes(cat) ? 'bg-primary-teal border-primary-teal text-white' : 'bg-white border-gray-300 group-hover:border-primary-teal'}`}>
                                    {selectedCategories.includes(cat) && <Check className="w-3 h-3" />}
                                </div>
                                <span className="text-gray-700 text-sm flex-1 leading-tight select-none">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* City Filter */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Location</h3>
                    <select
                        className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-colors"
                        value={selectedCity || ""}
                        onChange={(e) => setSelectedCity(e.target.value || null)}
                    >
                        <option value="">Anywhere in NoVA</option>
                        {uniqueCities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
            </aside>

            {/* RESULTS UI: AI Overview & Rail */}
            <div className="w-full md:w-3/4 flex flex-col">
                {/* Integrated Response Container */}
                {isLoadingAI ? (
                    <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-teal-100 shadow-sm flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
                        <Sparkles className="w-12 h-12 text-primary-teal mb-4 animate-bounce" />
                        <h3 className="text-xl font-bold text-text-dark mb-2">Analyzing search intent...</h3>
                        <p className="text-gray-500 text-center max-w-sm">Generating semantic matches and writing custom overview.</p>
                    </div>
                ) : aiResults.length > 0 ? (
                    <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-gray-100 shadow-sm flex flex-col relative overflow-hidden transition-all duration-500">

                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>

                        {/* Conversational Paragraph Pre-Rail */}
                        <div className="relative z-10 mb-8">
                            <h2 className="text-2xl font-bold text-primary-teal mb-3 flex items-center">
                                {isUsingRealAI ? (
                                    <span className="bg-gradient-to-r from-purple-100 to-teal-100 text-purple-800 text-xs px-3 py-1.5 rounded-full mr-3 uppercase tracking-wider font-bold flex items-center shadow-sm">
                                        <Sparkles className="w-3.5 h-3.5 mr-1" />
                                        True AI Overview
                                    </span>
                                ) : (
                                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mr-3 uppercase tracking-wider font-bold">Fallback Engine</span>
                                )}
                                Analysis Complete
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed font-medium">
                                {aiPreRail}
                            </p>
                        </div>

                        {/* Horizontal Content Rail */}
                        <div className="relative z-10 w-full mb-8 -mx-6 md:-mx-10 px-6 md:px-10">
                            <div className="flex flex-row overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory custom-scrollbar">
                                {aiResults.map((resource, idx) => (
                                    <CompactResourceCard key={resource.id || idx} resource={resource} />
                                ))}
                            </div>
                        </div>

                        {/* Conversational Paragraph Post-Rail */}
                        <div className="relative z-10 mt-2 border-t border-gray-100 pt-6">
                            <p className="text-gray-600 text-base leading-relaxed">
                                {aiPostRail}
                            </p>
                        </div>

                        {/* Interactive Geographic Map */}
                        <div className="relative z-10 mt-8 w-full h-80 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                            <ResultMap resources={aiResults} />
                        </div>

                    </div>
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center bg-gray-50 rounded-3xl border border-gray-100 text-center px-6">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                            <MapIcon className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-text-dark mb-3">No matching resources</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            We couldn't find any resources that match all your applied filters. Try clearing some filters or adjusting your search term.
                        </p>
                        <button
                            onClick={() => {
                                setFilterFreeOnly(false);
                                setSelectedCategories([]);
                                setSelectedCity(null);
                                setQuery("");
                            }}
                            className="mt-6 text-primary-teal font-semibold hover:text-teal-800 transition-colors bg-teal-50 px-6 py-2 rounded-full"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
