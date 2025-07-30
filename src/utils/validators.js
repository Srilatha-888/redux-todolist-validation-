import * as Yup from 'yup';
export const getTodoValidationSchema = (todos, editingId = null) => {
  return Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters'),
      
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format')
      .max(100, 'Email cannot exceed 100 characters')
      .test(
        'unique-email',
        'This email is already in use',
        function(value) {
          if (!value) return true;
          return !todos.some(
            todo => 
              todo.email.toLowerCase() === value.toLowerCase() && 
              todo.id !== editingId
          );
        }
      )
  });
};

export const validateTodo = (todos, newTodo, editingId = null) => {
  const schema = getTodoValidationSchema(todos, editingId);
  try {
    schema.validateSync(newTodo, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    const errors = {};
    err.inner.forEach(error => {
      errors[error.path] = error.message;
    });
    return { isValid: false, errors };
  }
};
export const getInitialValues = (editingTodo = null) => ({
  name: editingTodo?.name || '',
  email: editingTodo?.email || ''
});
