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
        <div className="min-h-screen flex flex-col font-sans bg-light-bg">
            <Navbar />

            <main className="flex-grow">
                {/* Slimmer Hero Section just for Search */}
                <section className="relative bg-primary-teal pt-16 pb-24 w-full overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 opacity-40">
                        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-auto min-h-[150px]" style={{ mixBlendMode: 'overlay' }}>
                            <path fill="#f28a4a" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,192C672,181,768,139,864,138.7C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            <path fill="#5ea16a" fillOpacity="1" d="M0,192L48,181.3C96,171,192,149,288,165.3C384,181,480,235,576,261.3C672,288,768,288,864,256C960,224,1056,160,1152,144C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            <path fill="#815ab5" fillOpacity="0.8" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,128C672,117,768,139,864,170.7C960,203,1056,245,1152,245.3C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        </svg>
                    </div>

                    <div className="absolute inset-x-0 -bottom-1 h-16 bg-white" style={{ clipPath: 'polygon(0 80%, 100% 0, 100% 100%, 0% 100%)' }}></div>

                    <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10 w-full flex flex-col items-center">
                        <h1 className="text-3xl font-bold text-white mb-6 text-center">
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
                <section className="bg-white py-12 flex-grow">
                    <div className="max-w-7xl mx-auto px-6 md:px-10">
                        <SearchClient initialQuery={query} allResources={resourcesData} />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
