import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-50/50 border-t border-gray-100 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Column 1: Our Vision */}
                    <div className="md:col-span-4 lg:col-span-5">
                        <h4 className="text-xl font-bold text-gray-900 mb-6">Our Vision</h4>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm">
                            At weave.nova, we celebrate the strength of our local community through thoughtfully verified resources that empower residents and connect hearts across Northern Virginia.
                        </p>
                    </div>

                    {/* Column 2: Find Us (Regional Areas) */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <h4 className="text-xl font-bold text-gray-900 mb-6">Regional Focus</h4>
                        <div className="grid grid-cols-1 gap-3">
                            {['Fairfax County', 'Arlington County', 'Loudoun County', 'Alexandria City'].map((area) => (
                                <div key={area} className="flex items-center space-x-2 text-gray-500 hover:text-primary-blue transition-colors cursor-default">
                                    <MapPin className="w-4 h-4 text-accent-orange" />
                                    <span className="text-sm font-medium">{area}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Connect With Us */}
                    <div className="md:col-span-4 lg:col-span-4 text-left md:text-right">
                        <h4 className="text-xl font-bold text-gray-900 mb-6">Connect With Us</h4>
                        
                        <div className="flex items-center md:justify-end space-x-4 mb-8">
                            <Link href="/submit" className="px-6 py-2.5 bg-white border border-gray-200 text-gray-900 rounded-full text-sm font-bold shadow-sm hover:shadow-md hover:border-primary-blue transition-all">
                                Submit Resource
                            </Link>
                            <div className="flex space-x-3">
                                <Link href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary-blue hover:border-primary-blue transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                                </Link>
                                <Link href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary-blue hover:border-primary-blue transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.063-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                </Link>
                                <Link href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary-blue hover:border-primary-blue transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-500 font-medium">
                            <a href="mailto:hello@weavenova.org" className="flex items-center md:justify-end space-x-2 hover:text-primary-blue transition-colors">
                                <span>hello@weavenova.org</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            </a>
                            <a href="tel:+15714567890" className="flex items-center md:justify-end space-x-2 hover:text-primary-blue transition-colors">
                                <span>+1 (571) 456-7890</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1.28a16.033 16.033 0 01-15.334-15.334V5z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center bg-transparent">
                    <p className="text-sm font-semibold text-gray-400">
                        &copy; {new Date().getFullYear()} Weave Nova. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <Link href="/privacy" className="hover:text-primary-blue transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-primary-blue transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
