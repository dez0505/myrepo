import { UPDATE_NATIVE_DATA } from './actionType.js'
export function updateNativeData(data) {
  return {
    type: UPDATE_NATIVE_DATA,
    data
  };
}
// export const addTodo = text => ({
//   type: 'ADD_TODO',
//   id: nextTodoId++,
//   text
// })
