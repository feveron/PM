import type { TodoList } from "../types/todo";
import { TodoItem } from "./TodoItem";

export function ToDoList({ todos }: TodoList) {
  return (
    <div className="w-full p-4">
      <h1 className="text-3xl mb-4 font-bold text-transparent [-webkit-text-stroke:1px_black]">You have <span className="text-orange-300">{todos.length}</span> tasks:</h1>
      {todos.map((todo) => (
        <div key={todo.id} className="mb-4">
          <TodoItem id={todo.id} title={todo.title} description={todo.description} done={todo.done} />
        </div>
      ))}
    </div>
  );
}