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
import * as Sentry from "@sentry/react"

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

  useEffect(() => {
    Sentry.setUser({
      id: "todo-user-1",
      email: "student@test.com",
      username: "Todo App User",
    })

    Sentry.setTag("page", "tasks")
    Sentry.setTag("project", "PM Todo App")
  }, [])

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
      <button
        onClick={() => {
          const value: any = null
          value.todoAlertUniqueMethod()
        }}
        className="px-4 my-4 py-2 bg-red-500 text-white rounded"
      >
        Викликати помилку
      </button>
      <FilterBar filter={filter} setFilter={setFilter} />
      <button
        onClick={() => {
          throw new Error(`Sentry Test Error: Todo app failed ${Date.now()}`)
        }}
        className="px-4 mt-4 py-2 bg-red-500 text-white rounded"
      >
        Викликати помилку
      </button>
      <ToDoList
        todos={filteredTodos}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
        onToggle={toggleTodo}
      />
    </div>
  );
}