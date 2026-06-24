import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function PUT(request: Request, context: any) {
    // Await params because Next.js 15+ sometimes requires params to be awaited
    // or just handle params asynchronously if next 15 expects it.
    // In Next 15, `params` is a Promise!
    const { todoId } = await context.params;
    
    try {
        const body = await request.json();
        const res = await fetch(`${BACKEND_URL}/todos/${todoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error('Failed to update');
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: any) {
    const { todoId } = await context.params;
    try {
        const res = await fetch(`${BACKEND_URL}/todos/${todoId}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete');
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
    }
}
