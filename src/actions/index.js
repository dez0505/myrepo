import { UPDATE_PAGECONFIG } from './actionType.js'

export function updatePageConfig(pageConfig) {
  return {
    type: UPDATE_PAGECONFIG,
    pageConfig
  };
}
// export const addTodo = text => ({
//   type: 'ADD_TODO',
//   id: nextTodoId++,
//   text
// })
