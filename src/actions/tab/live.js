import { getALiveData, getAllLiveData } from '../../api/live'
// redux
import {
  updateInterfaceState,
  updateLoadingState,
  updateDataState,
  updateListData,
  updateInterfaceParams
} from '../list'
import { updatePageConfig } from '../index'
import { parseTime } from '@/utils/common'
 
let params= {
  timeStamp: 0,
  direction: 0,
}

export default  function getLiveList (type, style) {
  return async (dispatch, getState) => {
    const listData = getState().list.listData
    const interfaceParams = getState().list.interfaceParams
    try {
      // 入参
      if(type==='init') {
        params ={...params, ...{
          timeStamp: 0,
          direction: 0
        }}
      }
      const { pageSize } = interfaceParams
      const liveParams = {
        pageSize: pageSize,
        ...params
      }

      let liveList
      if(style === 'A') {
        const {
          data
        } = await getALiveData(liveParams)
        liveList = data
      } else {
        const {
          data
        } = await getAllLiveData(liveParams)
        liveList = data
      }
      const whichLoading = getState().list.interfaceState.whichLoading
      if(whichLoading !== 'live' + style) return
      // 判断是空或没有更多
      if (liveList.Data.length === 0) {
        if (type === 'init') {
          dispatch(updateDataState({
            isNoData: true
          }))
        }
      } else {
        if (liveList.Data.length < liveParams.pageSize) {
          dispatch(updateDataState({
            isNoMoreData: true
          }))
        }
      }
      const todayTime = parseTime(liveList.Todaydate * 1000, '{y}-{m}-{d} 星期{a}')
      dispatch(updatePageConfig({
        liveTabTime: todayTime
      }))
      const mapLiveList = liveList.Data.map((item) => {
        return {
          title: item[0],
          time: parseTime(item[4] * 1000)
        }
      })
      // 更新入参
      params = {...params, ...{
        direction: 1,
        timeStamp: liveList.Data[mapLiveList.length - 1][4]
      }}

      // 数据渲染
      if (type === 'init') {
        dispatch(updateListData({
          listData: mapLiveList
        }))
      } else {
        dispatch(updateListData({
          listData: [...listData, ...mapLiveList]
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
      dispatch(updateInterfaceState({
        whichLoadedFail: 'live' + style
      }))
    }
  }
}
