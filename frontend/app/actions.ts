"use server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

export async function getTodos(filter?: string, search?: string) {
    const url = new URL(`${BACKEND_URL}/todos`)
    if (filter) url.searchParams.append("filter", filter)
    if (search) url.searchParams.append("search", search)
    
    // Server action to fetch from FastAPI directly
    const res = await fetch(url.toString(), { cache: "no-store" })
    if (!res.ok) throw new Error("Failed to fetch todos")
    return res.json()
}

export async function getTodo(id: string) {
    const res = await fetch(`${BACKEND_URL}/todos/${id}`, { cache: "no-store" })
    if (!res.ok) throw new Error("Failed to fetch todo")
    return res.json()
}
