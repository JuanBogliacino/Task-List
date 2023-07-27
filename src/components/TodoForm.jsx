import { useState } from "react"

const TodoForm = ({ addTodo, validateError }) => {

  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() == '') {
      return validateError(true)
    }

    addTodo(value);
    setValue('')
    validateError(false)
  } 

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input type="text" className="todo-input" placeholder="What is the task today" value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit" className="todo-btn">Add Task</button>
    </form>
  )
}

export default TodoForm