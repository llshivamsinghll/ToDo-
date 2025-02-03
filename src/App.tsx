import React, { useState, KeyboardEvent } from 'react';
import { ListTodo } from 'lucide-react';
import { TodoItem } from './components/TodoItem';
import { useTodos } from './hooks/useTodos';
import { FilterStatus } from './types';

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    filter,
    setFilter,
    clearCompleted,
    totalTodos,
    activeTodos
  } = useTodos();
  
  const [newTodo, setNewTodo] = useState('');

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const filterButtons: { label: string; value: FilterStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto pt-12 px-4">
        <div className="flex items-center gap-3 mb-8">
          <ListTodo size={32} className="text-emerald-500" />
          <h1 className="text-3xl font-bold text-gray-800">Todo App</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done? Press Enter to add"
              className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="divide-y divide-gray-100">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>

          {totalTodos > 0 && (
            <div className="p-4 bg-gray-50 flex items-center justify-between text-sm text-gray-500">
              <span>{activeTodos} items left</span>
              
              <div className="flex gap-2">
                {filterButtons.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => setFilter(value)}
                    className={`px-3 py-1 rounded ${
                      filter === value
                        ? 'bg-emerald-500 text-white'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                onClick={clearCompleted}
                className="hover:text-gray-700"
              >
                Clear completed
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Press Enter to add a new todo</p>
          <p>Click the circle to complete a todo</p>
          <p>Hover over a todo to reveal the delete button</p>
        </div>
      </div>
    </div>
  );
}

export default App;