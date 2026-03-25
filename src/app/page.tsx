'use client';

import { useState, useEffect } from 'react';
import { ITodo } from '@/lib/models/todo';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/todos');
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      alert('Failed to fetch todos');
    } finally {
      setIsLoading(false);
    }
  };

  // Create todo
  const handleCreate = async (data: { title: string; description: string }) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newTodo = await response.json();
        setTodos([newTodo, ...todos]);
      } else {
        alert('Failed to create todo');
      }
    } catch (error) {
      console.error('Failed to create todo:', error);
      alert('Failed to create todo');
    }
  };

  // Update todo
  const handleUpdate = async (id: string, updates: Partial<ITodo>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
      } else {
        alert('Failed to update todo');
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
      alert('Failed to update todo');
    }
  };

  // Delete todo
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter((t) => t._id !== id));
      } else {
        alert('Failed to delete todo');
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
      alert('Failed to delete todo');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600">
            Stay organized and manage your daily tasks efficiently
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <TodoForm onSubmit={handleCreate} />
          <TodoList
            todos={todos}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
}
