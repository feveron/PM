import { useEffect, useState } from "react";
import type { TodoItem } from "../types/todo";
import { AddTaskForm } from "../components/AddTaskForm";
import { ToDoList } from "../components/TodoList";
import { FilterBar } from "../components/FilterBar";
import posthog from "posthog-js"
import {
  addTodo as addTodoUtil,
  deleteTodo as deleteTodoUtil,
  updateTodo as updateTodoUtil,
  toggleTodo as toggleTodoUtil,
  filterTodos,
} from "../utils/todoUtils";

export function TasksPage() {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTodos = filterTodos(todos, filter);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ADD
  const addTodo = (title: string, description: string) => {
    setTodos((prev) => addTodoUtil(prev, title, description));

    posthog.capture("task_created", {
      has_description: !!description,
      title_length: title.length,
    });
  };

  // DELETE
  const deleteTodo = (id: number) => {
    setTodos((prev) => deleteTodoUtil(prev, id));

    posthog.capture("task_deleted");
  };

  // UPDATE
  const updateTodo = (
    id: number,
    data: { title: string; description: string }
  ) => {
    setTodos((prev) => updateTodoUtil(prev, id, data));

    posthog.capture("task_updated");
  };

  // TOGGLE
  const toggleTodo = (id: number) => {
    setTodos((prev) => toggleTodoUtil(prev, id));

    posthog.capture("task_completed");
  };

  return (
    <div className="flex items-center flex-col max-w-[1000px] p-4 w-full">
      <p>{import.meta.env.VITE_APP_STATUS}</p>
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