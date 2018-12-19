import { UPDATE_NATIVE_DATA } from '../actions/actionType'

const initialState = {
  market: {},                    // 行情 
  optionalCode: '',             // 自选股
  optionalTeam: '',             // 自选股
  optionalChange: {              // 个股异动
    tockcode: '',
    signalvalue: '',
    signalname: '',
    stockname: '',
    direction: ''
  },
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case UPDATE_NATIVE_DATA:
    return { ...state, ...payload}
  default:
    return state
  }
}
