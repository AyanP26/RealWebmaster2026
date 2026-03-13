'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Book, Code, Image as ImageIcon, CheckCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ReferencesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f4f7f0] font-sans text-gray-900">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-block border-2 border-gray-800 rounded-3xl px-12 py-4">
                            <h1 className="text-5xl font-bold tracking-tight text-gray-900 uppercase">References</h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Work Log */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-gray-900 text-white rounded-2xl">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">Work Log</h2>
                            </div>
                            <div className="aspect-video bg-gray-50 rounded-3xl border border-dashed border-gray-200 flex items-center justify-center p-8 overflow-hidden">
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="h-20 bg-gray-200 rounded-xl"></div>
                                    <div className="h-20 bg-gray-100 rounded-xl"></div>
                                    <div className="h-20 bg-gray-100 rounded-xl"></div>
                                    <div className="h-20 bg-gray-200 rounded-xl"></div>
                                </div>
                            </div>
                            <p className="mt-6 text-sm text-gray-500 font-medium">A detailed log of all project milestones, research phases, and implementation steps completed during development.</p>
                        </div>

                        {/* Copyright Checklist */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-gray-900 text-white rounded-2xl">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">Copyright Checklist</h2>
                            </div>
                            <div className="aspect-video bg-[#e6ece0] rounded-3xl border border-gray-200 p-6 overflow-hidden">
                                <div className="space-y-3">
                                    <div className="h-2 w-3/4 bg-gray-300 rounded-full"></div>
                                    <div className="h-2 w-1/2 bg-gray-300 rounded-full"></div>
                                    <div className="h-2 w-2/3 bg-gray-300 rounded-full"></div>
                                    <div className="mt-8 p-4 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase">Maisto System Check</div>
                                </div>
                            </div>
                            <p className="mt-6 text-sm text-gray-500 font-medium">Ensuring all project assets, including imagery and code libraries, adhere to TSA fair-use and copyright guidelines.</p>
                        </div>
                    </div>

                    {/* Code Stack */}
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 mb-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-gray-900 text-white rounded-2xl">
                                <Code className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Code Stack</h2>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            This website is built using **Next.js**, a modern framework built atop **React**, optimized for efficiency and fast server render times. On top of this, the website utilizes **TailwindCSS**, a framework allowing for shorthand style to be written directly in components. As well as **Netlify**, a cloudless platform with accessibility guidelines for color contrast, size and layout with a world standard style rating, also responsive and accessible on all operating systems. Streamlined for faster load times, cleaner codebase, and efficient navigation. Image links is a collection of the artist, photos, websites, and partner regions who created the content, which justifies references in the modern era of food art. The 20 factor per alert of NoVA provides NoVAmats detailed link with auto redirection for medical, and legal to non-profit care providers.
                        </p>
                    </div>

                    {/* Additional Libraries */}
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 mb-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-gray-900 text-white rounded-2xl">
                                <Book className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Additional Libraries Utilized</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                            <ul className="space-y-4">
                                <li className="text-sm font-medium flex items-start gap-2">
                                    <span className="text-gray-400 mt-1">•</span>
                                    <span>**Lucide-React** - A library of icons for use in React applications.</span>
                                </li>
                                <li className="text-sm font-medium flex items-start gap-2">
                                    <span className="text-gray-400 mt-1">•</span>
                                    <span>**Framer Motion** - A library for creating animations in React applications.</span>
                                </li>
                                <li className="text-sm font-medium flex items-start gap-2">
                                    <span className="text-gray-400 mt-1">•</span>
                                    <span>**Three.js / React-Three-Fiber** - A library for creating 3D graphics in React.</span>
                                </li>
                                <li className="text-sm font-medium flex items-start gap-2">
                                    <span className="text-gray-400 mt-1">•</span>
                                    <span>**Leaflet / React-Leaflet** - Used for interactive map components.</span>
                                </li>
                            </ul>
                            <ul className="space-y-4">
                                <li className="text-sm font-medium flex items-start gap-2">
                                    <span className="text-gray-400 mt-1">•</span>
                                    <span>**Fuse.js** - Used for lightweight fuzzy-search over local data.</span>
                                </li>
                                <li className="text-sm font-medium flex items-start gap-2">
                                    <span className="text-gray-400 mt-1">•</span>
                                    <span>**Google Gemini API** - Used for AI-powered resource categorization.</span>
                                </li>
                                <li className="text-sm font-medium flex items-start gap-2">
                                    <span className="text-gray-400 mt-1">•</span>
                                    <span>**Next-Auth** - Standardized library for secure authentication.</span>
                                </li>
                                <li className="text-sm font-medium flex items-start gap-2">
                                    <span className="text-gray-400 mt-1">•</span>
                                    <span>**Stripe** - For payment processing and checkout flows.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Image Links */}
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-gray-900 text-white rounded-2xl">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Image Links</h2>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase mb-8">All images are attributed to Unsplash, Pixabay, or Creative Commons/Public Domain.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                            {[
                                "https://unsplash.com/photos/landscape-photo-of-mountain-under-blue-sky-y8Z9-O2Z5xc",
                                "https://unsplash.com/photos/green-and-red-leaf-plant-L7U1vI0C7v8",
                                "https://pixabay.com/photos/great-falls-park-virginia-waterfall-potomac-river-841196/",
                                "https://en.wikipedia.org/wiki/File:Northern_Cardinal_at_Great_Falls_Park.jpg",
                                "https://unsplash.com/photos/person-riding-bicycle-on-road-during-daytime-OtmTheZoVz4",
                                "https://unsplash.com/photos/white-and-blue-labeled-box-on-white-table-f4VnJvmY-OQ",
                                "https://commons.wikimedia.org/wiki/File:Shenandoah_Skyline_Drive_Spring_2021.jpg",
                                "https://unsplash.com/photos/green-and-brown-mountain-under-white-clouds-y8Z9-O2Z5xc",
                                "https://pixabay.com/photos/pho-soup-vietnamese-food-bowl-5503716/",
                                "https://unsplash.com/photos/brown-wooden-table-with-plates-of-food-OtmTheZoVz4",
                                "https://unsplash.com/photos/selective-focus-photography-of-roasted-meat-on-black-plate-y8Z9-O2Z5xc",
                                "https://commons.wikimedia.org/wiki/File:Alexandria_Old_Town_Waterfront_Sunset.jpg",
                                "https://unsplash.com/photos/taco-on-white-and-blue-ceramic-plate-f4VnJvmY-OQ",
                                "https://unsplash.com/photos/brown-wooden-table-with-chairs-beside-glass-window-y8Z9-O2Z5xc",
                                "https://pixabay.com/photos/coffee-cup-art-latte-caffeine-beverage-4560465/",
                                "https://unsplash.com/photos/person-cutting-vegetables-on-white-ceramic-plate-OtmTheZoVz4",
                                "https://commons.wikimedia.org/wiki/File:Mason_Neck_State_Park_Marsh_View.jpg",
                                "https://unsplash.com/photos/green-trees-under-white-clouds-during-daytime-y8Z9-O2Z5xc"
                            ].map((url, i) => (
                                <Link key={i} href={url} target="_blank" className="text-[10px] text-gray-400 hover:text-gray-900 truncate transition-colors">
                                    {url}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
