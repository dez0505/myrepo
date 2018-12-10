 
import fetch from '../utils/fetch'

import {
  OPTIONAL_URL
} from '../utils/getUrl'

// 自选
export function getOptionalNews (data = {}) {
  return fetch({
    baseURL: OPTIONAL_URL,
    url: '/OptionalStockNews',
    method: 'post',
    'Content-Type': 'application/json;charset=utf-8', // TYPE=2
    data: data,

  })
}
// 自选
export function getOptionalNotices (data = {}) {
  return fetch({
    baseURL: OPTIONAL_URL,
    url: '/OptionalStockAnn',
    method: 'post',
    data: data,

  })
}

export function getOptionalBigEvent (data = {}) {
  return fetch({
    baseURL: OPTIONAL_URL,
    url: '/OptionalStockBigNews',
    method: 'post',
    data: data,

  })
}
export function getOptionalReports (data = {}) {
  return fetch({
    baseURL: OPTIONAL_URL,
    url: '/OptionalStockResearchReport',
    method: 'post',
    data: data,

  })
}
export function getOptionalQuestions (data = {}) {
  return fetch({
    baseURL: OPTIONAL_URL,
    url: '/OptionalStockSearch',
    method: 'post',
    data: data,

  })
}
