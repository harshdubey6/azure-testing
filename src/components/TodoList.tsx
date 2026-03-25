'use client';

import { ITodo } from '@/lib/models/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: ITodo[];
  onUpdate: (id: string, updates: Partial<ITodo>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export default function TodoList({
  todos,
  onUpdate,
  onDelete,
  isLoading = false,
}: TodoListProps) {
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (totalCount === 0) {
    return (
      <div className="text-center py-12 bg-gradient-to-b from-gray-50 to-white rounded-lg border-2 border-dashed border-gray-300">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-gray-500 text-lg">No todos yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Your Todos
        </h2>
        <div className="text-sm text-gray-600">
          <span className="font-medium">{completedCount}</span> of{' '}
          <span className="font-medium">{totalCount}</span> completed
        </div>
      </div>

      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={String(todo._id)}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
