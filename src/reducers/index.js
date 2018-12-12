import { combineReducers } from 'redux'
// import updateList from './updateList'
import pageConfig from './pageConfig'
import nativeData from './nativeData'
import list from './list'
import tab from './tab'
const rootReducer = combineReducers({
  pageConfig, list, tab, nativeData
})
export default rootReducer