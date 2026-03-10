import { notFound } from "next/navigation";
import { CommunityResource } from "../../types/resource";
import fs from "fs";
import path from "path";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CompactResourceCard from "../../components/CompactResourceCard";
import { Apple, HeartPulse, BookOpen, Briefcase, HandHeart, MapPin, Search } from "lucide-react";
import Link from "next/link";

interface CategoryData {
    title: string;
    schemaCategory: string;
    description: string;
    icon: React.ElementType;
    colorClass: string;
    bgClass: string;
}

const CATEGORY_MAP: Record<string, CategoryData> = {
    "food": {
        title: "Food & Basic Needs",
        schemaCategory: "Food & Basic Needs",
        description: "Access essential resources including food pantries, emergency meals, and basic living supplies for individuals and families in Northern Virginia.",
        icon: Apple,
        colorClass: "text-primary-blue",
        bgClass: "bg-blue-50"
    },
    "health": {
        title: "Healthcare & Mental Health",
        schemaCategory: "Healthcare & Mental Health",
        description: "Find critical healthcare services, affordable clinics, and mental health counseling centers dedicated to community wellness.",
        icon: HeartPulse,
        colorClass: "text-accent-orange",
        bgClass: "bg-orange-50"
    },
    "education": {
        title: "Education & Libraries",
        schemaCategory: "Education & Libraries",
        description: "Discover public libraries, after-school programs, tutoring services, and educational resources for all ages.",
        icon: BookOpen,
        colorClass: "text-primary-blue",
        bgClass: "bg-blue-50"
    },
    "government": {
        title: "Government & Legal Services",
        schemaCategory: "Government & Legal Services",
        description: "Connect with local government offices, legal aid organizations, and workforce development programs.",
        icon: Briefcase,
        colorClass: "text-accent-orange",
        bgClass: "bg-orange-50"
    },
    "community": {
        title: "Community & Recreation",
        schemaCategory: "Community & Recreation",
        description: "Explore local parks, community centers, youth programs, and recreational activities that bring neighbors together.",
        icon: HandHeart,
        colorClass: "text-primary-blue",
        bgClass: "bg-blue-50"
    },
    "restaurants": {
        title: "Local Dining",
        schemaCategory: "Restaurants",
        description: "Support the local economy by exploring highly-rated dining establishments, cafes, and eateries rooted in the NoVA community.",
        icon: MapPin,
        colorClass: "text-accent-orange",
        bgClass: "bg-orange-50"
    }
};

async function getCategoryResources(categoryName: string): Promise<CommunityResource[]> {
    const filePath = path.join(process.cwd(), "app", "Northern Virginia Community Resources.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const allResources: CommunityResource[] = JSON.parse(fileContents);

    return allResources.filter(resource => resource.category === categoryName);
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const categoryStr = slug.toLowerCase();
    const categoryData = CATEGORY_MAP[categoryStr];

    if (!categoryData) {
        notFound();
    }

    const resources = await getCategoryResources(categoryData.schemaCategory);
    const Icon = categoryData.icon;

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 relative">
            <Navbar />

            <main className="flex-grow w-full flex flex-col items-center pb-20">

                {/* Category Hero Section */}
                <section className={`w-full ${categoryData.bgClass} pt-24 pb-16 px-6 relative overflow-hidden`}>
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

                    <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">
                        <div className={`p-4 bg-white rounded-full shadow-md mb-6 ${categoryData.colorClass}`}>
                            <Icon className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                            {categoryData.title} <br className="hidden md:block" /> in Northern Virginia
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                            {categoryData.description}
                        </p>

                        <div className="mt-10 flex gap-4">
                            <Link href="/search" className="flex items-center space-x-2 bg-white text-gray-700 hover:text-primary-blue px-6 py-3 rounded-full font-semibold shadow-sm border border-gray-200 transition-colors">
                                <Search className="w-4 h-4" />
                                <span>Search All Branches</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Resources Grid */}
                <section className="w-full max-w-6xl mx-auto px-6 pt-16">
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Community Resources ({resources.length})
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {resources.length > 0 ? (
                            resources.map((resource) => (
                                <CompactResourceCard key={resource.id} resource={resource} />
                            ))
                        ) : (
                            <div className="w-full py-20 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-gray-500 font-medium text-lg">No resources found for this category.</p>
                                <p className="text-gray-400 text-sm mt-2">We are actively expanding our database.</p>
                            </div>
                        )}
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
