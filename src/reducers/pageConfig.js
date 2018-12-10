import {
  UPDATE_PAGECONFIG,
} from '../actions/actionType'

const initialState = {
  theme: '',
  version: '',
  htid: '',
  platform: '',
  account: ''
}
export default function todos(state = initialState, action) {
  console.log(11111111, action)
  switch (action.type) {
    case UPDATE_PAGECONFIG:
      return  { ...state, ...action.pageConfig } // ===> Object.assign({theme: ''},{theme: 'whitle'}) 
    default:
      return state
  }
}
