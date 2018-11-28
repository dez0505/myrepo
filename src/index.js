import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// redux
import { createStore } from 'redux'
import { Provider } from "react-redux";
import rootReducer from './reducers'
import HomeCase from './containers/HomeCase'

import * as serviceWorker from './serviceWorker';

import store from "./store";

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
