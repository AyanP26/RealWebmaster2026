'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Scale, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar style={{ background: 'white', borderBottom: '1px solid #f3f4f6' }} />
            
            <main className="flex-grow pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-50 rounded-2xl mb-6">
                            <Scale className="w-8 h-8 text-accent-orange" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Please read our terms of service carefully. By using weave.nova, you agree to comply with these guidelines for the benefit of the entire community.
                        </p>
                    </div>

                    <div className="prose prose-blue max-w-none text-gray-600">
                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <Info className="w-5 h-5 text-primary-blue" />
                                <h2 className="text-2xl font-bold text-gray-900 m-0">Acceptance of Terms</h2>
                            </div>
                            <p>
                                By accessing and using weave.nova, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="w-5 h-5 text-accent-orange" />
                                <h2 className="text-2xl font-bold text-gray-900 m-0">Use of Service</h2>
                            </div>
                            <p>
                                weave.nova provides information about community resources "as is." While we strive for accuracy, we cannot guarantee the reliability or availability of the third-party resources listed on our platform. Users are encouraged to verify information directly with the resource providers.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertCircle className="w-5 h-5 text-primary-blue" />
                                <h2 className="text-2xl font-bold text-gray-900 m-0">Resource Submissions</h2>
                            </div>
                            <p>
                                When submitting a resource to weave.nova, you warrant that the information provided is accurate and that you have the right to share such information. We reserve the right to review, edit, or reject any submission to ensure it meets our community standards.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <Scale className="w-5 h-5 text-accent-orange" />
                                <h2 className="text-2xl font-bold text-gray-900 m-0">Limitation of Liability</h2>
                            </div>
                            <p>
                                weave.nova and its contributors shall not be liable for any damages arising out of your use or inability to use the services provided on this website. This includes any actions you take based on the resource information found here.
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
