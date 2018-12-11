import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// redux init
import { createStore } from 'redux'
import { Provider } from "react-redux";
import rootReducer from './reducers'
// component

import HomeCase from './containers/HomeCase'
import TabContentCase from './containers/TabContentCase'
// css
import 'antd-mobile/dist/antd-mobile.css'; 
import 'lib-flexible';
import 'swiper/dist/css/swiper.min.css'

// action
import { updatePageConfig } from './actions/index'
import { updateNativeData } from './actions/nativeData'
import { refreshListData } from './actions/fetch'




let store = createStore(rootReducer)
console.log(store)
window._connectApp_ = ReactDOM.render(
  <Provider store={store}>
    <div>
      <HomeCase />
      <TabContentCase></TabContentCase>
    </div>
  </Provider>,
  document.getElementById('root')
);
// 行情
window.updateLinster = function (market) {
  store.dispatch(updateNativeData({market}))
}
// 主题
window.changeTheme = function (theme) {
  store.dispatch(updatePageConfig({theme}))
}
// 个人股与对应的分组名
window.getOptional = function (optionalCode, optionalTeam) {
  store.dispatch(updateNativeData({optionalCode}))
  store.dispatch(updateNativeData({optionalTeam}))
}
// 涨跌异动
window.updateShortTermElves = function (optionaChange) {
  store.dispatch(updateNativeData({optionaChange}))
}
// 刷新tab资讯
window.refreshInfo = function () {
  store.dispatch(refreshListData())
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
