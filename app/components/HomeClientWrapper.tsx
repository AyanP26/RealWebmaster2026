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

    // On return visits, auto-scroll to the content section (past the landing)
    useEffect(() => {
        if (ready && !isFirstVisit && contentRef.current) {
            contentRef.current.scrollIntoView();
        }
    }, [ready, isFirstVisit]);

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

            {/* Content section — Navbar sits directly here (no wrapper) for sticky to work */}
            <div ref={contentRef}>

                {/* Navbar — sticky positioning works because it's a direct child of this tall container */}
                <Navbar
                    style={{
                        opacity: navbarVisible ? 1 : 0,
                        transform: navbarVisible ? 'translateY(0)' : 'translateY(-20px)',
                        transition: 'opacity 700ms ease-out, transform 700ms ease-out',
                    }}
                />

                {children}
            </div>
        </div>
    );
}
