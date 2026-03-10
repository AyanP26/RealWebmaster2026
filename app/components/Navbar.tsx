import Link from "next/link";
import { Compass } from "lucide-react";

export default function Navbar() {
    return (
        <div className="w-full flex justify-center sticky top-6 z-50 px-4">
            <nav className="w-full max-w-6xl bg-white/95 backdrop-blur-md px-6 py-3 rounded-full flex items-center justify-between shadow-xl shadow-blue-900/5 border border-white/20">
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
                    <Link href="/category/food" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">
                        Food
                    </Link>
                    <Link href="/category/health" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">
                        Health
                    </Link>
                    <Link href="/category/education" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">
                        Education
                    </Link>
                    <Link href="/category/government" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">
                        Gov & Legal
                    </Link>
                    <Link href="/category/community" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">
                        Community
                    </Link>
                    <Link href="/category/restaurants" className="text-sm font-semibold text-gray-600 hover:text-primary-blue transition-colors">
                        Dining
                    </Link>
                </div>

                {/* Right side: CTAs */}
                <div className="flex items-center space-x-3">
                    <Link
                        href="/submit"
                        className="px-5 py-2 text-sm font-semibold rounded-full bg-accent-orange text-white hover:bg-orange-500 transition-colors shadow-md shadow-orange-500/20 hidden sm:block"
                    >
                        Submit Resource
                    </Link>
                    <Link
                        href="#join"
                        className="px-5 py-2 text-sm font-semibold rounded-full bg-primary-blue text-white hover:bg-blue-600 transition-colors shadow-md shadow-blue-600/20"
                    >
                        Join Community
                    </Link>
                </div>
            </nav>
        </div>
    );
}
