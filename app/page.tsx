import { Apple, HeartPulse, BookOpen, Handshake, Briefcase, MapPin } from "lucide-react";
import Footer from "./components/Footer";
import HomeSearchBar from "./components/HomeSearchBar";
import HomeClientWrapper from "./components/HomeClientWrapper";
import Link from "next/link";

export default function Home() {
  return (
    <HomeClientWrapper>
      <main className="flex-grow relative z-10 w-full flex flex-col items-center">

        {/* REMAINDER OF PAGE CONTENT */}
        <div className="w-full h-24 bg-gradient-to-b from-white to-gray-50/50" />


        {/* UPCOMING EVENTS SECTION */}
        <section className="w-full bg-gray-50/50 py-20 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Upcoming Local Events</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Event Card 1 */}
              <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all group flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute top-4 right-4 bg-primary-blue text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
                    Oct 21 | 9 AM
                  </div>
                  <img src="https://images.unsplash.com/photo-1533174000255-1bd72590bd75?w=800&q=80" alt="Farmers Market" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">Downtown Farmers Market</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-6 font-medium">
                    <MapPin className="w-4 h-4 mr-1 text-accent-orange" />
                    Location, Downtown
                  </div>
                  <div className="mt-auto">
                    <button className="text-primary-blue font-bold text-sm hover:text-blue-800 transition-colors">
                      Join Event &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Event Card 2 */}
              <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all group flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute top-4 right-4 bg-accent-orange text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
                    Oct 23 | 10 AM
                  </div>
                  <img src="https://images.unsplash.com/photo-1593113514676-13a85b98fdca?w=800&q=80" alt="Cleanup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">Community Cleanup Day</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4 font-medium">
                    <span className="text-gray-600">Volunteers Needed</span>
                  </div>
                  <div className="flex gap-2 mb-6">
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs font-bold">Orange</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">Blue</span>
                  </div>
                  <div className="mt-auto">
                    <button className="text-primary-blue font-bold text-sm hover:text-blue-800 transition-colors">
                      Join Event &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Event Card 3 */}
              <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all group flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute top-4 right-4 bg-primary-blue text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
                    Oct 25 | 1 PM
                  </div>
                  <img src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&q=80" alt="Tech Workshop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">Tech Workshop for Seniors</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4 font-medium">
                    <span className="text-gray-600">Seniors learning</span>
                  </div>
                  <div className="flex gap-2 mb-6">
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs font-bold">Orange</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">Blue</span>
                  </div>
                  <div className="mt-auto">
                    <button className="text-primary-blue font-bold text-sm hover:text-blue-800 transition-colors">
                      Join Event &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </HomeClientWrapper>
  );
}
