"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"

export default function TodoItem({ todo }: { todo: any }) {
    const router = useRouter();

    const handleToggle = async () => {
        try {
            const res = await fetch(`/api/todos/${todo.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: !todo.completed }),
            });
            if (!res.ok) throw new Error("Failed");
            router.refresh();
        } catch (e) {
            alert("상태 변경에 실패했습니다.");
        }
    };

    const handleDelete = async () => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        try {
            const res = await fetch(`/api/todos/${todo.id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed");
            router.refresh();
        } catch (e) {
            alert("삭제에 실패했습니다.");
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 flex-1">
                <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onChange={handleToggle}
                    className="w-5 h-5 cursor-pointer accent-purple-600 rounded"
                />
                <span className={`text-lg font-medium transition-all ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {todo.title}
                </span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link 
                    href={`/todos/${todo.id}`}
                    className="px-3 py-1.5 text-sm font-semibold bg-[#fffbeb] text-[#f59e0b] rounded hover:bg-[#f59e0b] hover:text-white transition-colors"
                >
                    수정
                </Link>
                <button 
                    onClick={handleDelete}
                    className="px-3 py-1.5 text-sm font-semibold bg-[#fef2f2] text-[#ef4444] rounded hover:bg-[#ef4444] hover:text-white transition-colors"
                >
                    삭제
                </button>
            </div>
        </div>
    )
}
