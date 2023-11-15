export enum LogMessages {
  GET_ALL_TODOS = 'Retrieving all Todos',
  ERROR_GET_ALL_TODOS = 'Error retrieving all Todos',

  GET_TODO_BY_ID = 'Retrieving Todo by ID',
  MISSING_ID_WARNING = 'No ID provided. Retrieving the entire list instead.',
  ERROR_GET_TODO_BY_ID = 'Error retrieving Todo by ID',

  ADD_TODO = 'Adding a new Todo',
  MISSING_FIELDS_AUTOFILL_WARNING = 'Required fields (id, description, done) are missing. Autofill will be attempted.',
  ERROR_ADD_TODO = 'Error adding a new Todo',

  UPDATE_TODO = 'Updating a Todo',
  NO_DATA_WARNING = 'No data provided. Nothing will be changed.',
  ERROR_UPDATE_TODO = 'Error updating a Todo',

  DELETE_TODO = 'Deleting a Todo',
  ERROR_DELETE_TODO = 'Error deleting a Todo',
}
