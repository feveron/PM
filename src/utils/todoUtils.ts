import type { TodoItem } from "../types/todo";

export const addTodo = (todos: TodoItem[], title: string, description: string) => {
  if (!title.trim()) return todos;

  const newTodo: TodoItem = {
    id: Date.now(),
    title,
    description,
    done: false,
  };

  return [...todos, newTodo];
};

export const deleteTodo = (todos: TodoItem[], id: number) => {
  return todos.filter((t) => t.id !== id);
};

export const updateTodo = (
  todos: TodoItem[],
  id: number,
  data: { title: string; description: string }
) => {
  return todos.map((t) =>
    t.id === id ? { ...t, ...data } : t
  );
};

export const toggleTodo = (todos: TodoItem[], id: number) => {
  return todos.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );
};

export const filterTodos = (
  todos: TodoItem[],
  filter: "all" | "active" | "completed"
) => {
  if (filter === "active") return todos.filter((t) => !t.done);
  if (filter === "completed") return todos.filter((t) => t.done);
  return todos;
};