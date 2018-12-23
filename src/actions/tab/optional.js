import { getOptionalNews, getOptionalBigEvent, getOptionalQuestions, getOptionalReports, getOptionalNotices } from '../../api/optional'
// redux
import {
  updateInterfaceState,
  updateLoadingState,
  updateDataState,
  updateListData,
  updateInterfaceParams
} from '../list'
import {
  updateLoadedState
} from '../index'
import { handleData } from '@/utils/common'

export function getNewsList (type) {
  return async (dispatch, getState) => {
    const listData = getState().list.listData
    const interfaceParams = getState().list.interfaceParams
    const TradingCode = getState().nativeData.optionalCode
    const newsLoadedState = getState().fetch.news
    if(newsLoadedState) return
    dispatch(updateLoadedState({
      news: true
    }))
    try {
      // 入参
      const {
        pageSize,
        pageNum
      } =interfaceParams
      const optionalParams = {
        PageSize: pageSize,
        PageNum: pageNum,
        TradingCode: TradingCode
      }
      // 接口
      const {
        data
      } = await getOptionalNews(optionalParams)
      dispatch(updateLoadedState({
        news: false
      }))
      // 判断是空或没有更多
      const whichLoading = getState().list.interfaceState.whichLoading
      if (whichLoading !== 'news') return
      const objData = data.content
      handleData(objData, 'dataRecord', 'dataField')
      if (objData.dataRecord.length === 0) {
        if (type === 'init') {
          dispatch(updateDataState({
            isNoData: true
          }))
        }
      } else {
        if (interfaceParams.pageNum * interfaceParams.pageSize >= objData.totalCount) {
          dispatch(updateDataState({
            isNoMoreData: true
          }))
        }
      }
      // 数据渲染
      if (type === 'init') {
        dispatch(updateListData({
          listData: [...objData.dataRecord]
        }))
      } else {
        dispatch(updateListData({
          listData: [...listData, ...objData.dataRecord]
        }))
      }
      // loading加载完成
      if(type === 'init') {
        dispatch(updateLoadingState({
          initLoading: false,
          refreshLoading: false
        }))
      } else {
        dispatch(updateLoadingState({
          loadLoading: false,
        }))
      }
      // 页数加1
      dispatch(updateInterfaceParams({
          pageNum: interfaceParams.pageNum + 1
      }))
    } catch (error) {
      console.log(error)
      dispatch(updateLoadingState({
        loadLoading: false,
        initLoading: false,
        refreshLoading: false
      }))
      dispatch(updateLoadedState({
        news: false
      }))
      dispatch(updateInterfaceState({
        whichLoadedFail: 'news'
      }))
    }
  }
}
export function getOptionalList (type, style) {
  return async (dispatch, getState) => {
    const listData = getState().list.listData
    const interfaceParams = getState().list.interfaceParams
    const TradingCode = getState().nativeData.optionalCode
    const loadedState = getState().fetch[style]
    console.log(343443,style, loadedState)
    if(loadedState) return
    dispatch(updateLoadedState({
      [style]: true
    }))
    try {
      // 入参
      const {
        pageSize,
        pageNum
      } =interfaceParams
      const optionalParams = {
        PageSize: pageSize,
        PageNum: pageNum,
        TradingCode: TradingCode
      }
      let data
      // 接口
      switch (style) {
        case 'qus':
          const {
            data: qusData
          } = await getOptionalQuestions(optionalParams)
          data = qusData
          break;
        case 'event':
          const {
            data: eventData
          } = await getOptionalBigEvent(optionalParams)
          data = eventData
          break;
        case 'notice':
          const {
            data: noticeData
          } = await getOptionalNotices(optionalParams)
          data = noticeData
          break;
        case 'report':
          const {
            data: reportData
          } = await getOptionalReports(optionalParams)
          data = reportData
          break;
        default:
          break;
      }
      dispatch(updateLoadedState({
        [style]: false
      }))
      const activeWhichLoading = getState().list.interfaceState.whichLoading
      if (activeWhichLoading !== style) return
      // 判断是空或没有更多
      const objData = data.content
      handleData(objData, 'dataReord', 'dataField')
      if (objData.dataReord.length === 0) {
        if (type === 'init') {
          dispatch(updateDataState({
            isNoData: true
          }))
        }
      } else {
        if (interfaceParams.pageNum * interfaceParams.pageSize >= objData.totalCount) {
          dispatch(updateDataState({
            isNoMoreData: true
          }))
        }
      }
      // 数据渲染
      if (type === 'init') {
        // 切换时间过快时 ，由于列表的切换早已执行，所以listData早已清空，但接口访问到时，就未清空全局的数据了，所以数据可能与上次保持一致
        dispatch(updateListData({
          listData: []
        }))
        dispatch(updateListData({
          listData: [...objData.dataReord]
        }))
      } else {
        dispatch(updateListData({
          listData: [...listData, ...objData.dataReord]
        }))
      }
      // loading加载完成
      if(type === 'init') {
        dispatch(updateLoadingState({
          initLoading: false,
          refreshLoading: false
        }))
      } else {
        dispatch(updateLoadingState({
          loadLoading: false,
        }))
      }
      // 页数加1
      dispatch(updateInterfaceParams({
          pageNum: interfaceParams.pageNum + 1
      }))
    } catch (error) {
      console.log(error)
      dispatch(updateLoadingState({
        loadLoading: false,
        initLoading: false,
        refreshLoading: false
      }))
      dispatch(updateLoadedState({
        [style]: false
      }))
      dispatch(updateInterfaceState({
        whichLoadedFail: 'qus'
      }))
    }
  }
}
