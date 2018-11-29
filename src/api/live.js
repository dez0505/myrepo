import fetch from '../utils/fetch'

import {
  BASE_URL as LIVE_URL
} from '../utils/getUrl'
// LIVE_URL
// A股直播
export function getALiveData (data = {}) {
  return fetch({
    baseURL: LIVE_URL,
    url: '/AStocksInfo',
    method: 'get',
    params: data,

  })
}
// 全球直播
export function getAllLiveData (data = {}) {
  return fetch({
    baseURL: LIVE_URL,
    url: '/GlobalLiveNews',
    method: 'get',
    params: data,

  })
}
