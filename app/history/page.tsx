'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BookOpen, MapPin, Cpu, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900 overflow-x-hidden">
            <Navbar style={{ 
                background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.4s ease'
            }} />

            {/* HERO SECTION */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/nova_great_falls.png" 
                        alt="Great Falls Northern Virginia" 
                        className="w-full h-full object-cover scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-white" />
                </div>

                <div className="relative z-10 max-w-5xl px-6 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
                        The Soul of <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">Northern Virginia</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-gray-200 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                        From the rushing waters of Great Falls to the digital veins of the internet—explore the heritage of the place we call home.
                    </p>
                </div>
            </section>

            {/* INTRODUCTION */}
            <section className="py-24 px-6 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary-blue rounded-full text-sm font-bold mb-8 uppercase tracking-widest">
                        <MapPin className="w-4 h-4" />
                        Our Shared Heritage
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-10 text-gray-900 tracking-tight leading-tight">
                        A Bridge Between History & Innovation
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
                        Northern Virginia isn&apos;t just a collection of suburbs; it&apos;s a crossroads where the echoes of colonial pioneers meet the hum of global technology. For centuries, our community has served as a gateway to the south and a hub for the world.
                    </p>
                </div>
            </section>

            {/* TIMELINE SECTION */}
            <section className="py-20 bg-gray-50/50 border-y border-gray-100 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/5 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-orange/5 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Colonial Era */}
                        <div className="group">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 mb-8 group-hover:scale-110 transition-transform duration-500">
                                <BookOpen className="w-8 h-8 text-primary-blue" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">Colonial Roots</h3>
                            <p className="text-gray-600 leading-relaxed italic mb-6">"The Foundation of a Nation"</p>
                            <p className="text-gray-600 leading-relaxed">
                                From the early tobacco plantations to the establishment of historic Alexandria, Northern Virginia was the home of founding fathers like George Washington and George Mason. Its proximity to the Potomac made it a vital artery for early American commerce.
                            </p>
                        </div>

                        {/* Civil War */}
                        <div className="group">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 mb-8 group-hover:scale-110 transition-transform duration-500">
                                <ShieldCheck className="w-8 h-8 text-accent-orange" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">Civil War Crossroads</h3>
                            <p className="text-gray-600 leading-relaxed italic mb-6">"A Land Divided"</p>
                            <p className="text-gray-600 leading-relaxed">
                                No region was more contested during the Civil War. Battles like Bull Run and Ox Hill transformed our landscape. This era left a permanent mark on our towns, from Manassas to Leesburg, shaping the diverse and resilient community we see today.
                            </p>
                        </div>

                        {/* Modern Tech */}
                        <div className="group">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 mb-8 group-hover:scale-110 transition-transform duration-500">
                                <Cpu className="w-8 h-8 text-primary-blue" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">The Modern Tech Boom</h3>
                            <p className="text-gray-600 leading-relaxed italic mb-6">"The Internet's Main Street"</p>
                            <p className="text-gray-600 leading-relaxed">
                                Today, Northern Virginia is "Data Center Alley." Over 70% of the world&apos;s internet traffic flows through our backyard. From the birth of AOL to the arrival of Amazon HQ2, we are at the forefront of the global digital era.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* IMAGE GRID / FEATURE SECTION */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-7 relative group">
                            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
                                <img 
                                    src="/nova_highway.png" 
                                    alt="Modern Northern Virginia Infrastructure" 
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                            {/* Floating Card */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-2xl border border-gray-50 max-w-xs hidden lg:block">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                        <Users className="w-6 h-6 text-primary-blue" />
                                    </div>
                                    <div className="text-sm font-bold text-gray-900">Connecting Communities</div>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Our infrastructure connects millions across Fairfax, Loudoun, and Arlington every day.
                                </p>
                            </div>
                        </div>

                        <div className="md:col-span-5 px-4">
                            <h2 className="text-4xl font-bold mb-6 text-gray-900 tracking-tight">The Virginia State Bird</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Amidst our urban growth, the spirit of Northern Virginia is still found in its nature. The Northern Cardinal, with its vibrant red crest, serves as a reminder of our roots and natural beauty that persists across the seasons.
                            </p>
                            <div className="overflow-hidden rounded-3xl shadow-xl aspect-square max-w-sm mb-8">
                                <img src="/nova_cardinal.png" alt="Northern Cardinal" className="w-full h-full object-cover" />
                            </div>
                            <Link href="/" className="inline-flex items-center gap-2 text-primary-blue font-bold hover:gap-3 transition-all group">
                                Explore Local Resources
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-24 px-6 bg-primary-blue relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.5" />
                        <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="white" strokeWidth="0.5" />
                    </svg>
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl font-bold text-white mb-8">Become Part of the Story</h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                        Northern Virginia's history is still being written by people like you. Join us in strengthening our community.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/submit" className="px-8 py-4 bg-white text-primary-blue rounded-full font-bold shadow-xl hover:scale-105 transition-transform">
                            Submit a Resource
                        </Link>
                        <Link href="#join" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors">
                            Join Community
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
                    to { transform: scale(1.1); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out forwards;
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s ease-in-out infinite alternate;
                }
                .delay-200 { animation-delay: 0.2s; }
            `}</style>
        </div>
    );
}
