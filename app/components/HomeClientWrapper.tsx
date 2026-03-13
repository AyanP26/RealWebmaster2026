'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import HeroLanding from './HeroLanding';
import Navbar from './Navbar';

interface HomeClientWrapperProps {
    children: React.ReactNode;
}

export default function HomeClientWrapper({ children }: HomeClientWrapperProps) {
    const [navbarVisible, setNavbarVisible] = useState(false);
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const [ready, setReady] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const seen = sessionStorage.getItem('weave_nova_intro_seen');
            if (seen) {
                setIsFirstVisit(false);
                setNavbarVisible(true);
            }
            sessionStorage.setItem('weave_nova_intro_seen', 'true');
        } catch {
            setIsFirstVisit(true);
        }
        setReady(true);
    }, []);


    const handleNavbarReady = useCallback(() => {
        setNavbarVisible(true);
    }, []);

    // Brief white screen while hydrating
    if (!ready) {
        return <div className="min-h-screen bg-white" />;
    }

    return (
        <div className="min-h-screen flex flex-col font-sans bg-white relative">

            {/* The intro landing — always in the DOM */}
            <HeroLanding onNavbarReady={handleNavbarReady} />

            {/* Navbar arrives at stage 6 of HeroLanding */}
            <div className="fixed top-6 left-0 w-full z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <Navbar
                        style={{
                            opacity: navbarVisible ? 1 : 0,
                            transform: navbarVisible ? 'translateY(0)' : 'translateY(-20px)',
                            transition: 'opacity 1000ms ease-out, transform 1000ms ease-out',
                        }}
                    />
                </div>
            </div>

            {/* Content section */}
            <div ref={contentRef} className="relative z-20">
                {children}
            </div>
        </div>
    );
}
