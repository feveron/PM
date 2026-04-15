import { AddTaskForm } from "../components/AddTaskForm";
import { ToDoList } from "../components/TodoList";

export function TasksPage() {
  return (
    <div className="flex items-center flex-col max-w-[1000px] p-4">
      <AddTaskForm />
      <ToDoList todos={[
        {
          id: 1,
            title: "Task 1 with a very long title that should be truncated to fit in the UI and not break the layout of the application",
            description: "Huge description for task 1, it can be very long and detailed, describing all the steps needed to complete the task and any relevant information that might be useful for the person who will be working on it. This can include deadlines, resources, and any other important details that will help ensure the task is completed successfully. The description can also include any potential challenges or obstacles that might arise during the completion of the task, as well as any contingency plans or solutions to address those challenges. Overall, the description should provide a clear and comprehensive overview of the task, allowing the person working on it to understand exactly what needs to be done and how to approach it effectively.",
            done: false,
        }, 
        {
          id: 2,
            title: "Task 2",
            description: "Description for task 2",
            done: true,
        }
      ]} />
    </div>
  )
}