import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SubmitResourcePage() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 relative">
            <Navbar />

            <main className="flex-grow w-full flex flex-col items-center justify-center pt-20 pb-20 px-6">
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center max-w-2xl w-full">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Submit a Resource</h1>
                    <p className="text-gray-500 mb-8">
                        This page is under construction. It will eventually contain a form for community members to submit new resources, events, and organizations to the Weave.NoVA database.
                    </p>
                    <div className="inline-flex items-center justify-center p-4 bg-orange-50 text-accent-orange rounded-full">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
