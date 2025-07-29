import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "../redux/actions";
import "../styles/TodoApp.css";

const TodoList = ({ setEditingTodo }) => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No todos yet. Add one above!
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div className="todo-info">
              <p className="todo-name">{todo.name}</p>
              <p className="todo-email">{todo.email}</p>
            </div>
            <div className="todo-actions">
              <button
                type="button"
                onClick={() => setEditingTodo(todo)}
                className="btn-edit"
                aria-label="Edit todo"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="btn-delete"
                aria-label="Delete todo"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
