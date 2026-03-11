import { Suspense } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeSearchBar from "../components/HomeSearchBar";
import SearchClient from "./SearchClient";
import resourcesDataRaw from "../Northern Virginia Community Resources.json";
import { CommunityResource } from "../types/resource";

const resourcesData: CommunityResource[] = resourcesDataRaw as unknown as CommunityResource[];

// We define what the page expects for searchParams
export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const rawQuery = Array.isArray(params?.q) ? params.q[0] : params?.q;
    const query = typeof rawQuery === 'string' ? rawQuery : "";

    return (
        <div className="min-h-screen flex flex-col font-sans bg-white">
            {/* Absolute background ribbons covering the full top area (navbar + hero) */}
            <div className="absolute top-0 left-0 w-full h-[420px] overflow-hidden pointer-events-none z-0">
                <svg viewBox="0 0 1440 500" className="absolute top-0 w-full h-full opacity-80" preserveAspectRatio="xMidYMid slice">
                    <path d="M-100 0 C 300 250, 600 -50, 1540 500 L -100 500 Z" fill="url(#searchBlueGrad)" opacity="0.05" />
                    <path d="M-100 100 C 400 500, 800 50, 1540 400 L -100 500 Z" fill="url(#searchOrangeGrad)" opacity="0.04" />
                    <path d="M1540 0 C 1200 200, 800 -100, -100 400 L 1540 -50 Z" stroke="url(#searchBlueGrad)" strokeWidth="40" fill="none" opacity="0.1" />
                    <path d="M1540 100 C 1000 400, 400 0, -100 500" stroke="url(#searchOrangeGrad)" strokeWidth="60" fill="none" opacity="0.1" />
                    <defs>
                        <linearGradient id="searchBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1d4ed8" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                        <linearGradient id="searchOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ea580c" />
                            <stop offset="100%" stopColor="#f97316" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-500/15 rounded-full filter blur-[80px]"></div>
                <div className="absolute top-[5%] right-[-10%] w-[50%] h-[70%] bg-orange-500/10 rounded-full filter blur-[100px]"></div>
            </div>

            {/* Sticky Navbar - direct child so sticky works, sits on top of the ribbon background */}
            <Navbar />

            <main className="flex-grow relative z-10">
                {/* Hero Content */}
                <section className="relative pt-8 pb-16 w-full">
                    <div className="max-w-7xl mx-auto px-6 md:px-20 w-full flex flex-col items-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary-blue mb-6 text-center">
                            Search Community Resources
                        </h1>
                        <div className="w-full max-w-3xl">
                            <Suspense fallback={<div>Loading search...</div>}>
                                <HomeSearchBar />
                            </Suspense>
                        </div>
                    </div>
                </section>

                {/* Search Results Area */}
                <section className="bg-white py-12">
                    <div className="max-w-7xl mx-auto px-6 md:px-10">
                        <SearchClient initialQuery={query} allResources={resourcesData} />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
