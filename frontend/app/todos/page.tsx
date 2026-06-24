import { Suspense } from "react"
import { getTodos } from "../actions"
import Link from "next/link"
import TodoFilter from "./TodoFilter"
import TodoSearch from "./TodoSearch"
import TodoItem from "./TodoItem"

export default async function TodosPage(props: { searchParams: Promise<{ filter?: string; search?: string }> }) {
    const searchParams = await props.searchParams;
    const filter = searchParams.filter;
    const search = searchParams.search;
    
    const todos = await getTodos(filter, search);
    
    return (
        <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-[0_10px_15px_-3px_rgba(103,43,224,0.08)] border border-gray-100">
            <h1 className="text-[2.2rem] font-bold mb-8 text-center text-purple-700 tracking-tight">할 일 목록</h1>
            
            <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
                <Suspense fallback={<div>Loading search...</div>}>
                    <TodoSearch initialSearch={search || ''} />
                </Suspense>
                <Link href="/todos/new" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-center shrink-0 transition-colors font-semibold shadow-sm">
                    새 할 일 추가
                </Link>
            </div>
            
            <TodoFilter currentFilter={filter || 'all'} currentSearch={search || ''} />
            
            <div className="mt-6 space-y-3">
                {todos.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">할 일이 없습니다.</p>
                ) : (
                    todos.map((todo: any) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))
                )}
            </div>
        </div>
    )
}
