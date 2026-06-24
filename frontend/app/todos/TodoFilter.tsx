import Link from 'next/link';

export default function TodoFilter({ currentFilter, currentSearch }: { currentFilter: string, currentSearch: string }) {
    const searchParam = currentSearch ? `&search=${currentSearch}` : '';
    
    return (
        <div className="flex gap-2 mb-4 bg-gray-100 p-1.5 rounded-xl w-fit border border-gray-200">
            <Link 
                href={`/todos?filter=all${searchParam}`}
                className={`px-5 py-2 rounded-lg transition-all ${currentFilter === 'all' || !currentFilter ? 'bg-white shadow-sm text-purple-700 font-bold' : 'text-gray-500 hover:text-purple-600 hover:bg-gray-200'}`}
            >
                전체
            </Link>
            <Link 
                href={`/todos?filter=active${searchParam}`}
                className={`px-5 py-2 rounded-lg transition-all ${currentFilter === 'active' ? 'bg-white shadow-sm text-purple-700 font-bold' : 'text-gray-500 hover:text-purple-600 hover:bg-gray-200'}`}
            >
                진행 중
            </Link>
            <Link 
                href={`/todos?filter=completed${searchParam}`}
                className={`px-5 py-2 rounded-lg transition-all ${currentFilter === 'completed' ? 'bg-white shadow-sm text-purple-700 font-bold' : 'text-gray-500 hover:text-purple-600 hover:bg-gray-200'}`}
            >
                완료
            </Link>
        </div>
    )
}
