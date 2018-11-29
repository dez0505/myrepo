import fetch from '../utils/fetch'

import {
  BASE_URL as RINI_URL,
  MARKET_MACHINE_URL
} from '../utils/getUrl'

// RINI_URL
// 日历
export function getDateData (data = {}) {
  return fetch({
    baseURL: RINI_URL,
    url: '/MarketPerformanceCount',
    method: 'get',
    params: data,

  })
}

// MARKET_MACHINE_URL
// 加密，选股前的操作
export function getMd5Data (data = {}) {
  return fetch({
    baseURL: MARKET_MACHINE_URL,
    url: '/common/serverstatus',
    method: 'get',
    params: data,

  })
}
// 选股
export function getSelectStockData (data = {}) {
  return fetch({
    baseURL: MARKET_MACHINE_URL,
    url: '/SmartStock/getStockSelect',
    method: 'get',
    params: data,

  })
}
// 涨停
export function getHardenData (data = {}) {
  return fetch({
    baseURL: MARKET_MACHINE_URL,
    url: '/Analysis/harden',
    method: 'get',
    params: data,

  })
}
