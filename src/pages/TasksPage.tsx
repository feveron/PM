import { useEffect, useState } from "react";
import type { TodoItem } from "../types/todo";
import { AddTaskForm } from "../components/AddTaskForm";
import { ToDoList } from "../components/TodoList";
import { FilterBar } from "../components/FilterBar";

export function TasksPage() {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
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
      <FilterBar filter={filter} setFilter={setFilter} />
      <ToDoList
        todos={filteredTodos}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
        onToggle={toggleTodo}
      />
    </div>
  );
}