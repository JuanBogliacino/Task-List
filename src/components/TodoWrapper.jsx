import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import EditTodoForm from "./EditTodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
uuidv4();

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  // Al cargar la página, obtener las tareas almacenadas en localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTasks);
  }, []);

  // Actualizar el localStorage cuando el estado de las tareas cambie
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const validateError = (val) => {
    setError(val);
  };

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const deleteAllTasks = () => {
    setTodos([]);
  };

  const orderReverse = () => {
    setTodos([...todos].reverse());
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} validateError={validateError} />

      {error && <p className="error">you can't add an empty task</p>}

        
      {
        todos.length > 0
        ?
        <>
        <div className="filter-btn">
          <button
            onClick={() => setFilter("All")}
            className={`${filter == "All" ? "selected" : "blue-btn"}`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setFilter("Completed")}
            className={`${filter == "Completed" ? "selected" : "blue-btn"}`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("Unfinished")}
            className={`${filter == "Unfinished" ? "selected" : "blue-btn"}`}
          >
            Unfinished
          </button>
        </div>

      {todos
        .filter((todo) => {
          if (filter === "Completed") {
            return todo.completed;
          } else if (filter === "Unfinished") {
            return !todo.completed;
          }
          return true;
        })
        .map((todo) =>
          todo.isEditing ? (
            <EditTodoForm
              key={todo.id}
              editTask={editTask}
              task={todo}
              editTodo={editTodo}
            />
          ) : (
            <Todo
              key={todo.id}
              task={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          )
        )}

        <div className="delete-order-btn">
          <button onClick={deleteAllTasks} className="deleteAllTasks-btn">
            Delete All Tasks
          </button>
          <button onClick={orderReverse} className="blue-btn">
            Order
          </button>
        </div>
        </>
        : <p className="p-no-tasks">Nothing to do</p>
      }

    </div>
  );
};

export default TodoWrapper;