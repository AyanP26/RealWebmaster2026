import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CompactResourceCard from "../../components/CompactResourceCard";
import { TreePine, Search, MapPin, Wind, Camera } from "lucide-react";
import Link from "next/link";
import { CommunityResource } from "../../types/resource";
import fs from "fs";
import path from "path";

async function getCategoryResources(): Promise<CommunityResource[]> {
    const filePath = path.join(process.cwd(), "app", "Northern Virginia Community Resources.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const allResources: CommunityResource[] = JSON.parse(fileContents);
    return allResources.filter(resource => resource.category === "Nature");
}

export default async function NatureCategoryPage() {
    const resources = await getCategoryResources();

    return (
        <div className="min-h-screen flex flex-col font-sans bg-white relative">
            <Navbar />
            <main className="flex-grow w-full">
                {/* HERO SECTION */}
                <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                    <img 
                        src="/Great Falls Virginia Photo (2).jpg" 
                        alt="Great Falls Majestic View" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
                    
                    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-full mb-6 text-white border border-white/30">
                            <TreePine className="w-8 h-8" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                            Nature & Wilds
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed font-medium drop-shadow-md">
                            Explore the raw, natural beauty of Northern Virginia—from the roaring rapids of Great Falls to the silent summits of the Blue Ridge.
                        </p>
                    </div>
                </section>

                {/* FEATURED HIGHLIGHTS */}
                <section className="w-full max-w-7xl mx-auto px-6 py-24">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Wild Northern Virginia</h2>
                            <h3 className="text-4xl font-bold text-gray-900 tracking-tight">Iconic Natural Landmarks</h3>
                        </div>
                        <p className="text-gray-500 text-lg max-w-md font-medium leading-relaxed">
                            These essential destinations define the rugged landscape of our region.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* FEATURED: GREAT FALLS */}
                        <div className="group relative rounded-[3rem] overflow-hidden bg-gray-900 aspect-[4/5] shadow-2xl">
                            <img 
                                src="/Great Falls Virginia Photo.jpg" 
                                alt="Great Falls Vista" 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-10 md:p-14 w-full">
                                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-4 uppercase tracking-widest">
                                    <Camera className="w-4 h-4" />
                                    <span>Most Photographed</span>
                                </div>
                                <h4 className="text-4xl font-bold text-white mb-4">Great Falls Park</h4>
                                <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
                                    A stunning National Park site where the Potomac River falls over jagged rocks and flows through the narrow Mather Gorge.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="https://www.nps.gov/grfa/index.htm" target="_blank" className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors">
                                        Visit Site
                                    </Link>
                                    <div className="flex items-center space-x-2 text-white/80 font-semibold px-4">
                                        <MapPin className="w-4 h-4 text-emerald-400" />
                                        <span>McLean, VA</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FEATURED: SHENANDOAH */}
                        <div className="group relative rounded-[3rem] overflow-hidden bg-gray-900 aspect-[4/5] shadow-2xl">
                            <img 
                                src="/Northern Virginia Photo.jpg" 
                                alt="Shenandoah Skyline" 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-10 md:p-14 w-full">
                                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-4 uppercase tracking-widest">
                                    <Wind className="w-4 h-4" />
                                    <span>Mountain Escape</span>
                                </div>
                                <h4 className="text-4xl font-bold text-white mb-4">Shenandoah National Park</h4>
                                <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
                                    Escape to 200,000 acres of protected lands, featuring cascading waterfalls, spectacular views, and quiet wooded hollows.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="https://www.nps.gov/shen/index.htm" target="_blank" className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors">
                                        Explore Trails
                                    </Link>
                                    <div className="flex items-center space-x-2 text-white/80 font-semibold px-4">
                                        <MapPin className="w-4 h-4 text-emerald-400" />
                                        <span>75 miles from NoVA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ALL NATURE RESOURCES */}
                <section className="w-full bg-gray-50/50 py-24 border-t border-gray-100">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">More Natural Spaces</h2>
                            <p className="text-gray-600 font-medium">Discover state parks, wildlife refuges, and local gems across our region.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6">
                            {resources.map((resource) => (
                                <CompactResourceCard key={resource.id} resource={resource} />
                            ))}
                        </div>

                        <div className="mt-16 bg-emerald-600 rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                             <img 
                                src="/Duck on Water.jpg" 
                                alt="Wildlife" 
                                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
                            />
                            <div className="relative z-10 flex flex-col items-center">
                                <h3 className="text-3xl font-bold mb-6">Know of more natural spots?</h3>
                                <p className="text-emerald-50 text-lg mb-10 max-w-xl font-medium">Help our community grow by submitting local parks, trailheads, or hidden natural gems.</p>
                                <Link href="/submit" className="bg-white text-emerald-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                                    Submit A Resource
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
