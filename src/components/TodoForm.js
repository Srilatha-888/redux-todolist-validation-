import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addTodo, updateTodo } from "../redux/actions";
import { getTodoValidationSchema, getInitialValues } from "../utils/validators";
import "../styles/TodoApp.css";

const TodoForm = ({ editingTodo, setEditingTodo }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const validationSchema = getTodoValidationSchema(todos, editingTodo?.id || null);
  const initialValues = getInitialValues(editingTodo);

  const handleSubmit = (values, { resetForm }) => {
    if (editingTodo) {
      dispatch(updateTodo({ id: editingTodo.id, ...values }));
      setEditingTodo(null);
    } else {
      dispatch(addTodo({ id: Date.now(), ...values }));
    }
    resetForm();
  };

  return (
    <div className="todo-form">
      <h2>{editingTodo ? "Edit Todo" : "Add New Todo"}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        context={{
          todos,
          editingId: editingTodo?.id || null,
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Enter name"
                className={`form-control ${
                  errors.name && touched.name ? "border-red-300" : ""
                }`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                className={`form-control ${
                  errors.email && touched.email ? "border-red-300" : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {editingTodo ? "Update Todo" : "Add Todo"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TodoForm;
