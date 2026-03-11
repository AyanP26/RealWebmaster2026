import { Apple, HeartPulse, BookOpen, HandHeart, Briefcase, MapPin } from "lucide-react";
import Footer from "./components/Footer";
import HomeSearchBar from "./components/HomeSearchBar";
import HomeClientWrapper from "./components/HomeClientWrapper";
import Link from "next/link";

export default function Home() {
  return (
    <HomeClientWrapper>
      {/* Abstract Background Ribbons (original) */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none z-0">
        <svg viewBox="0 0 1440 800" className="absolute top-0 w-full h-full opacity-80" preserveAspectRatio="xMidYMid slice">
          <path d="M-100 0 C 300 400, 600 -100, 1540 800 L -100 800 Z" fill="url(#blueGradHome)" opacity="0.05" />
          <path d="M-100 200 C 400 800, 800 100, 1540 600 L -100 800 Z" fill="url(#orangeGradHome)" opacity="0.04" />
          <path d="M1540 0 C 1200 300, 800 -200, -100 600 L 1540 -100 Z" stroke="url(#blueGradHome)" strokeWidth="40" fill="none" opacity="0.1" />
          <path d="M1540 200 C 1000 700, 400 0, -100 800" stroke="url(#orangeGradHome)" strokeWidth="60" fill="none" opacity="0.1" />

          <defs>
            <linearGradient id="blueGradHome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="orangeGradHome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full filter blur-[120px]"></div>
      </div>

      <main className="flex-grow relative z-10 w-full flex flex-col items-center">

        {/* SEARCH SECTION */}
        <section className="w-full max-w-5xl mx-auto px-6 pt-16 pb-16 flex flex-col items-center text-center relative overflow-hidden">
          {/* Option 4: Geometric Tile Pattern Background */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231d4ed8' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ea580c' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.41L2.83 4.24 4.24 2.83 1.41 0H0v1.41zm40 37.18L37.17 35.76l-1.41 1.41L38.59 40H40v-1.41zM40 1.41L37.17-1.41l-1.41 1.41L38.59 0H40v1.41zM20 18.59l2.83-2.83 1.41 1.41L21.41 20H20v-1.41zM20 1.41L22.83 4.24 24.24 2.83 21.41 0H20v1.41zM20 38.59l2.83-2.83 1.41 1.41L21.41 40H20v-1.41z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-primary-blue mb-6 tracking-tight leading-tight max-w-3xl">
            Find Resources Near You
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl font-medium leading-relaxed">
            Search from hundreds of community resources, food banks, healthcare providers, and more across Northern Virginia.
          </p>

          <div className="w-full max-w-3xl mb-10 relative">
            <HomeSearchBar />
          </div>

          <p className="text-sm font-semibold text-gray-400 mb-4 tracking-wide uppercase">
            Browse by Category
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-4xl">
            <Link href="/category/food" className="flex items-center space-x-2 bg-primary-blue hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 shadow-md shadow-blue-500/20">
              <Apple className="w-4 h-4" />
              <span>Food &amp; Basic Needs</span>
            </Link>
            <Link href="/category/health" className="flex items-center space-x-2 bg-accent-orange hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 shadow-md shadow-orange-500/20">
              <HeartPulse className="w-4 h-4" />
              <span>Healthcare</span>
            </Link>
            <Link href="/category/education" className="flex items-center space-x-2 bg-primary-blue hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 shadow-md shadow-blue-500/20">
              <BookOpen className="w-4 h-4" />
              <span>Education</span>
            </Link>
            <Link href="/category/government" className="flex items-center space-x-2 bg-accent-orange hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 shadow-md shadow-orange-500/20">
              <Briefcase className="w-4 h-4" />
              <span>Government &amp; Legal</span>
            </Link>
            <Link href="/category/community" className="flex items-center space-x-2 bg-primary-blue hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 shadow-md shadow-blue-500/20">
              <HandHeart className="w-4 h-4" />
              <span>Community &amp; Rec</span>
            </Link>
            <Link href="/category/restaurants" className="flex items-center space-x-2 bg-accent-orange hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 shadow-md shadow-orange-500/20">
              <MapPin className="w-4 h-4" />
              <span>Restaurants</span>
            </Link>
          </div>
        </section>

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
