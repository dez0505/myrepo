import { getCheifData } from '../../api/cheif'
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
export default function getCheifList (type) {
  return async (dispatch, getState) => {
    const listData = getState().list.listData
    const interfaceParams = getState().list.interfaceParams
    const cheifLoadedState = getState().fetch.cheif
    if(cheifLoadedState) return
    dispatch(updateLoadedState({
      cheif: true
    }))
    try {
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
      } = await getCheifData(cheifParams)
      dispatch(updateLoadedState({
        cheif: false
      }))
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
      dispatch(updateLoadingState({
        loadLoading: false,
        initLoading: false,
        refreshLoading: false
      }))
      dispatch(updateLoadedState({
        cheif: false
      }))
      dispatch(updateInterfaceState({
        whichLoadedFail: 'cheif'
      }))
    }
  }
}
