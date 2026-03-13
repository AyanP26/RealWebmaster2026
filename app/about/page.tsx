"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Users, Heart, Shield, Sparkles, Globe, Zap } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
            <Navbar />

            <main className="flex-grow pt-32 pb-20">
                {/* Hero Section */}
                <section className="px-6 mb-24 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-block px-4 py-1.5 mb-6 bg-blue-50 rounded-full border border-blue-100">
                            <span className="text-xs font-bold text-primary-blue uppercase tracking-widest italic flex items-center gap-2">
                                <Sparkles className="w-3 h-3" />
                                Our Mission
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]">
                            Connecting the Hearts of <br />
                            <span className="text-primary-blue">Northern Virginia</span>
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Weave Nova is more than a directory; it's a digital ecosystem designed to bridge the gap between people and the resources that empower them.
                        </p>
                    </div>
                </section>

                {/* Our Story / Who We Are */}
                <section className="px-6 mb-32">
                    <div className="max-w-5xl mx-auto bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6 text-gray-900">The Weave Nova Team</h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    The **Weave Nova Team** is a collective of passionate developers, designers, and community advocates based right here in Northern Virginia. We believe that technology should serve as a bridge, not a barrier.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Our vision was born from a simple realization: while NoVA is rich with resources, finding them can be complex. We've dedicated ourselves to "weaving" these disparate threads into a single, seamless experience that feels as premium as the community it represents.
                                </p>
                            </div>
                            <div className="aspect-square bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 flex items-center justify-center p-12 border border-blue-50">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center">
                                        <Users className="w-10 h-10 text-primary-blue" />
                                    </div>
                                    <div className="w-24 h-24 bg-orange-50 rounded-2xl flex items-center justify-center transform translate-y-8">
                                        <Globe className="w-10 h-10 text-accent-orange" />
                                    </div>
                                    <div className="w-24 h-24 bg-orange-50 rounded-2xl flex items-center justify-center">
                                        <Zap className="w-10 h-10 text-accent-orange" />
                                    </div>
                                    <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center transform translate-y-8">
                                        <Heart className="w-10 h-10 text-primary-blue" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="px-6 mb-32 max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900">What Drives Us</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Heart className="w-6 h-6" />,
                                title: "Community First",
                                color: "bg-blue-50",
                                text: "Every feature we build is designed with the local resident in mind, ensuring real-world utility."
                            },
                            {
                                icon: <Shield className="w-6 h-6" />,
                                title: "Verified Accuracy",
                                color: "bg-orange-50",
                                text: "We meticulously curate our resource database to ensure you get correct, up-to-date information every time."
                            },
                            {
                                icon: <Sparkles className="w-6 h-6" />,
                                title: "Design Excellence",
                                color: "bg-blue-50",
                                text: "Aesthetics and accessibility go hand-in-hand. We strive for a premium experience for every user."
                            }
                        ].map((value, i) => (
                            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                                <div className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{value.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="px-6">
                    <div className="max-w-5xl mx-auto bg-primary-blue rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">Ready to explore NoVA?</h2>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="/" className="px-10 py-4 bg-white text-primary-blue rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">
                                    Start Searching
                                </a>
                                <a href="/submit" className="px-10 py-4 bg-accent-orange text-white rounded-full font-bold text-lg hover:bg-orange-500 transition-all shadow-lg">
                                    Contribute a Resource
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
