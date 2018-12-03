import { UPDATE_THEME } from './actionType.js'
export function updateTheme(theme) {
  return {
    type: UPDATE_THEME,
    theme
  };
}
// export const addTodo = text => ({
//   type: 'ADD_TODO',
//   id: nextTodoId++,
//   text
// })
