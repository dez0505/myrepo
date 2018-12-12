import { UPDATE_NATIVE_DATA } from '../actions/actionType'

const initialState = {
  market: 0,                    // 行情
  optionalCode: '',             // 自选股
  optionalTeam: '',             // 自选股
  optionaChange: {              // 个股异动
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
    return { ...state, ...payload.data }
  default:
    return state
  }
}
