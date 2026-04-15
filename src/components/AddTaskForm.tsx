import { useState } from "react"
import TodoInput from "./TodoInput"

type Props = {
    onAdd: (title: string, description: string) => void
}

export function AddTaskForm({ onAdd }: Props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    return (
        <div className="p-5 w-full flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4">
            <TodoInput
                placeholder="Enter task title"
                setValue={setTitle}
                value={title}
                label="Title"
            />
            <TodoInput
                placeholder="Enter task description"
                setValue={setDescription}
                value={description}
                label="Description"
            />
            <button
                onClick={() => onAdd(title, description)}
                className="py-1 px-6 bg-white text-orange-900 border-2 border-orange-900 rounded-md hover:bg-orange-100"
            >   
                Add
            </button>
        </div>
    )
}