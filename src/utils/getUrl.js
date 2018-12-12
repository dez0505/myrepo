const HOME_URL = window.production ? 'https://ops.htsec.com:18443/api' : 'http://124.74.236.88:19288/api' // 首页
const BASE_URL = window.production ? 'https://stocknews.htsec.com:9084/api' : 'http://183.63.228.117:3537/api' // 日历 直播 自选
const MARKET_MACHINE_URL = window.production ? 'https://smartstock.htsec.com:8082' : 'https://smartstock.htsec.com:8082'// 市场机会https://smartstock.htsec.com:8082
const TOPLINE_URL = window.production ? 'http://newsrec.htsec.com:9185/Reader' : 'http://183.63.228.117:9186/Reader' // 头条
const OPTIONAL_URL = window.production ? 'https://stockinfo.htsec.com:19089/api' : 'http://183.63.228.117:13537/api'// 自选的五个请求接口
export {
  HOME_URL,
  BASE_URL,
  MARKET_MACHINE_URL,
  OPTIONAL_URL,
  TOPLINE_URL
}
