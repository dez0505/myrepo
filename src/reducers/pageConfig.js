import {
  UPDATE_PAGECONFIG,
} from '../actions/actionType'

const initialState = {
  theme: '',                                            //页面路由入参  页面主题 应该是某些接口的入参
  version: '',                                          //页面路由入参  版本号 应该是某些接口的入参
  htid: '',                                             //页面路由入参  userid 应该是某些接口的入参
  platform: '',                                         //页面路由入参  app类型 应该是某些接口的入参
  account: '',                                          //页面路由入参  未知 应该是某些接口的入参
  titleheight: 0,                                      //页面路由入参  头部高度
  scrollHeight: '',                                     //当前页面scroll的大小
  liveTabTime: '',                                      //直播接口返回的时间
  tabIsFixed: false,                                    //列表与顶部的距离  用来判断tab菜单是否置顶
  updateMarket: false,                                  //控制是否更新行情
  activeTabConfig: {
    index: -1,
    type: ''
  },                                                    //控制是否切换了当前tab
  callBackHome: false                                   //控制是否切换了并重新回到当前页面  与changeTheem绑定
}
export default function pageConfig(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAGECONFIG:
      console.log(action.pageConfig)
      return  { ...state, ...action.pageConfig } // ===> Object.assign({theme: ''},{theme: 'whitle'}) 
    default:
      return state
  }
}
