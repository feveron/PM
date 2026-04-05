import type { TodoList } from "../types/todo";
import { TodoItem } from "./TodoItem";

export function ToDoList({ todos }: TodoList) {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold text-black mb-4 underline">My tasks:</h1>
      {todos.map((todo) => (
        <div key={todo.id} className="mb-4">
          <TodoItem id={todo.id} title={todo.title} description={todo.description} done={todo.done} />
        </div>
      ))}
    </div>
  );
}