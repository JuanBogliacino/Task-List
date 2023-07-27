import { useState, useEffect } from "react"
import TodoForm from "./TodoForm"
import EditTodoForm from "./EditTodoForm"
import { v4 as uuidv4 } from "uuid"
import Todo from "./Todo"
uuidv4()

const TodoWrapper = () => {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState(null)

    // Al cargar la página, obtener las tareas almacenadas en localStorage
    useEffect(() => {
      const storedTasks = JSON.parse(localStorage.getItem('todos')) || [];
      setTodos(storedTasks);
    }, []);
  
    // Actualizar el localStorage cuando el estado de las tareas cambie
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

  const validateError = (val) => {
    setError(val)
  }

  const addTodo = (todo) => {
    setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}])
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing : !todo.isEditing} : todo))
  }

  const editTask = (task, id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing : !todo.isEditing} : todo))
  }

  const deleteAllTasks = () => {
    setTodos([])
  }

  const orderReverse = () => {
    setTodos([...todos].reverse());
  }

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
     <TodoForm addTodo={addTodo} validateError={validateError} />

     {error && <p className="error">no puedes agregar una tarea vacía</p>}

     {todos.map(todo => (
      todo.isEditing 
      ? (
        <EditTodoForm key={todo.id} editTask={editTask} task={todo} editTodo={editTodo} />
      )
      : (
        <Todo key={todo.id} task={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
      )
     ))}

     {todos.length > 0 &&
     <div className="btn-bottom">
      <button onClick={deleteAllTasks} className="deleteAllTasks-btn">Delete All Tasks</button>
      <button onClick={orderReverse} className="order-btn">Order</button>
     </div> 
     }
    </div>
  )
}

export default TodoWrapper