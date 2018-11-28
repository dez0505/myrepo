import {
  UPDATE_LIST,
} from '../actions/actionType'

const initialState = [
]
export default function todos(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LIST:
      return  { ...state, ...action.list } 
    default:
      return state
  }
}
