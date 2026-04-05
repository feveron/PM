import { useState } from "react"
import TodoInput from "./TodoInput"

export function AddTaskForm() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleAdd = () => {
        if (!title.trim()) return

        console.log("Added task:", title)
        setTitle("")
        setDescription("")
    }

    return (
        <div className="p-5 w-full flex items-end justify-start gap-4">
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
                onClick={handleAdd}
                className="py-1 px-2 bg-white text-blue-900 border-2 border-blue-900 rounded-md hover:bg-blue-100"
            >
                Add
            </button>
        </div>
    )
}