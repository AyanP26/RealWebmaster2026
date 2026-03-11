"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
    style?: React.CSSProperties;
}

export default function Navbar({ style }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <div className="w-full flex justify-center sticky top-6 z-50 px-4" style={style}>
            <nav className="w-full max-w-6xl bg-white/95 backdrop-blur-md px-6 py-3 rounded-full flex items-center justify-between shadow-xl shadow-blue-900/5 border border-white/20 relative">
                {/* Left side: Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <div className="relative flex items-center justify-center">
                        {/* Woven Logo Icon */}
                        <svg viewBox="0 0 40 40" className="w-8 h-8">
                            <path d="M 10 20 Q 20 10 30 20 T 10 20" fill="none" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
                            <path d="M 10 20 Q 20 30 30 20 T 10 20" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="20" cy="20" r="3" fill="#1d4ed8" />
                        </svg>
                    </div>
                    <div className="flex flex-row items-center ml-1 leading-tight text-xl font-bold tracking-tight">
                        <span className="text-primary-blue">weave</span>
                        <span className="text-accent-orange">.nova</span>
                    </div>
                </Link>

                {/* Center: Category Links */}
                <div className="hidden lg:flex items-center space-x-5">
                    <Link href="/category/food" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">Food</Link>
                    <Link href="/category/health" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">Health</Link>
                    <Link href="/category/education" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">Education</Link>
                    <Link href="/category/government" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">Gov & Legal</Link>
                    <Link href="/category/community" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">Community</Link>
                    <Link href="/category/restaurants" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">Dining</Link>
                </div>

                {/* Right side: CTAs and Mobile Toggle */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <Link
                        href="/submit"
                        className="px-4 md:px-5 py-2 text-sm font-semibold rounded-full bg-accent-orange text-white hover:bg-orange-500 transition-colors shadow-md shadow-orange-500/20 hidden md:block"
                    >
                        Submit Resource
                    </Link>
                    <Link
                        href="#join"
                        className="px-4 md:px-5 py-2 text-sm font-semibold rounded-full bg-primary-blue text-white hover:bg-blue-600 transition-colors shadow-md shadow-blue-600/20 hidden sm:block"
                    >
                        Join Community
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden p-1 text-gray-600 hover:text-primary-blue focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="absolute top-[120%] left-0 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-blue-900/10 border border-white/20 p-4 flex flex-col space-y-3 lg:hidden origin-top animate-in fade-in slide-in-from-top-4 duration-200">
                        <Link href="/category/food" onClick={toggleMenu} className="text-sm font-semibold text-gray-600 hover:text-primary-blue p-2 rounded-md hover:bg-blue-50/50">Food</Link>
                        <Link href="/category/health" onClick={toggleMenu} className="text-sm font-semibold text-gray-600 hover:text-primary-blue p-2 rounded-md hover:bg-blue-50/50">Health</Link>
                        <Link href="/category/education" onClick={toggleMenu} className="text-sm font-semibold text-gray-600 hover:text-primary-blue p-2 rounded-md hover:bg-blue-50/50">Education</Link>
                        <Link href="/category/government" onClick={toggleMenu} className="text-sm font-semibold text-gray-600 hover:text-primary-blue p-2 rounded-md hover:bg-blue-50/50">Gov & Legal</Link>
                        <Link href="/category/community" onClick={toggleMenu} className="text-sm font-semibold text-gray-600 hover:text-primary-blue p-2 rounded-md hover:bg-blue-50/50">Community</Link>
                        <Link href="/category/restaurants" onClick={toggleMenu} className="text-sm font-semibold text-gray-600 hover:text-primary-blue p-2 rounded-md hover:bg-blue-50/50">Dining</Link>
                        
                        <div className="border-t border-gray-100 pt-3 flex flex-col space-y-2">
                           <Link
                               href="/submit"
                               onClick={toggleMenu}
                               className="w-full text-center px-5 py-2 text-sm font-semibold rounded-full bg-accent-orange text-white hover:bg-orange-500 transition-colors shadow-md shadow-orange-500/20 md:hidden"
                           >
                               Submit Resource
                           </Link>
                           <Link
                               href="#join"
                               onClick={toggleMenu}
                               className="w-full text-center px-5 py-2 text-sm font-semibold rounded-full bg-primary-blue text-white hover:bg-blue-600 transition-colors shadow-md shadow-blue-600/20 sm:hidden"
                           >
                               Join Community
                           </Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}
