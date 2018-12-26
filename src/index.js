import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// redux init
import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from "react-redux";
import rootReducer from './reducers'
// component
import { getQueryString } from './utils/common'
import Home from './containers/Home'
// import TabContentCase from './containers/TabContentCase'
// css
import 'antd-mobile/dist/antd-mobile.css'; 
import 'lib-flexible';
import 'swiper/dist/css/swiper.min.css'
import './styles/common.scss'

// action
import { updatePageConfig } from './actions/index'
import { updateNativeData } from './actions/nativeData'

let store = createStore(rootReducer, applyMiddleware(thunk))

// 行情
const market1 = { dataRecord:[
  ['SZ002167','fsdf','5','+0.292'],
  ['SH601801','fsdf','5','+0.398'],
  ['HK00001','fsdf','5','-0.420'],
  ['HK00001','fsdf','5','-0.420'],
  ['HK00001','fsdf','5','-0.420'],
  ['HK00001','fsdf','5','-0.420'],
  ['HK00001','fsdf','5','-0.420'],
  ['HK00001','fsdf','5','-0.420'],
  ['HK00001','fsdf','5','-0.420'],
  ['HK00001','fsdf','5','-0.420'],
  ['HK00001','fsdf','5','-0.420'],
  ['HK00001','fsdf','5','-0.420'],
],
dataField:['stockName','stockId','stockPrice','stockNum']
}
window.updateLinster = function (market = market1) {
  store.dispatch(updateNativeData({market:market.dataRecord}))
  store.dispatch(updatePageConfig({updateMarket:!store.getState().pageConfig.updateMarket}))
}
// 主题
window.changeTheme = function (theme) {
  store.dispatch(updatePageConfig({callBackHome:!store.getState().pageConfig.callBackHome}))
  store.dispatch(updatePageConfig({theme}))
}
// 改变url路由
window.changeUrlParam = function (key, value) {
  store.dispatch(updatePageConfig({[key]: value}))
}
// 个人股与对应的分组名
window.getOptional = function (optionalCode, optionalTeam) {
  // alert(optionalCode+optionalTeam)
  store.dispatch(updateNativeData({optionalTeam}))
  store.dispatch(updateNativeData({optionalCode}))
}
// 涨跌异动
window.updateShortTermElves = function (optionalChange) {
  if (typeof data === 'string') {
    optionalChange = JSON.parse(optionalChange)
  }
  store.dispatch(updateNativeData({optionalChange}))
}
// 刷新tab资讯
window.refreshInfo = function () {
  store.dispatch(updatePageConfig({updateRefreshLoading:!store.getState().pageConfig.updateRefreshLoading}))
}
const themeColor = getQueryString('theme') === 'night' ? '#202528' : '#FFF'
document.body.style.backgroundColor = themeColor;
window._connectApp_ = ReactDOM.render(
  <Provider store={store}>
      <Home/>
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
