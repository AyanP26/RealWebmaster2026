'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Book, Code, Image as ImageIcon, CheckCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ReferencesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-block border-2 border-primary-blue rounded-3xl px-12 py-4">
                            <h1 className="text-5xl font-bold tracking-tight text-gray-900 uppercase italic">References</h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Work Log */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-primary-blue text-white rounded-2xl">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">Work Log</h2>
                            </div>
                            <div className="aspect-video bg-gray-50 rounded-3xl border border-dashed border-gray-200 flex items-center justify-center p-8 overflow-hidden">
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="h-20 bg-blue-50 rounded-xl"></div>
                                    <div className="h-20 bg-orange-50 rounded-xl"></div>
                                    <div className="h-20 bg-orange-50 rounded-xl"></div>
                                    <div className="h-20 bg-blue-50 rounded-xl"></div>
                                </div>
                            </div>
                            <p className="mt-6 text-sm text-gray-500 font-medium">A detailed log of all project milestones, research phases, and implementation steps completed during development.</p>
                        </div>

                        {/* Copyright Checklist */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-accent-orange text-white rounded-2xl">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">Copyright Checklist</h2>
                            </div>
                            <div className="aspect-video bg-blue-50/50 rounded-3xl border border-gray-100 p-6 overflow-hidden">
                                <div className="space-y-3">
                                    <div className="h-2 w-3/4 bg-blue-200 rounded-full"></div>
                                    <div className="h-2 w-1/2 bg-blue-200 rounded-full"></div>
                                    <div className="h-2 w-2/3 bg-blue-200 rounded-full"></div>
                                    <div className="mt-8 p-4 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-[10px] text-primary-blue font-bold uppercase tracking-widest italic">System Validated</div>
                                </div>
                            </div>
                            <p className="mt-6 text-sm text-gray-500 font-medium">Ensuring all project assets, including imagery and code libraries, adhere to TSA fair-use and copyright guidelines.</p>
                        </div>
                    </div>

                    {/* Code Stack */}
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 mb-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-primary-blue text-white rounded-2xl">
                                <Code className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight text-primary-blue">Code Stack</h2>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            This website is built using **Next.js**, a modern framework built atop **React**, optimized for efficiency and fast server render times. On top of this, the website utilizes **TailwindCSS**, a framework allowing for shorthand style to be written directly in components. As well as **Netlify**, a cloudless platform with accessibility guidelines for color contrast, size and layout with a world standard style rating, also responsive and accessible on all operating systems. Streamlined for faster load times, cleaner codebase, and efficient navigation. Image links is a collection of the artist, photos, websites, and partner regions who created the content, which justifies references in the modern era of food art. The 20 factor per alert of NoVA provides NoVAmats detailed link with auto redirection for medical, and legal to non-profit care providers.
                        </p>
                    </div>

                    {/* Additional Libraries */}
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 mb-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-accent-orange text-white rounded-2xl">
                                <Book className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight text-accent-orange">Additional Libraries Utilized</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                            <ul className="space-y-4 font-medium">
                                <li className="text-sm flex items-start gap-2">
                                    <span className="text-primary-blue mt-1">•</span>
                                    <span>**Lucide-React** - A library of icons for use in React applications.</span>
                                </li>
                                <li className="text-sm flex items-start gap-2">
                                    <span className="text-primary-blue mt-1">•</span>
                                    <span>**Leaflet / React-Leaflet** - Used for interactive mapping and coordinate data display.</span>
                                </li>
                                <li className="text-sm flex items-start gap-2">
                                    <span className="text-primary-blue mt-1">•</span>
                                    <span>**Compromise** - Used for natural language processing of resource search queries.</span>
                                </li>
                            </ul>
                            <ul className="space-y-4 font-medium">
                                <li className="text-sm flex items-start gap-2">
                                    <span className="text-accent-orange mt-1">•</span>
                                    <span>**Fuse.js** - Used for lightweight fuzzy-search over local data.</span>
                                </li>
                                <li className="text-sm flex items-start gap-2">
                                    <span className="text-accent-orange mt-1">•</span>
                                    <span>**Google Gemini API (@google/generative-ai)** - Used for intelligent resource categorization.</span>
                                </li>
                                <li className="text-sm flex items-start gap-2">
                                    <span className="text-accent-orange mt-1">•</span>
                                    <span>**Tailwind CSS** - A utility-first CSS framework for rapid UI development and consistent styling.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Image Links */}
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-primary-blue text-white rounded-2xl">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight text-primary-blue">Image Links</h2>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase mb-8 tracking-widest">All images are attributed to Pexels and Public Domain sources.</p>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                "https://www.pexels.com/photo/a-duck-on-the-water-14160509/",
                                "https://www.pexels.com/photo/river-between-brown-trees-2432201/",
                                "https://www.pexels.com/photo/stunning-great-falls-in-virginia-under-blue-sky-33518758/",
                                "https://www.pexels.com/photo/serene-forest-stream-in-great-falls-park-34063250/",
                                "https://www.pexels.com/photo/asphalt-roadway-in-rural-valley-against-cloudy-blue-sky-4595695/"
                            ].map((url, i) => (
                                <Link key={i} href={url} target="_blank" className="text-sm text-gray-500 hover:text-primary-blue truncate transition-all flex items-center gap-3 group">
                                    <div className="w-2 h-2 rounded-full bg-orange-100 group-hover:bg-primary-blue transition-colors"></div>
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
