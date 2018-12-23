import { UPDATE_LOADED_STATE } from '../actions/actionType'

const initialState = { // 上次请求的各个接口是否加载完成了
  topLine: false,
  cheif: false,
  live: false,
  news: false,
  qus: false,
  event: false,
  notice: false,
  report: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case UPDATE_LOADED_STATE:
    return { ...state, ...payload}
  default:
    return state
  }
}
