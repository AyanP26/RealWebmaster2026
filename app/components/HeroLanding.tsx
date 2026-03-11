'use client';

import { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

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
                setStage(6);                        // Scroll indicator
                onNavbarReady();                    // Tell parent to show navbar
            }, 3500),
        ];
        return () => timers.forEach(clearTimeout);
    }, [onNavbarReady]);

    const handleScrollDown = () => {
        scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">

                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute rounded-full filter blur-[120px] transition-all duration-[4000ms] ease-in-out"
                        style={{
                            width: '50vw', height: '50vw', maxWidth: '700px', maxHeight: '700px',
                            background: 'radial-gradient(circle, rgba(29,78,216,0.15) 0%, transparent 70%)',
                            top: stage >= 1 ? '5%' : '-20%', left: stage >= 1 ? '-5%' : '-15%',
                            opacity: stage >= 1 ? 1 : 0,
                        }}
                    />
                    <div
                        className="absolute rounded-full filter blur-[100px] transition-all duration-[4000ms] ease-in-out"
                        style={{
                            width: '40vw', height: '40vw', maxWidth: '600px', maxHeight: '600px',
                            background: 'radial-gradient(circle, rgba(234,88,12,0.1) 0%, transparent 70%)',
                            bottom: stage >= 2 ? '0%' : '-15%', right: stage >= 2 ? '-5%' : '-15%',
                            opacity: stage >= 2 ? 1 : 0,
                        }}
                    />
                    <div
                        className="absolute rounded-full filter blur-[80px] transition-all duration-[3000ms] ease-in-out"
                        style={{
                            width: '25vw', height: '25vw', maxWidth: '350px', maxHeight: '350px',
                            background: 'radial-gradient(circle, rgba(15,92,92,0.08) 0%, transparent 70%)',
                            top: stage >= 3 ? '40%' : '50%', right: stage >= 3 ? '20%' : '25%',
                            opacity: stage >= 3 ? 1 : 0,
                        }}
                    />
                    <svg
                        viewBox="0 0 1440 900"
                        className="absolute inset-0 w-full h-full transition-opacity duration-[3000ms]"
                        style={{ opacity: stage >= 2 ? 0.06 : 0 }}
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <path d="M-100 200 C 300 600, 700 100, 1540 500" stroke="#1d4ed8" strokeWidth="3" fill="none" />
                        <path d="M-100 400 C 400 100, 800 700, 1540 300" stroke="#ea580c" strokeWidth="3" fill="none" />
                        <path d="M-100 600 C 500 200, 900 800, 1540 400" stroke="#1d4ed8" strokeWidth="2" fill="none" />
                        <path d="M1540 100 C 1000 500, 400 -100, -100 700" stroke="#ea580c" strokeWidth="2" fill="none" />
                    </svg>
                </div>

                {/* Animated logo */}
                <div
                    className="mb-10 transition-all duration-1000 ease-out relative z-10"
                    style={{
                        opacity: stage >= 1 ? 1 : 0,
                        transform: stage >= 1 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                    }}
                >
                    <div className="flex items-center gap-3">
                        <svg viewBox="0 0 40 40" className="w-12 h-12">
                            <path d="M 10 20 Q 20 10 30 20 T 10 20" fill="none" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
                            <path d="M 10 20 Q 20 30 30 20 T 10 20" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="20" cy="20" r="3" fill="#1d4ed8" />
                        </svg>
                        <span className="text-3xl font-bold tracking-tight">
                            <span className="text-primary-blue">weave</span>
                            <span className="text-accent-orange">.nova</span>
                        </span>
                    </div>
                </div>

                {/* Animated headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8 text-center relative z-10 px-6">
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
                    className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed text-center px-6 relative z-10 transition-all duration-1000 ease-out"
                    style={{
                        opacity: stage >= 5 ? 1 : 0,
                        transform: stage >= 5 ? 'translateY(0)' : 'translateY(20px)',
                    }}
                >
                    Discover local resources, food banks, healthcare, education, and community services across Northern Virginia — all in one place.
                </p>

                {/* Scroll down indicator */}
                <div
                    className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer transition-all duration-1000 ease-out group z-10"
                    style={{
                        opacity: stage >= 6 ? 1 : 0,
                        transform: stage >= 6 ? 'translateY(0)' : 'translateY(20px)',
                    }}
                    onClick={handleScrollDown}
                >
                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest group-hover:text-primary-blue transition-colors">
                        Explore
                    </span>
                    <div className="animate-bounce">
                        <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-primary-blue transition-colors" />
                    </div>
                </div>
            </section>

            {/* Scroll target for smooth scroll-down */}
            <div ref={scrollTargetRef} />
        </>
    );
}
