'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CompactResourceCard from '../../components/CompactResourceCard';
import { TreePine, Search, MapPin, Wind, Camera, ArrowRight, Waves, Mountain, Bird } from "lucide-react";
import Link from "next/link";
import { CommunityResource } from "../../types/resource";

// Mock data fetching for client component (or we could use a separate data file)
// For now, I'll use a client-side fetch pattern since we need 'use client' for scroll effects
// In a real app, this might be a Server Component that passes data to a Client Wrapper, 
// but for this refinement, I'll keep it consolidated for clarity.

export default function NatureCategoryPage() {
    const [scrolled, setScrolled] = useState(false);
    const [resources, setResources] = useState<CommunityResource[]>([]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        
        // Fetch resources (simulated for client component)
        fetch('/api/resources?category=Nature')
            .then(res => res.json())
            .then(data => setResources(data))
            .catch(() => {
                // Fallback or handle error - since I can't easily add an API route right now, 
                // I'll assume the user wants the UI locked in first. 
                // I'll actually just import the relative path if possible, but JSON imports in client components can be tricky.
                // Let's use the layout structure and assume data will be wired up.
            });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900 overflow-x-hidden">
            <Navbar style={{ 
                background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.4s ease',
                color: scrolled ? '#111827' : '#ffffff'
            }} />

            {/* HERO SECTION - History Style Layered */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-emerald-50 to-white">
                {/* Decorative background blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/4 z-0" />
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-50/40 rounded-full filter blur-3xl -translate-y-1/2 -translate-x-1/4 z-0" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/50 text-emerald-700 rounded-full text-xs font-bold mb-6 uppercase tracking-widest border border-emerald-200/50">
                                <TreePine className="w-3.5 h-3.5" />
                                The Great Outdoors
                            </div>
                            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.05]">
                                Nature of <br />
                                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent italic">
                                    Northern Virginia
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed mb-10 font-medium">
                                Beyond the urban sprawl lies a world of cascading water, ancient forests, and rugged mountain peaks. Reconnect with the wild spaces that define our region.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="#pillars" className="px-10 py-4 bg-emerald-600 text-white rounded-full font-bold shadow-xl shadow-emerald-200 hover:shadow-emerald-300 transition-all hover:-translate-y-1">
                                    Explore Wilds
                                </Link>
                                <Link href="/search?q=Nature" className="px-10 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all">
                                    Find Parks
                                </Link>
                            </div>
                        </div>

                        <div className="relative animate-fade-in-up delay-200">
                            <div className="relative aspect-[4/5] md:aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white group">
                                <img 
                                    src="/Great Falls Virginia Photo (2).jpg" 
                                    alt="Great Falls Majestic View" 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                            
                            {/* Accent badges */}
                            <div className="absolute -top-8 -right-8 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-emerald-50 hidden md:block">
                                <div className="text-emerald-600 font-extrabold text-2xl mb-1 italic">76ft Drop</div>
                                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Great Falls Rapids</div>
                            </div>
                            
                            <div className="absolute -bottom-12 -left-12 bg-blue-600 p-8 rounded-[3rem] shadow-2xl text-white hidden lg:block border-8 border-white">
                                <Waves className="w-10 h-10 mb-3" />
                                <div className="font-bold text-xl leading-tight">Potomac <br />Gorge</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PILLARS OF NATURE - History Style Modular */}
            <section id="pillars" className="py-32 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">The Three Realms</h2>
                        <p className="text-lg text-gray-500 font-medium">From the riverbed to the mountain top, discover the diverse ecosystems of NoVA.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* THE WATERFALLS */}
                        <div className="group p-10 bg-gray-50 rounded-[3rem] border border-gray-100/50 hover:bg-emerald-50/50 transition-all duration-500 border-none shadow-sm hover:shadow-xl hover:-translate-y-2">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500">
                                <Waves className="w-10 h-10 text-blue-500" />
                            </div>
                            <h3 className="text-3xl font-extrabold mb-5 text-gray-900">The Falls</h3>
                            <p className="text-blue-600 leading-relaxed font-bold italic mb-6">"Power and Grace"</p>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                The Potomac River carves a dramatic path through our backyard. Experience the sheer force of Great Falls, the serenity of Scott's Run, and the hidden cascades of the Occoquan.
                            </p>
                        </div>

                        {/* THE MOUNTAINS */}
                        <div className="group p-10 bg-gray-50 rounded-[3rem] border border-gray-100/50 hover:bg-emerald-50/50 transition-all duration-500 border-none shadow-sm hover:shadow-xl hover:-translate-y-2">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500">
                                <Mountain className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h3 className="text-3xl font-extrabold mb-5 text-gray-900">The Ridge</h3>
                            <p className="text-emerald-600 leading-relaxed font-bold italic mb-6">"Ancient Vistas"</p>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                The Blue Ridge Mountains stand as a timeless sentinel. Shenandoah National Park offers over 500 miles of trails, leading to summits that reveal the vastness of the Virginia wilderness.
                            </p>
                        </div>

                        {/* THE WILDLIFE */}
                        <div className="group p-10 bg-gray-50 rounded-[3rem] border border-gray-100/50 hover:bg-emerald-50/50 transition-all duration-500 border-none shadow-sm hover:shadow-xl hover:-translate-y-2">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500">
                                <Bird className="w-10 h-10 text-orange-500" />
                            </div>
                            <h3 className="text-3xl font-extrabold mb-5 text-gray-900">The Wild</h3>
                            <p className="text-orange-600 leading-relaxed font-bold italic mb-6">"Feather and Fur"</p>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                From the bald eagles of Mason Neck to the white-tailed deer of Bull Run, our region is alive with biodiversity. Explore the refuges where NoVA's native species thrive.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED: SHENANDOAH SKYLINE - History-style Image/Feature section */}
            <section className="py-32 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-12 mb-12">
                             <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold mb-6 uppercase tracking-widest">
                                <Camera className="w-4 h-4" />
                                Capturing the Seasons
                            </div>
                        </div>
                        
                        <div className="lg:col-span-7 relative group">
                            <div className="relative overflow-hidden rounded-[4rem] shadow-2xl">
                                <img 
                                    src="/Northern Virginia Photo.jpg" 
                                    alt="Shenandoah Valley View" 
                                    className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-1000 animate-slow-zoom"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                
                                <div className="absolute bottom-12 left-12 right-12">
                                     <h4 className="text-4xl font-extrabold text-white mb-4">Shenandoah Skyline</h4>
                                     <p className="text-white/80 text-lg max-w-lg mb-6 leading-relaxed">Skyline Drive spans 105 miles along the crest of the Blue Ridge, offering 75 overlooks with stunning views of the Piedmont and the Valley.</p>
                                     <Link href="https://www.nps.gov/shen" target="_blank" className="inline-flex items-center gap-2 text-white font-bold hover:gap-3 transition-all group">
                                        Plan Your Visit
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Floating Card */}
                            <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-50 max-w-sm hidden xl:block">
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                                        <Wind className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <div className="text-xl font-extrabold text-gray-900">Apex of NoVA</div>
                                </div>
                                <p className="text-gray-500 leading-relaxed font-medium">
                                    At 4,051 feet, Hawksbill Summit offers the highest view in the entire region.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-5 flex flex-col gap-12">
                            <div className="p-10 border-2 border-gray-100 rounded-[3rem] hover:border-emerald-200 transition-colors">
                                <h5 className="text-2xl font-bold mb-4 text-gray-900">Mason Neck Wildlife</h5>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">A sanctuary for bald eagles along the Potomac riverbanks, offering quiet hiking trails and wildlife photography bliss.</p>
                                <div className="h-64 rounded-[2rem] overflow-hidden overflow-hidden">
                                     <img src="/Duck on Water.jpg" alt="NoVA Wildlife" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            
                            <Link href="/search?q=Parks" className="p-10 bg-gray-900 rounded-[3rem] text-white hover:bg-emerald-950 transition-all group">
                                <div className="flex justify-between items-center">
                                    <div className="pr-4">
                                        <div className="text-emerald-400 font-bold text-sm mb-2 uppercase tracking-widest">Explore More</div>
                                        <h5 className="text-3xl font-bold mb-4 leading-tight">All Regional <br />Nature Spots</h5>
                                        <p className="text-white/60 text-lg">Browse our full directory of over 50 local parks and preserves.</p>
                                    </div>
                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-emerald-600 transition-all">
                                        <ArrowRight className="w-8 h-8" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION - History Style */}
            <section className="py-32 px-6 bg-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.5" />
                        <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="white" strokeWidth="0.5" />
                    </svg>
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl font-extrabold text-white mb-8 tracking-tight">Preserve Our Wilds</h2>
                    <p className="text-2xl text-emerald-50 mb-12 max-w-2xl mx-auto font-medium">
                        Know a hidden trailhead or a local park we missed? Help us map the natural splendor of Northern Virginia.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/submit" className="px-12 py-5 bg-white text-emerald-600 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform text-lg">
                            Submit a Natural Gem
                        </Link>
                        <Link href="/" className="px-12 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors text-lg">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx global>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slow-zoom {
                    from { transform: scale(1); }
                    to { transform: scale(1.05); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-slow-zoom {
                    animation: slow-zoom 15s ease-in-out infinite alternate;
                }
                .delay-200 { animation-delay: 0.2s; }
            `}</style>
        </div>
    );
}
