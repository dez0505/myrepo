import fetch from '../utils/fetch'

import {
  TOPLINE_URL
} from '../utils/getUrl'

// 头条
export function getTopLineData (data = {}) {
  return fetch({
    baseURL: TOPLINE_URL,
    url: '/Articles',
    method: 'get',
    params: data,

  })
}
// 置顶
export function getZhiDinData (data = {}) {
  return fetch({
    baseURL: TOPLINE_URL,
    url: '/TopArticles',
    method: 'get',
    params: data,

  })
}
