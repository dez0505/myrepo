import {
  UPDATE_LIST,
} from '../actions/topLine.js'

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
