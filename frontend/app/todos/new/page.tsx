"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function NewTodoPage() {
    const [title, setTitle] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            const res = await fetch("/api/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });
            if (!res.ok) throw new Error("Failed");
            
            router.push("/todos");
            router.refresh();
        } catch (error) {
            alert("Todo 생성에 실패했습니다.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-[0_10px_15px_-3px_rgba(103,43,224,0.08)] border border-gray-100">
            <h1 className="text-[2.2rem] font-bold mb-8 text-center text-purple-700 tracking-tight">새 할 일 추가</h1>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="할 일을 입력하세요..."
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 bg-white text-gray-800 text-lg transition-colors"
                    autoFocus
                />
                <div className="flex gap-3 justify-end mt-2">
                    <Link href="/todos" className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-lg hover:bg-gray-200 transition-colors">
                        취소
                    </Link>
                    <button type="submit" className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors shadow-sm">
                        추가하기
                    </button>
                </div>
            </form>
        </div>
    )
}
