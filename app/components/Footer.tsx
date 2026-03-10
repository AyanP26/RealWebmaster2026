import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-section border-t border-gray-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold tracking-tight text-primary mb-4 block">
                            weave<span className="text-neutral">.nova</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mt-4">
                            Connecting Northern Virginia residents to trusted community resources, from healthcare to education and beyond.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-neutral mb-4">Resources</h4>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Nonprofits</Link></li>
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Healthcare</Link></li>
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Education</Link></li>
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-neutral mb-4">Community</h4>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Events Calendar</Link></li>
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Submit Resource</Link></li>
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Volunteer</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-neutral mb-4">About</h4>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Our Mission</Link></li>
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Weave Nova. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {/* Social icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
