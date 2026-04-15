import { useEffect, useState } from "react";
import type { TodoItem } from "../types/todo";
import { AddTaskForm } from "../components/AddTaskForm";
import { ToDoList } from "../components/TodoList";

export function TasksPage() {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  // save
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ADD
  const addTodo = (title: string, description: string) => {
    if (!title.trim()) return;

    const newTodo: TodoItem = {
      id: Date.now(),
      title,
      description,
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  // DELETE
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // UPDATE
  const updateTodo = (
    id: number,
    data: { title: string; description: string }
  ) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
  };

  // TOGGLE
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="flex items-center flex-col max-w-[1000px] p-4 w-full">
      <AddTaskForm onAdd={addTodo} />

      <ToDoList
        todos={todos}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
        onToggle={toggleTodo}
      />
    </div>
  );
}