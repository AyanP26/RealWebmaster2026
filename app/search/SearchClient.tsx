'use client';

import { useState, useMemo, useEffect } from 'react';
import { CommunityResource } from "../types/resource";
import CompactResourceCard from "../components/CompactResourceCard";
import HomeSearchBar from "../components/HomeSearchBar";
import { parseQuery, rankResources, generateAIOverview } from "../utils/searchEngine";
import { Filter, Map as MapIcon, Check, X, Sparkles, MapPin } from "lucide-react";
import dynamic from 'next/dynamic';

const ResultMap = dynamic(() => import('../components/ResultMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400 font-medium">Loading Interactive Map...</div>
});

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

    // Map UI States
    const [isMapVisible, setIsMapVisible] = useState(false);
    const [hoveredResourceId, setHoveredResourceId] = useState<string | null>(null);
    const [clickedResourceId, setClickedResourceId] = useState<string | null>(null);

    // Scroll to card handler
    const scrollToCard = (id: string) => {
        const el = document.getElementById(`resource-card-${id}`);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            setHoveredResourceId(id);
            setClickedResourceId(id);
        }
    };

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
                    <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-gray-100 shadow-sm flex flex-col relative overflow-hidden">
                        {/* Decorative shimmer overlay */}
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" style={{ animationName: 'shimmer' }}></div>

                        {/* Skeleton Header: Badge + Title */}
                        <div className="mb-8">
                            <div className="flex items-center mb-3">
                                <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse"></div>
                                <div className="h-7 w-48 bg-gray-200 rounded-lg animate-pulse ml-3"></div>
                            </div>
                            {/* Skeleton paragraph lines */}
                            <div className="space-y-3 mt-4">
                                <div className="h-4 bg-gray-100 rounded-full w-full animate-pulse"></div>
                                <div className="h-4 bg-gray-100 rounded-full w-5/6 animate-pulse" style={{ animationDelay: '150ms' }}></div>
                                <div className="h-4 bg-gray-100 rounded-full w-3/4 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>

                        {/* Skeleton Map Toggle Button */}
                        <div className="mb-6 flex justify-end">
                            <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>

                        {/* Skeleton Horizontal Card Rail */}
                        <div className="flex flex-row gap-6 pb-6 pt-2 overflow-hidden w-full">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex-shrink-0 w-[340px] bg-gray-50 rounded-3xl border border-gray-100 p-5 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
                                    {/* Card title skeleton */}
                                    <div className="h-5 bg-gray-200 rounded-lg w-3/4 mb-3"></div>
                                    {/* Card description skeleton */}
                                    <div className="space-y-2 mb-4">
                                        <div className="h-3 bg-gray-100 rounded-full w-full"></div>
                                        <div className="h-3 bg-gray-100 rounded-full w-5/6"></div>
                                        <div className="h-3 bg-gray-100 rounded-full w-2/3"></div>
                                    </div>
                                    {/* Card address skeleton */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                                        <div className="h-3 bg-gray-100 rounded-full w-48"></div>
                                    </div>
                                    {/* Card tags skeleton */}
                                    <div className="flex gap-2">
                                        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                                        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                                        <div className="h-6 w-14 bg-gray-200 rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Skeleton Post-Rail Text */}
                        <div className="mt-8 border-t border-gray-100 pt-6">
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-100 rounded-full w-full animate-pulse"></div>
                                <div className="h-4 bg-gray-100 rounded-full w-4/5 animate-pulse" style={{ animationDelay: '200ms' }}></div>
                            </div>
                        </div>

                        {/* Centered status text */}
                        <div className="flex items-center justify-center mt-6 gap-2">
                            <Sparkles className="w-4 h-4 text-primary-teal animate-spin" />
                            <span className="text-sm text-gray-400 font-medium">Analyzing your search...</span>
                        </div>
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

                        {/* Map Toggle Button */}
                        <div className="relative z-10 mb-6 flex justify-end">
                            <button
                                onClick={() => setIsMapVisible(!isMapVisible)}
                                className={`flex items-center px-6 py-2.5 rounded-full font-bold transition-all shadow-md border border-transparent ${isMapVisible ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-[#e65c00] text-white hover:bg-[#cc5200] hover:shadow-lg'}`}
                            >
                                <MapPin className="w-5 h-5 mr-2" />
                                {isMapVisible ? "Hide Map" : "Show On Map"}
                            </button>
                        </div>

                        {/* Cards - Always horizontal scroll */}
                        <div className="relative z-10 w-full">
                            <div className="flex flex-row overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory custom-scrollbar w-full">
                                {aiResults.map((resource, idx) => (
                                    <div
                                        id={`resource-card-${resource.id}`}
                                        key={resource.id || idx}
                                        onMouseEnter={() => setHoveredResourceId(resource.id)}
                                        onMouseLeave={() => setHoveredResourceId(null)}
                                        onClick={() => setClickedResourceId(resource.id)}
                                        className={`transition-all duration-300 rounded-3xl cursor-pointer flex-shrink-0 ${hoveredResourceId === resource.id || clickedResourceId === resource.id ? 'ring-2 ring-primary-teal shadow-xl scale-[1.02]' : ''}`}
                                    >
                                        <CompactResourceCard resource={resource} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Geographic Map - Full Width Below Cards */}
                        {isMapVisible && (
                            <div className="relative z-10 w-full h-[450px] rounded-3xl overflow-hidden shadow-lg border border-gray-200 bg-gray-50 mt-2" style={{ zIndex: 0 }}>
                                <ResultMap
                                    resources={aiResults}
                                    activeResourceId={hoveredResourceId}
                                    clickedResourceId={clickedResourceId}
                                    onMarkerClick={scrollToCard}
                                />
                            </div>
                        )}

                        {/* Conversational Paragraph Post-Rail */}
                        <div className="relative z-10 mt-8 border-t border-gray-100 pt-6">
                            <p className="text-gray-600 text-base leading-relaxed">
                                {aiPostRail}
                            </p>
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
