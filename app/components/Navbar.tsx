"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Apple, HeartPulse, BookOpen, Briefcase, Handshake, MapPin } from "lucide-react";

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
                <div className="hidden lg:flex items-center space-x-6">
                    <div className="relative group pt-1">
                        <button className="flex items-center space-x-1 text-sm font-semibold text-gray-600 group-hover:text-primary-blue transition-colors pb-1">
                            <span>Resources</span>
                            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                        </button>
                        
                        {/* Desktop Dropdown */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                            <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-gray-100 p-6 min-w-[280px]">
                                <div className="grid grid-cols-1 gap-1">
                                    {[
                                        { href: "/category/food", label: "Food", icon: <Apple className="w-4 h-4" /> },
                                        { href: "/category/health", label: "Health", icon: <HeartPulse className="w-4 h-4" /> },
                                        { href: "/category/education", label: "Education", icon: <BookOpen className="w-4 h-4" /> },
                                        { href: "/category/government", label: "Gov & Legal", icon: <Briefcase className="w-4 h-4" /> },
                                        { href: "/category/community", label: "Community", icon: <Handshake className="w-4 h-4" /> },
                                        { href: "/category/restaurants", label: "Dining", icon: <MapPin className="w-4 h-4" /> },
                                    ].map((item) => (
                                        <Link 
                                            key={item.href}
                                            href={item.href} 
                                            className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-blue-50/50 transition-colors group/item"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/item:bg-white group-hover/item:shadow-sm text-gray-400 group-hover/item:text-primary-blue transition-all">
                                                {item.icon}
                                            </div>
                                            <span className="text-sm font-semibold text-gray-600 group-hover/item:text-gray-900">{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Link href="/history" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">History</Link>
                    <Link href="/about" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">About</Link>
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
                        <div className="space-y-1">
                            <div className="px-2 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Resources</div>
                            <Link href="/category/food" onClick={toggleMenu} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-blue-50/50 text-sm font-semibold text-gray-600">
                                <Apple className="w-4 h-4 text-primary-blue" />
                                <span>Food</span>
                            </Link>
                            <Link href="/category/health" onClick={toggleMenu} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-blue-50/50 text-sm font-semibold text-gray-600">
                                <HeartPulse className="w-4 h-4 text-accent-orange" />
                                <span>Health</span>
                            </Link>
                            <Link href="/category/education" onClick={toggleMenu} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-blue-50/50 text-sm font-semibold text-gray-600">
                                <BookOpen className="w-4 h-4 text-primary-blue" />
                                <span>Education</span>
                            </Link>
                            <Link href="/category/government" onClick={toggleMenu} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-blue-50/50 text-sm font-semibold text-gray-600">
                                <Briefcase className="w-4 h-4 text-accent-orange" />
                                <span>Gov & Legal</span>
                            </Link>
                            <Link href="/category/community" onClick={toggleMenu} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-blue-50/50 text-sm font-semibold text-gray-600">
                                <Handshake className="w-4 h-4 text-primary-blue" />
                                <span>Community</span>
                            </Link>
                            <Link href="/category/restaurants" onClick={toggleMenu} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-blue-50/50 text-sm font-semibold text-gray-600">
                                <MapPin className="w-4 h-4 text-accent-orange" />
                                <span>Dining</span>
                            </Link>
                        </div>
                        
                        <div className="px-2 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest pt-2">Explore</div>
                        <Link href="/history" onClick={toggleMenu} className="text-sm font-semibold text-gray-600 hover:text-primary-blue p-2 rounded-xl hover:bg-blue-50/50">History</Link>
                        <Link href="/about" onClick={toggleMenu} className="text-sm font-semibold text-gray-600 hover:text-primary-blue p-2 rounded-xl hover:bg-blue-50/50">About</Link>
                        
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
