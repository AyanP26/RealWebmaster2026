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

        {/* GALLERY SECTION */}
        <section className="w-full bg-white py-24 px-6 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Gallery of Northern Virginia</h2>
                <p className="text-gray-500 text-lg max-w-xl font-medium leading-relaxed">
                  Capturing the spirit, heritage, and natural splendor of our vibrant local community.
                </p>
              </div>
              <div className="hidden md:block">
                <Link href="/category/nature" className="px-6 py-3 bg-gray-50 text-gray-700 hover:text-emerald-600 rounded-full font-bold text-sm transition-all border border-gray-100 hover:border-emerald-100 shadow-sm">
                  Explore Nature Resources &rarr;
                </Link>
              </div>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {[
                { src: "/Great Falls Virginia Photo (2).jpg", alt: "Great Falls Majestic View" },
                { src: "/Northern Virginia Photo.jpg", alt: "NoVA Landscapes" },
                { src: "/Great Falls Virginia Photo (1).jpg", alt: "Great Falls Rapids" },
                { src: "/Northern Virginia Photo (2).jpg", alt: "Local Architecture" },
                { src: "/Duck on Water.jpg", alt: "Wilderness Moments" },
                { src: "/nova_great_falls.jpg", alt: "Sunset at Great Falls" },
                { src: "/Northern Virginia Photo (1).jpg", alt: "Natural Scenery" },
                { src: "/Great Falls Virginia Photo.jpg", alt: "Great Falls Vista" },
              ].map((img, i) => (
                <div key={i} className="break-inside-avoid relative group rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <p className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.alt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 md:hidden">
                <Link href="/category/nature" className="w-full justify-center flex px-6 py-4 bg-gray-50 text-gray-700 hover:text-emerald-600 rounded-2xl font-bold text-sm transition-all border border-gray-100 shadow-sm">
                  Explore Nature Resources &rarr;
                </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </HomeClientWrapper>
  );
}
