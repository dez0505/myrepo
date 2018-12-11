import { UPDATE_NATIVE_DATA } from '../actions/actionType'

const initialState = {
  market: 0,                    // 行情
  optionalCode: '',             // 自选股
  optionalTeam: '',             // 自选股
  optionaChange: '',            // 个股异动
}

export default (state = initialState, { type, payload }) => {
  console.log(898989, payload)
  switch (type) {
  case UPDATE_NATIVE_DATA:
    return { ...state, ...payload.data }
  default:
    return state
  }
}
