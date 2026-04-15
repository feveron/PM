import type { TodoItem } from "../types/todo";
import { TodoItem as TodoItemComponent } from "./TodoItem";

type Props = {
  todos: TodoItem[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: { title: string; description: string }) => void;
  onToggle: (id: number) => void;
};

export function ToDoList({ todos, onDelete, onUpdate, onToggle }: Props) {
  return (
    <div className="w-full p-4">
      <h1 className="text-3xl mb-4 font-bold text-transparent [-webkit-text-stroke:1px_black]">
        You have <span className="text-orange-300">{todos.length}</span> tasks:
      </h1>

      {todos.map((todo) => (
        <div key={todo.id} className="mb-4">
          <TodoItemComponent
            {...todo}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onToggle={onToggle}
          />
        </div>
      ))}
    </div>
  );
}