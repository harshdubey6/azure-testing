import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Todo from '@/lib/models/todo';

export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    if (!data.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const todo = await Todo.create({
      title: data.title,
      description: data.description || '',
      completed: false,
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}
