'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar style={{ background: 'white', borderBottom: '1px solid #f3f4f6' }} />
            
            <main className="flex-grow pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-6">
                            <Shield className="w-8 h-8 text-primary-blue" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Your privacy is important to us. This policy outlines how weave.nova handles your data and ensures your information remains secure.
                        </p>
                    </div>

                    <div className="prose prose-blue max-w-none text-gray-600">
                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="w-5 h-5 text-accent-orange" />
                                <h2 className="text-2xl font-bold text-gray-900 m-0">Information We Collect</h2>
                            </div>
                            <p>
                                weave.nova is designed to be a community resource hub. We collect minimal information necessary to provide our services, including search queries to improve results and optionally, contact information if you choose to submit a resource or join our community.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="w-5 h-5 text-primary-blue" />
                                <h2 className="text-2xl font-bold text-gray-900 m-0">How We Use Data</h2>
                            </div>
                            <p>
                                Data collected is used primarily to maintain and improve the accuracy of our resource directory. We do not sell your personal information to third parties. Our goal is to connect you with services, not to monetize your data.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-5 h-5 text-accent-orange" />
                                <h2 className="text-2xl font-bold text-gray-900 m-0">Data Security</h2>
                            </div>
                            <p>
                                We implement industry-standard security measures to protect your information. However, please remember that no method of transmission over the internet is 100% secure.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="w-5 h-5 text-primary-blue" />
                                <h2 className="text-2xl font-bold text-gray-900 m-0">Your Rights</h2>
                            </div>
                            <p>
                                You have the right to access, correct, or delete any personal information we may hold about you. For any privacy-related inquiries, please contact us at hello@weavenova.org.
                            </p>
                        </section>

                        <div className="mt-20 pt-8 border-t border-gray-100 text-sm text-gray-400 text-center">
                            Last updated: March 12, 2026
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
