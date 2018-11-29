import fetch from '../utils/fetch'

import {
  HOME_URL
} from '../utils/getUrl'

export function getIconData (data = {}) {
  return fetch({
    baseURL: HOME_URL,
    url: '/iconPictures',
    method: 'get',
    params: data,
  })
}

export function getHomeData (data = {}) {
  return fetch({
    baseURL: HOME_URL,
    url: '/frontPage',
    method: 'get',
    params: data,
  })
}
