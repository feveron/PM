export type TodoItem = {
  id: number
  done: boolean
  title: string
  description: string
  onUpdate: (id: number, data: { title: string; description: string }) => void
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

export type TodoList = {
  todos: TodoItem[]
}