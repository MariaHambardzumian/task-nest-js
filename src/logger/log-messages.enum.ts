export enum LogMessages {
  getAllTodos = 'Retrieving all Todos',
  ERROR_getAllTodos = 'Error retrieving all Todos',

  getTodoById = 'Retrieving Todo by ID',
  MISSING_ID_WARNING = 'No ID provided. Retrieving the entire list instead.',
  ERROR_getTodoById = 'Error retrieving Todo by ID',

  addTodo = 'Adding a new Todo',
  MISSING_FIELDS_AUTOFILL_WARNING = 'Required fields (id, description, done) are missing. Autofill will be attempted.',
  ERROR_addTodo = 'Error adding a new Todo',

  updateTodo = 'Updating a Todo',
  NO_DATA_WARNING = 'No data provided. Nothing will be changed.',
  ERROR_updateTodo = 'Error updating a Todo',

  deleteTodo = 'Deleting a Todo',
  ERROR_deleteTodo = 'Error deleting a Todo',
}
