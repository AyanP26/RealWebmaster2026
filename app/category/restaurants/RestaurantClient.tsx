'use client';

import { useState, useMemo } from 'react';
import CompactResourceCard from '../../components/CompactResourceCard';
import { 
    Utensils, 
    Sparkles, 
    Clock, 
    Coffee, 
    Heart, 
    RotateCcw,
    ChevronRight,
    ChefHat,
    Flame
} from "lucide-react";
import Link from "next/link";
import { CommunityResource } from "../../types/resource";

const VIBES = [
    { id: 'date-night', label: 'Date Night', icon: <Heart className="w-5 h-5" />, color: 'bg-rose-50 text-rose-600 border-rose-100' },
    { id: 'hidden-gem', label: 'Hidden Gem', icon: <Sparkles className="w-5 h-5" />, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { id: 'late-night', label: 'Late Night', icon: <Clock className="w-5 h-5" />, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { id: 'coffee-study', label: 'Coffee & Study', icon: <Coffee className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 'family-style', label: 'Family Style', icon: <Utensils className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600 border-blue-100' },
];

interface RestaurantClientProps {
    resources: CommunityResource[];
}

export default function RestaurantClient({ resources }: RestaurantClientProps) {
    const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
    const [isGeneratorSpinning, setIsGeneratorSpinning] = useState(false);
    const [generatedRestaurant, setGeneratedRestaurant] = useState<CommunityResource | null>(null);

    const filteredResources = useMemo(() => {
        if (!selectedVibe) return resources;
        return resources.filter(r => 
            r.short_description.toLowerCase().includes(selectedVibe.replace('-', ' ')) ||
            (r.tags && r.tags.some(t => t.toLowerCase() === selectedVibe.replace('-', ' ')))
        );
    }, [selectedVibe, resources]);

    const handleGenerate = () => {
        if (resources.length === 0) return;
        setIsGeneratorSpinning(true);
        setGeneratedRestaurant(null);
        
        setTimeout(() => {
            const randomIdx = Math.floor(Math.random() * resources.length);
            setGeneratedRestaurant(resources[randomIdx]);
            setIsGeneratorSpinning(false);
        }, 1500);
    };

    return (
        <>
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-orange-50 to-white">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/4 z-0" />
                <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100/50 text-orange-700 rounded-full text-xs font-bold mb-6 uppercase tracking-widest border border-orange-200/50">
                        <Flame className="w-3.5 h-3.5" />
                        Culinary NoVA
                    </div>
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.05]">
                        Taste the <br />
                        <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent italic">
                            Neighborhood
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl leading-relaxed font-medium mb-12">
                        From the authentic spices of Annandale to the upscale bistros of Arlington. Discover the flavors that make Northern Virginia a global food destination.
                    </p>

                    {/* VIBE EXPLORER */}
                    <div className="w-full max-w-5xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-4">
                            {VIBES.map((vibe) => (
                                <button
                                    key={vibe.id}
                                    onClick={() => setSelectedVibe(selectedVibe === vibe.id ? null : vibe.id)}
                                    className={`flex items-center gap-3 px-6 py-4 rounded-3xl border-2 transition-all duration-300 ${
                                        selectedVibe === vibe.id 
                                        ? `${vibe.color} border-current shadow-lg scale-105` 
                                        : 'bg-white border-gray-100 text-gray-600 hover:border-orange-200 hover:shadow-md'
                                    }`}
                                >
                                    {vibe.icon}
                                    <span className="font-bold">{vibe.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* LOCAL LEGENDS */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight uppercase">Local Legends</h2>
                            <p className="text-gray-500 font-medium">The institutions that put NoVA on the map.</p>
                        </div>
                        <Link href="/search?category=Restaurants" className="hidden md:flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all">
                            View All <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="flex overflow-x-auto pb-10 gap-8 no-scrollbar snap-x">
                        {/* Legend Card 1 */}
                        <div className="min-w-[300px] md:min-w-[450px] snap-start group relative">
                            <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden shadow-xl mb-6">
                                <img src="https://images.pexels.com/photos/30136627/pexels-photo-30136627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Legendary Pho" />
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest text-orange-600 border border-orange-100">Most Authentic</div>
                            </div>
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Eden Center Institutions</h3>
                            <p className="text-gray-500 font-medium">The heart of Vietnamese cuisine in the Mid-Atlantic.</p>
                        </div>

                        {/* Legend Card 2 */}
                        <div className="min-w-[300px] md:min-w-[450px] snap-start group relative">
                            <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden shadow-xl mb-6">
                                <img src="https://images.pexels.com/photos/2611917/pexels-photo-2611917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Legendary KBBQ" />
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest text-orange-600 border border-orange-100">Crowd Favorite</div>
                            </div>
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Annandale's K-Town</h3>
                            <p className="text-gray-500 font-medium">Sizzling grills and late-night karaoke vibes.</p>
                        </div>

                        {/* Legend Card 3 */}
                        <div className="min-w-[300px] md:min-w-[450px] snap-start group relative">
                            <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden shadow-xl mb-6">
                                <img src="https://images.pexels.com/photos/6267516/pexels-photo-6267516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Legendary Bistro" />
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest text-orange-600 border border-orange-100">Top Rated</div>
                            </div>
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Old Town Fine Dining</h3>
                            <p className="text-gray-500 font-medium">Historic charm meets modern culinary innovation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT SHOULD I EAT? */}
            <section className="py-24 bg-gray-900 relative border-y border-white/5 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                         <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.5" />
                    </svg>
                </div>
                
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-10 text-white animate-bounce-slow">
                        <ChefHat className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Can't Decide?</h2>
                    <p className="text-xl text-white/60 mb-12 font-medium">Let us pick your next favorite spot. Tap the button to spin the culinary wheel.</p>
                    
                    <div className="relative p-12 bg-white/5 backdrop-blur-xl rounded-[4rem] border border-white/10 mb-12 min-h-[300px] flex flex-col items-center justify-center">
                        {isGeneratorSpinning ? (
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-orange-400 font-bold tracking-widest uppercase text-sm animate-pulse">Consulting the Chefs...</p>
                            </div>
                        ) : generatedRestaurant ? (
                            <div className="animate-fade-in-up flex flex-col items-center">
                                <span className="px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-extrabold uppercase mb-4 tracking-widest">Match Found!</span>
                                <h3 className="text-4xl font-extrabold text-white mb-4">{generatedRestaurant.name}</h3>
                                <p className="text-white/60 text-lg mb-8 max-w-md">{generatedRestaurant.short_description}</p>
                                <div className="flex gap-4">
                                    <Link href={generatedRestaurant.website || '#'} target="_blank" className="px-8 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-orange-50 transition-colors">View Menu</Link>
                                    <button onClick={handleGenerate} className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors">
                                        <RotateCcw className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                             <button 
                                onClick={handleGenerate}
                                className="group px-12 py-5 bg-orange-600 text-white rounded-full font-extrabold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
                            >
                                <Utensils className="w-6 h-6" />
                                Pick For Me
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* NEIGHBORHOOD GUIDES */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-12 tracking-tight uppercase">Neighborhood Guides</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-10 border-2 border-gray-100 rounded-[3rem] hover:border-orange-200 transition-colors">
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Eden Center</h3>
                            <p className="text-gray-500 text-center mb-8">The most diverse Vietnamese shopping center on the East Coast. Try the Banh Mi or fresh spring rolls from any of the local walk-up windows.</p>
                             <div className="h-48 rounded-[2rem] overflow-hidden bg-gray-50 border border-orange-100">
                                <img src="https://images.pexels.com/photos/30136627/pexels-photo-30136627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover grayscale-0 hover:scale-110 transition-transform duration-500" alt="Eden Center Pho" />
                             </div>
                        </div>
                        <div className="p-10 border-2 border-gray-100 rounded-[3rem] hover:border-orange-200 transition-colors">
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Annandale</h3>
                            <p className="text-gray-500 text-center mb-8">NoVA's own Little Korea. Known for 24-hour KBBQ, world-class bakeries, and authentic soups that serve as the heart of the community.</p>
                             <div className="h-48 rounded-[2rem] overflow-hidden bg-gray-50 border border-orange-100">
                                <img src="https://images.pexels.com/photos/2611917/pexels-photo-2611917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover grayscale-0 hover:scale-110 transition-transform duration-500" alt="Annandale KBBQ" />
                             </div>
                        </div>
                        <div className="p-10 border-2 border-gray-100 rounded-[3rem] hover:border-orange-200 transition-colors">
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Old Town</h3>
                            <p className="text-gray-500 text-center mb-8">Walkable historic streets lined with upscale seafood, classic American taverns, and fine dining hotspots with views of the Potomac.</p>
                             <div className="h-48 rounded-[2rem] overflow-hidden bg-gray-50 border border-orange-100">
                                <img src="https://images.pexels.com/photos/6267516/pexels-photo-6267516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover grayscale-0 hover:scale-110 transition-transform duration-500" alt="Old Town Bistro" />
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VISUAL FOOD WALL */}
            <section className="py-24 bg-orange-50/50 flex flex-col items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="text-center mb-16">
                         <h2 className="text-4xl font-extrabold text-gray-900 mb-4">A Taste of NoVA</h2>
                         <p className="text-gray-500">A visual look into the plates of our community.</p>
                    </div>
                    
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                        <div className="break-inside-avoid rounded-3xl bg-white p-2 shadow-sm border border-gray-100">
                             <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                                <img src="https://images.pexels.com/photos/30136627/pexels-photo-30136627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover" alt="Pho Close-up" />
                             </div>
                        </div>
                        <div className="break-inside-avoid rounded-3xl bg-white p-2 shadow-sm border border-gray-100">
                             <div className="aspect-square rounded-2xl overflow-hidden">
                                <img src="https://images.pexels.com/photos/3911229/pexels-photo-3911229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover" alt="Dumplings" />
                             </div>
                        </div>
                        <div className="break-inside-avoid rounded-3xl bg-white p-2 shadow-sm border border-gray-100">
                             <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                                <img src="https://images.pexels.com/photos/2611917/pexels-photo-2611917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover" alt="KBBQ Grill" />
                             </div>
                        </div>
                        <div className="break-inside-avoid rounded-3xl bg-white p-2 shadow-sm border border-gray-100">
                             <div className="aspect-video rounded-2xl bg-gray-100 flex items-center justify-center text-xs text-gray-400 italic p-4 text-center">User Image: Pasta Dish</div>
                        </div>
                        <div className="break-inside-avoid rounded-3xl bg-white p-2 shadow-sm border border-gray-100">
                             <div className="aspect-[9/16] rounded-2xl overflow-hidden">
                                <img src="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover" alt="Coffee Art" />
                             </div>
                        </div>
                        <div className="break-inside-avoid rounded-3xl bg-white p-2 shadow-sm border border-gray-100">
                             <div className="aspect-square rounded-2xl overflow-hidden">
                                <img src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover" alt="Burger" />
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CURATED LIST WITH FILTERS */}
            <section className="py-24 px-6 bg-gray-50/50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            Explore {selectedVibe ? selectedVibe.replace('-', ' ') : 'All'}
                        </h2>
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                            {filteredResources.length} Establishments Found
                        </div>
                    </div>
                    
                    {filteredResources.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {filteredResources.map((resource) => (
                                <CompactResourceCard key={resource.id} resource={resource} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                             <Utensils className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                             <h4 className="text-xl font-bold text-gray-400">No restaurants match this specific vibe yet.</h4>
                             <button onClick={() => setSelectedVibe(null)} className="mt-4 text-orange-600 font-bold underline">Clear Filters</button>
                        </div>
                    )}
                </div>
            </section>

            <style jsx global>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </>
    );
}
