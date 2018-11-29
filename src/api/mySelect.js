import fetch from '../utils/fetch'

import {
  BASE_URL as MYSELECT_URL
} from '../utils/getUrl'

// 自选
export function getMySelectData (data = {}) {
  return fetch({
    baseURL: MYSELECT_URL,
    url: '/SelfStockNews',
    method: 'post',
    data: data,

  })
}
