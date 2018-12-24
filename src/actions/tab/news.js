import { getOptionalNews } from '../../api/optional'
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
const params = {
    typeCode: 2,
    subtypeCode: 51
  }
export default function getNewsList (type) {
  return async (dispatch, getState) => {
    const listData = getState().list.listData
    const interfaceParams = getState().list.interfaceParams
    try {
      if(type === 'init') {
        const newsLoadedState = getState().fetch.news
        if(newsLoadedState) return
        dispatch(updateLoadedState({
          news: true
        }))
      }
      // 入参
      const {
        pageSize,
        pageNum
      } =interfaceParams
      const cheifParams = {
        pageNum: pageNum,
        pageSize: pageSize,
        ...params
      }
      // 接口
      const {
        data
      } = await getOptionalNews(cheifParams)
      if(type === 'init') {
        dispatch(updateLoadedState({
          news: false
        }))
      }
      // 判断是空或没有更多
      const whichLoading = getState().list.interfaceState.whichLoading
      if (whichLoading !== 'cheif') return
      if (data.JsonList.length === 0) {
        if (type === 'init') {
          dispatch(updateDataState({
            isNoData: true
          }))
        }
      } else {
        if (interfaceParams.pageNum * interfaceParams.pageSize >= data.TotalCount) {
          dispatch(updateDataState({
            isNoMoreData: true
          }))
        }
      }
      // 数据渲染
      if (type === 'init') {
        dispatch(updateListData({
          listData: [...data.JsonList]
        }))
      } else {
        dispatch(updateListData({
          listData: [...listData, ...data.JsonList]
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
