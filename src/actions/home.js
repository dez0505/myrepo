// api
import getCheifList  from './tab/cheif'
import getTopLineList  from './tab/topLine'
import getLiveList from './tab/live'
import { getNewsList, getOptionalList } from './tab/optional'
// actions
import { updateTabIndex } from './tab'
import { updatePageConfig } from './index'
import { resetState, updateLoadingState ,updateInterfaceState} from './list'
// utils
import { getManDianParams, getQueryString } from '../utils/common'

// type : optional  home
// index : 切换的下标 
// hasMandian 是否执行埋点
export function updateTabIndexCallBack(index, type, hasMandian = true) {
  return  (dispatch, getState) => {
    const activeType = type === 'home' ? 'activeHomeTabIndex' : 'activeOptionalTabIndex'
    const activeTabIndex = getState().tab.tabIndexData[activeType]
    if(index === activeTabIndex) return
    // 1、清空所有状态
    dispatch(resetState())
    // 监听是否移到起初页
    const tabIsFixed = getState().pageConfig.tabIsFixed
    if(tabIsFixed) {
      const scrollToStartPosition = getState().pageConfig.scrollToStartPosition
      dispatch(updatePageConfig({scrollToStartPosition:!scrollToStartPosition}))
    }
    // 2、增加埋点
    if(hasMandian) {
      if(type==='home') {
        _goToTabFunction('tab' + index)
      } else {
        _goToTabFunction('optional' + index)
      }
    }
    // 3、切换到当前index
    dispatch(updateTabIndex({[activeType]:index}))
    // 4、切换当前whichLoading
    _updateWhichLoading(index, type, dispatch, getState)
    // 5 更新刷新状态
    const activeWhichLoading = getState().list.interfaceState.whichLoading
    if(activeWhichLoading === 'more') return
    dispatch(updateLoadingState({refreshLoading: true}))
    // 6 根据whichLoading掉接口
    _getTabList(activeWhichLoading, 'init', dispatch)
  }
}
// 加载更多列表数据
export function loadListEvent() {
  return (dispatch, getState) => {
    // 0 如果正在加载中，则不加载数据
    const loadLoading = getState().list.loadingState.loadLoading
    if(loadLoading) return
    // 1 加载中状态
    dispatch(updateLoadingState({loadLoading: true}))
    // 2、调用哪个接口
    const activeWhichLoading = getState().list.interfaceState.whichLoading
    _getTabList(activeWhichLoading, 'load', dispatch)
  }
}
// 刷新整个首页home数据
export function refreshHomeEvent () {
  console.log('更新首页')
  return (dispatch, getState) => {
    // 1、根据initLoading判断是否执行
    const initLoading = getState().list.loadingState.initLoading
    if(initLoading) return
    // 2 数据初始化
    dispatch(resetState())
    // 3 更新中
    dispatch(updateLoadingState({initLoading: true})) // 头部加载状态
    const activeWhichLoading = getState().list.interfaceState.whichLoading
    const isRefreshHomeApi = getState().pageConfig.isRefreshHomeApi
    // 4 通知首页进行更新
    dispatch(updatePageConfig({isRefreshHomeApi:!isRefreshHomeApi}))
    // 5 判断是否是more 不是more的要进行列表更新
    if(activeWhichLoading === 'more') return
    console.log('更新列表')
    dispatch(updateLoadingState({refreshLoading: true}))
    _getTabList(activeWhichLoading, 'init', dispatch)
  }
}
// 刷新列表数据
export function refreshListEvent(hasScrollToElement = true) { // hasScrollToElement true: 必顺执行scrollToElement 
  return (dispatch, getState) => {
    // 1、跳回list顶部  只要执行了这个都跳到首页
    if(hasScrollToElement) {
      const tabIsFixed = getState().pageConfig.tabIsFixed
      if(tabIsFixed) {
        const scrollToStartPosition = getState().pageConfig.scrollToStartPosition
        dispatch(updatePageConfig({scrollToStartPosition:!scrollToStartPosition}))
      }
    }
    // 2 如果状态正在加载中，则不刷新
    const activeWhichLoading = getState().list.interfaceState.whichLoading
    const refreshLoading = getState().list.loadingState.refreshLoading
    if(refreshLoading || activeWhichLoading === 'more') return
    // 3  清空状态
    dispatch(resetState())
    // 4  改变加载中状态
    dispatch(updateLoadingState({refreshLoading: true}))
    // 5  根据whichLoading 调用哪个接口
    _getTabList(activeWhichLoading, 'init', dispatch)
  }
}
// index 根据下标进行更换whichLoading
// type home optional
function _updateWhichLoading(index, type, dispatch, getState) {
  if(type === 'home') {
    if(index!==3) {
      dispatch(updateTabIndex({activeOptionalTabIndex: -1})) // 归一
    }
    switch (index) {
      case 0:
        dispatch(updateInterfaceState({whichLoading: 'topLine'}))
        break;
      case 1:
        dispatch(updateInterfaceState({whichLoading: 'cheif'}))
        break;
      case 2:
        dispatch(updateInterfaceState({whichLoading: 'liveA'}))
        break;
      case 3:
        dispatch(updateTabIndexCallBack(0, 'optional', false)) 
        break;
      case 4:
        dispatch(updateInterfaceState({whichLoading:'more'}))
        break;
      default:
        break;
    }
  } else {
    switch (index) {
      case 0:
        dispatch(updateInterfaceState({whichLoading:'news'}))
        break;
      case 1:
        dispatch(updateInterfaceState({whichLoading:'qus'}))
        break;
      case 2:
        dispatch(updateInterfaceState({whichLoading:'event'}))
        break;
      case 3:
        dispatch(updateInterfaceState({whichLoading:'notice'}))
        break;
      case 4:
        dispatch(updateInterfaceState({whichLoading:'report'}))
        break;
      default:
        break;
    }
  }
}
// 埋点
function _goToTabFunction (tabIndex) {
  let clickParam = getManDianParams(tabIndex)
  if (getQueryString('platform').toLowerCase().indexOf('iphone') >= 0) {
    console.log(99999999999999, 'ehtsec@logNative?' + clickParam.slice(1))
    window.location.href = 'ehtsec@logNative?' + clickParam.slice(1)
  } else {
    console.log(99999999999999, 'ehtsec://logNative?' + clickParam.slice(1))
    window.location.href = 'ehtsec://logNative?' + clickParam.slice(1)
  }
}
// 调接口，得到listData
function _getTabList(whichLoading, type = 'init', dispatch) {
  switch (whichLoading) {
    case 'topLine':
      dispatch(getTopLineList(type))
      break;
    case 'cheif':
      dispatch(getCheifList(type))
      break;
    case 'liveA':
      dispatch(getLiveList(type, 'A'))
      break;
    case 'liveAll':
      dispatch(getLiveList(type, 'All'))
      break;
    case 'news':
      dispatch(getNewsList(type))
      break;
    case 'qus':
      dispatch(getOptionalList(type, 'qus'))
      break;
    case 'event':
      dispatch(getOptionalList(type, 'event'))
      break;
    case 'notice':
      dispatch(getOptionalList(type, 'notice'))
      break;
    case 'report':
      dispatch(getOptionalList(type, 'report'))
      break;
    default:
      break;
  }
}

