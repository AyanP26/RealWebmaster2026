import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CompactResourceCard from "../../components/CompactResourceCard";
import { HandHeart, Search } from "lucide-react";
import Link from "next/link";
import { CommunityResource } from "../../types/resource";
import fs from "fs";
import path from "path";

async function getCategoryResources(): Promise<CommunityResource[]> {
    const filePath = path.join(process.cwd(), "app", "Northern Virginia Community Resources.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const allResources: CommunityResource[] = JSON.parse(fileContents);
    return allResources.filter(resource => resource.category === "Community & Recreation");
}

export default async function CommunityCategoryPage() {
    const resources = await getCategoryResources();

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 relative">
            <Navbar />
            <main className="flex-grow w-full flex flex-col items-center pb-20">
                <section className="w-full bg-blue-50 pt-24 pb-16 px-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

                    <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">
                        <div className="p-4 bg-white rounded-full shadow-md mb-6 text-primary-blue">
                            <HandHeart className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                            Community & Recreation <br className="hidden md:block" /> in Northern Virginia
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                            Explore local parks, community centers, youth programs, and recreational activities that bring neighbors together.
                        </p>

                        <div className="mt-10 flex gap-4">
                            <Link href="/search?q=Community" className="flex items-center space-x-2 bg-white text-gray-700 hover:text-primary-blue px-6 py-3 rounded-full font-semibold shadow-sm border border-gray-200 transition-colors">
                                <Search className="w-4 h-4" />
                                <span>Search All Branches</span>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="w-full max-w-6xl mx-auto px-6 pt-16">
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Community Resources ({resources.length})
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {resources.map((resource) => (
                            <CompactResourceCard key={resource.id} resource={resource} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
