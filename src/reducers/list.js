import {
  UPDATE_LOADING_STATE,
  UPDATE_DATA_STATE,
  UPDATE_INTERFACE_STATE,
  UPDATE_LIST_DATA,
  RESET_STATE,
} from '../actions/actionType'

const initialState = {
  loadingState: {
    initLoading: false,           // 初始化loading 针对整个页面
    refreshLoading: false,        // 刷新loading 只针对列表
    loadLoading: false,           // 加载Loading 针对加载更多的loading
  },
  dataState: {
    isNoData: false,              // 起初没有数据
    isNoMoreData: false,          // 加载更多时没有数据
  },
  interfaceState: {
    whichLoading: '',             // 当前接口加载
    whichLoadedFail: '',          // 接口加载失败
  },
  listData: {
    topLineList: [],              // 头条
    cheifList: [],                // 首席
    liveList: [],                 // 直播
    newsList: [],                 // 新闻
    qusList: [],                  // 问董秘
    bigEventList: [],             // 大事件
    noticeList: [],               // 公告
    reportList: []                // 研报
  }
}
export default function list(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOADING_STATE:    // 更新loading状态
      const loadingState = {...state.loadingState,...action.loadingState}
      return  { ...state, loadingState }

    case UPDATE_DATA_STATE:       // 更新data状态
      const dataState = { ...state.dataState, ...action.dataState }
      return  { ...state.dataState, dataState }

    case UPDATE_INTERFACE_STATE:  // 更新接口状态
      const interfaceState = { ...state.interfaceState, ...action.interfaceState }
      return  { ...state, interfaceState }

    case UPDATE_LIST_DATA:        // 更新列表数据
      const listData = { ...state.listData, ...action.listData }
      return  { ...state.listData, listData:listData }
      
    case RESET_STATE:             // 重置list状态
      return  { ...state, ...initialState }
    default:
      return state
  }
}
