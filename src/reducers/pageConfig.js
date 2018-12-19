import {
  UPDATE_PAGECONFIG,
} from '../actions/actionType'

const initialState = {
  theme: '',                                                        //页面路由入参  页面主题 应该是某些接口的入参
  version: '',                                                      //页面路由入参  版本号 应该是某些接口的入参
  htid: '',                                                         //页面路由入参  userid 应该是某些接口的入参
  platform: '',                                                     //页面路由入参  app类型 应该是某些接口的入参
  account: '',                                                      //页面路由入参  未知 应该是某些接口的入参
  titleheight: '',                                                  //页面路由入参  头部高度
  scrollHeight: '',                                                 //当前页面scroll的大小
  liveTabTime: '',                                                  //直播接口返回的时间
  TradingCode: 'SH601801,SZ002167,SZ000001,HK00001,HH00637,HZ00330',//app传来的tradeCode
  optionalTeamName: '',                                             //app传来的当前分组名
  tabIsFixed:false,                                                 //列表与顶部的距离  用来判断tab菜单是否置顶
  updateMarket: false,                                              //控制是否更新行情
}
export default function pageConfig(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAGECONFIG:
      return  { ...state, ...action.pageConfig } // ===> Object.assign({theme: ''},{theme: 'whitle'}) 
    default:
      return state
  }
}
