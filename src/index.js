import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// redux
import { createStore } from 'redux'
import { Provider } from "react-redux";
import rootReducer from './reducers'
import HomeCase from './containers/HomeCase'
import 'antd-mobile/dist/antd-mobile.css'; 
import 'lib-flexible';


let store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <HomeCase />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
