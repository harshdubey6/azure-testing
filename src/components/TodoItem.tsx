'use client';

import { useState } from 'react';
import { ITodo } from '@/lib/models/todo';

interface TodoItemProps {
  todo: ITodo;
  onUpdate: (id: string, updates: Partial<ITodo>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await onUpdate(String(todo._id), { completed: !todo.completed });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setIsLoading(true);
      try {
        await onDelete(String(todo._id));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
      todo.completed
        ? 'bg-gray-50 border-gray-200'
        : 'bg-white border-gray-300 hover:border-blue-400'
    }`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isLoading}
        className="mt-1 w-5 h-5 text-blue-600 rounded cursor-pointer disabled:opacity-50"
      />
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold text-lg ${
          todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
        }`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className={`text-sm mt-1 break-words ${
            todo.completed ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {todo.description}
          </p>
        )}
        {todo.createdAt && (
          <p className="text-xs text-gray-400 mt-2">
            {new Date(todo.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="flex-shrink-0 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
