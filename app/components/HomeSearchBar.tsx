'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function HomeSearchBar() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className="w-full bg-white shadow-xl shadow-gray-200/50 rounded-full flex items-center p-2 border border-gray-100 transition-all focus-within:ring-4 focus-within:ring-blue-500/10"
        >
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for resources, events, or categories (e.g., 'Food Pantry', 'Yoga')"
                className="flex-grow py-3 px-6 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-lg w-full min-w-0"
            />
            <button
                type="submit"
                className="bg-accent-orange text-white w-14 h-14 flex items-center justify-center rounded-full hover:bg-orange-500 transition-colors flex-shrink-0 shadow-md shadow-orange-500/20"
                aria-label="Search"
            >
                <Search className="h-6 w-6" />
            </button>
        </form>
    );
}
