import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../redux/actions";
import "../styles/TodoApp.css";

const TodoForm = ({ editingTodo, setEditingTodo }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if (editingTodo) {
      setName(editingTodo.name);
      setEmail(editingTodo.email);
    }
  }, [editingTodo]);

  const validate = () => {
    let tempErrors = {};
    if (!name.trim()) {
      tempErrors.name = "Name is required";
    }
    if (!email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Invalid email format";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validate()) return; 

    if (editingTodo) {
      dispatch(updateTodo({ id: editingTodo.id, name, email }));
      setEditingTodo(null);
    } else {
      dispatch(addTodo({ id: Date.now(), name, email }));
    }

    setName("");
    setEmail("");
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{editingTodo ? 'Edit Todo' : 'Add New Todo'}</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
           
            if (errors.name) {
              setErrors(prev => ({
                ...prev,
                name: e.target.value.trim() ? '' : 'Name is required'
              }));
            }
          }}
          placeholder="Enter name"
          className={`form-control ${isSubmitted && errors.name ? 'border-red-300' : ''}`}
        />
        {isSubmitted && errors.name && (
          <div className="error-message">{errors.name}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          
            if (errors.email) {
              setErrors(prev => ({
                ...prev,
                email: !e.target.value.trim() ? 'Email is required' : 
                       !/\S+@\S+\.\S+/.test(e.target.value) ? 'Invalid email format' : ''
              }));
            }
          }}
          placeholder="Enter email"
          className={`form-control ${isSubmitted && errors.email ? 'border-red-300' : ''}`}
        />
        {isSubmitted && errors.email && (
          <div className="error-message">{errors.email}</div>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-primary"
      >
        {editingTodo ? 'Update Todo' : 'Add Todo'}
      </button>
    </form>
  );
};

export default TodoForm;
