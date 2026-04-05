import type { TodoItem } from "../types/todo";

export function TodoItem({ title, description }: TodoItem) {
  return (
    <div className="flex justify-center bg-white flex-col p-4 border rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold text-black">{title}</h2>
      <p className="text-gray-800">{description}</p>
      
    </div>
  )
}