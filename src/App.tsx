import { AddTaskForm } from "./components/AddTaskForm"
import { CheckBox } from "./components/CheckBox"

function App() {
  return (
    <div className="flex items-center flex-col">
      <AddTaskForm />
      <CheckBox checked={false} onChange={(checked) => console.log("Checked:", checked)} />
    </div>
  )
}

export default App