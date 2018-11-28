export const UPDATE_LIST = "UPDATE_LIST";

export function updateList(list) {
  return {
    type: "UPDATE_LIST",
    list
  };
}
// export const addTodo = text => ({
//   type: 'ADD_TODO',
//   id: nextTodoId++,
//   text
// })
