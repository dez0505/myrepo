import {
  UPDATE_THEME,
} from '../actions/actionType'

const initialState = {
  theme: 'white'
}
export default function todos(state = initialState, action) {
  switch (action.type) {
    case UPDATE_THEME:
      return  { ...state, ...action.theme } 
    default:
      return state
  }
}
