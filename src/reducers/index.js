import { combineReducers } from 'redux'
// import updateList from './updateList'
import pageConfig from './pageConfig'
import nativeData from './nativeData'
import list from './list'
import tab from './tab'
import fetch from './fetch'
const rootReducer = combineReducers({
  pageConfig, list, tab, nativeData, fetch
})
export default rootReducer