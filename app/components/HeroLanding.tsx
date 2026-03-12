'use client';

import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Apple, HeartPulse, BookOpen, Handshake, Briefcase, MapPin } from 'lucide-react';
import HomeSearchBar from './HomeSearchBar';
import Link from 'next/link';

interface HeroLandingProps {
    onNavbarReady: () => void; // Called when navbar should animate in
}

export default function HeroLanding({ onNavbarReady }: HeroLandingProps) {
    const [stage, setStage] = useState(0);
    const scrollTargetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 300),    // Background + logo
            setTimeout(() => setStage(2), 900),    // "Connect"
            setTimeout(() => setStage(3), 1500),   // "with your"
            setTimeout(() => setStage(4), 2100),   // "community."
            setTimeout(() => setStage(5), 2800),   // Tagline
            setTimeout(() => {
                setStage(6);                        // Search Bar & Categories
                onNavbarReady();                    // Tell parent to show navbar
            }, 3500),
            setTimeout(() => setStage(7), 4200),   // Scroll indicator
        ];
        return () => timers.forEach(clearTimeout);
    }, [onNavbarReady]);

    const handleScrollDown = () => {
        scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute rounded-full filter blur-[120px] transition-all duration-[4000ms] ease-in-out"
                        style={{
                            width: '50vw', height: '50vw', maxWidth: '700px', maxHeight: '700px',
                            background: 'radial-gradient(circle, rgba(29,78,216,0.2) 0%, transparent 70%)',
                            top: stage >= 1 ? '5%' : '-20%', left: stage >= 1 ? '-5%' : '-15%',
                            opacity: stage >= 1 ? 1 : 0,
                        }}
                    />
                    <div
                        className="absolute rounded-full filter blur-[100px] transition-all duration-[4000ms] ease-in-out"
                        style={{
                            width: '40vw', height: '40vw', maxWidth: '600px', maxHeight: '600px',
                            background: 'radial-gradient(circle, rgba(234,88,12,0.15) 0%, transparent 70%)',
                            bottom: stage >= 2 ? '0%' : '-15%', right: stage >= 2 ? '-5%' : '-15%',
                            opacity: stage >= 2 ? 1 : 0,
                        }}
                    />
                    <div
                        className="absolute rounded-full filter blur-[80px] transition-all duration-[3000ms] ease-in-out"
                        style={{
                            width: '25vw', height: '25vw', maxWidth: '350px', maxHeight: '350px',
                            background: 'radial-gradient(circle, rgba(15,92,92,0.1) 0%, transparent 70%)',
                            top: stage >= 3 ? '40%' : '50%', right: stage >= 3 ? '20%' : '25%',
                            opacity: stage >= 3 ? 1 : 0,
                        }}
                    />
                    <svg
                        viewBox="0 0 1440 900"
                        className="absolute inset-0 w-full h-full transition-opacity duration-[3000ms]"
                        style={{ opacity: stage >= 2 ? 0.3 : 0 }}
                        preserveAspectRatio="xMidYMid slice"
                    >
                        {/* Thin Ribbons (Intro) */}
                        <path d="M-100 200 C 300 600, 700 100, 1540 500" stroke="#1d4ed8" strokeWidth="4" fill="none" opacity={stage >= 5 ? 0.3 : 0.8} className="transition-opacity duration-[2000ms]" />
                        <path d="M-100 400 C 400 100, 800 700, 1540 300" stroke="#ea580c" strokeWidth="4" fill="none" opacity={stage >= 5 ? 0.3 : 0.8} className="transition-opacity duration-[2000ms]" />
                        <path d="M-100 600 C 500 200, 900 800, 1540 400" stroke="#1d4ed8" strokeWidth="3" fill="none" opacity={stage >= 5 ? 0.2 : 0.6} className="transition-opacity duration-[2000ms]" />
                        <path d="M1540 100 C 1000 500, 400 -100, -100 700" stroke="#ea580c" strokeWidth="3" fill="none" opacity={stage >= 5 ? 0.2 : 0.6} className="transition-opacity duration-[2000ms]" />

                        {/* Thick Ribbons (Bridge to Search) */}
                        <g style={{ opacity: stage >= 5 ? 0.5 : 0 }} className="transition-opacity duration-[3000ms]">
                            <path d="M-100 300 C 400 300, 500 700, 1000 700 T 1600 700" stroke="#1d4ed8" strokeWidth="60" fill="none" strokeLinecap="round" opacity="0.6" />
                            <path d="M1600 400 C 1200 400, 1000 800, 600 800 T -100 800" stroke="#ea580c" strokeWidth="80" fill="none" strokeLinecap="round" opacity="0.5" />
                        </g>
                    </svg>
                </div>

                {/* Animated logo */}
                <div
                    className="mb-8 transition-all duration-1000 ease-out relative z-10"
                    style={{
                        opacity: stage >= 1 ? 1 : 0,
                        transform: stage >= 1 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                    }}
                >
                    <div className="flex items-center gap-3">
                        <svg viewBox="0 0 40 40" className="w-10 h-10">
                            <path d="M 10 20 Q 20 10 30 20 T 10 20" fill="none" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
                            <path d="M 10 20 Q 20 30 30 20 T 10 20" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="20" cy="20" r="3" fill="#1d4ed8" />
                        </svg>
                        <span className="text-2xl font-bold tracking-tight">
                            <span className="text-primary-blue">weave</span>
                            <span className="text-accent-orange">.nova</span>
                        </span>
                    </div>
                </div>

                {/* Animated headline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-center relative z-10 px-6">
                    <span
                        className="inline-block transition-all duration-700 ease-out text-primary-blue"
                        style={{
                            opacity: stage >= 2 ? 1 : 0,
                            transform: stage >= 2 ? 'translateY(0)' : 'translateY(40px)',
                        }}
                    >
                        Connect
                    </span>
                    <br className="md:hidden" />
                    <span
                        className="inline-block transition-all duration-700 ease-out text-gray-800 ml-4"
                        style={{
                            opacity: stage >= 3 ? 1 : 0,
                            transform: stage >= 3 ? 'translateY(0)' : 'translateY(40px)',
                        }}
                    >
                        with your
                    </span>
                    <br />
                    <span
                        className="inline-block transition-all duration-700 ease-out"
                        style={{
                            opacity: stage >= 4 ? 1 : 0,
                            transform: stage >= 4 ? 'translateY(0)' : 'translateY(40px)',
                            background: 'linear-gradient(135deg, #1d4ed8 0%, #ea580c 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        community.
                    </span>
                </h1>

                {/* Tagline */}
                <p
                    className="text-base md:text-lg text-gray-500 max-w-xl font-medium leading-relaxed text-center px-6 relative z-10 transition-all duration-1000 ease-out mb-10"
                    style={{
                        opacity: stage >= 5 ? 1 : 0,
                        transform: stage >= 5 ? 'translateY(0)' : 'translateY(20px)',
                    }}
                >
                    Discover local resources, food banks, healthcare, education, and community services across Northern Virginia — all in one place.
                </p>

                {/* Search Bar & Categories - Injected into Intro */}
                <div
                    className="w-full max-w-3xl px-6 relative z-20 transition-all duration-1000 ease-out flex flex-col items-center"
                    style={{
                        opacity: stage >= 6 ? 1 : 0,
                        transform: stage >= 6 ? 'translateY(0)' : 'translateY(30px)',
                    }}
                >
                    <div className="w-full max-w-2xl mb-8">
                        <HomeSearchBar />
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
                        <Link href="/category/food" className="flex items-center space-x-1.5 bg-primary-blue hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 shadow-md shadow-blue-500/20">
                            <Apple className="w-3.5 h-3.5" />
                            <span>Food</span>
                        </Link>
                        <Link href="/category/health" className="flex items-center space-x-1.5 bg-accent-orange hover:bg-orange-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 shadow-md shadow-orange-500/20">
                            <HeartPulse className="w-3.5 h-3.5" />
                            <span>Health</span>
                        </Link>
                        <Link href="/category/education" className="flex items-center space-x-1.5 bg-primary-blue hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 shadow-md shadow-blue-500/20">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Education</span>
                        </Link>
                        <Link href="/category/government" className="flex items-center space-x-1.5 bg-accent-orange hover:bg-orange-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 shadow-md shadow-orange-500/20">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>Gov & Legal</span>
                        </Link>
                        <Link href="/category/community" className="flex items-center space-x-1.5 bg-primary-blue hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 shadow-md shadow-blue-500/20">
                            <Handshake className="w-3.5 h-3.5" />
                            <span>Community</span>
                        </Link>
                        <Link href="/category/dining" className="flex items-center space-x-1.5 bg-accent-orange hover:bg-orange-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 shadow-md shadow-orange-500/20">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Restaurants</span>
                        </Link>
                    </div>

                </div>

                {/* Scroll down indicator */}
                <div
                    className="absolute bottom-6 flex flex-col items-center gap-2 cursor-pointer transition-all duration-1000 ease-out group z-10"
                    style={{
                        opacity: stage >= 7 ? 1 : 0,
                        transform: stage >= 7 ? 'translateY(0)' : 'translateY(20px)',
                    }}
                    onClick={handleScrollDown}
                >
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest group-hover:text-primary-blue transition-colors">
                        Upcoming Events
                    </span>
                    <div className="animate-bounce">
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary-blue transition-colors" />
                    </div>
                </div>
                {/* Bottom transition gradient to bleed into the next section */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
            </section>

            {/* Scroll target for smooth scroll-down */}
            <div ref={scrollTargetRef} />
        </>
    );
}
