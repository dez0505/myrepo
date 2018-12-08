import { combineReducers } from 'redux'
// import updateList from './updateList'
import pageConfig from './pageConfig'
import list from './list'
const rootReducer = combineReducers({
  pageConfig, list
})
export default rootReducer