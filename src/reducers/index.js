import { combineReducers } from 'redux'
import todos from './todos'
import doList from './doList'
const rootReducer = combineReducers({
  todos
})
export default rootReducer