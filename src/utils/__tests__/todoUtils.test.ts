import { describe, it, expect } from "vitest";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
  filterTodos,
} from "../todoUtils";
import type { TodoItem } from "../../types/todo";

describe("todo utils", () => {
  it("adds todo correctly", () => {
    const result = addTodo([], "Task", "Desc");
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Task");
  });

  it("does not add empty title", () => {
    const result = addTodo([], "", "Desc");
    expect(result.length).toBe(0);
  });

  it("deletes todo by id", () => {
    const todos = [{ id: 1, title: "A", description: "", done: false }];
    const result = deleteTodo(todos, 1);
    expect(result.length).toBe(0);
  });

  it("toggles done status", () => {
    const todos = [{ id: 1, title: "A", description: "", done: false }];
    const result = toggleTodo(todos, 1);
    expect(result[0].done).toBe(true);
  });

  it("updates todo fields", () => {
    const todos = [{ id: 1, title: "A", description: "x", done: false }];
    const result = updateTodo(todos, 1, { title: "B", description: "y" });
    expect(result[0].title).toBe("B");
    expect(result[0].description).toBe("y");
  });

  it("filters active todos", () => {
    const todos = [
      { id: 1, done: false },
      { id: 2, done: true },
    ] as TodoItem[];

    const result = filterTodos(todos, "active");
    expect(result.length).toBe(1);
  });

  it("filters completed todos", () => {
    const todos = [
      { id: 1, done: false },
      { id: 2, done: true },
    ] as TodoItem[];

    const result = filterTodos(todos, "completed");
    expect(result.length).toBe(1);
  });

  it("uses mock data for testing delete", () => {
    const mockTodos = [
        { id: 1, title: "Mock task", description: "Test", done: false }
    ];

    const result = deleteTodo(mockTodos, 1);

    expect(result).toEqual([]);
    });
});