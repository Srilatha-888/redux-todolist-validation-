import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./styles/TodoApp.css";

function App() {
  const [editingTodo, setEditingTodo] = useState(null);

  return (
    <div className="todo-app">
      <div className="todo-container">
        <TodoForm editingTodo={editingTodo} setEditingTodo={setEditingTodo} />
        <TodoList setEditingTodo={setEditingTodo} />
      </div>
    </div>
  );
}

export default App;