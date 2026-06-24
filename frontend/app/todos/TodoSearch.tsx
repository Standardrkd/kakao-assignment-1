"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function TodoSearch({ initialSearch }: { initialSearch: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState(initialSearch);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        
        if (keyword) {
            current.set('search', keyword);
        } else {
            current.delete('search');
        }
        
        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.push(`/todos${query}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
            <input 
                type="text" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="검색어를 입력하세요..." 
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 bg-white text-gray-800"
            />
            <button type="submit" className="px-5 py-2 bg-gray-100 text-gray-600 font-bold border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors shrink-0">
                검색
            </button>
        </form>
    )
}
