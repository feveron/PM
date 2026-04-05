export type TodoItem = {
  id: number
  done: boolean
  title: string
  description: string
}

export type TodoList = {
  todos: TodoItem[]
}