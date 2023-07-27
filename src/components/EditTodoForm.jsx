import { useState } from "react"

const EditTodoForm = ({ editTask, editTodo, task }) => {

  const [value, setValue] = useState(task.task)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() == '') {
      return editTodo(task.id)
    }

    editTask(value, task.id);

    setValue('')
  } 

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input type="text" className="todo-input" placeholder="Update task" value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit" className="todo-btn">Update Task</button>
    </form>
  )
}

export default EditTodoForm