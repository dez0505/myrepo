// import Vue from 'vue';
import axios from 'axios'
const service = axios.create({
  timeout: 10000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    'Content-Type': 'application/json;charset=utf-8'// TYPE=2
    // 'Content-Type': 'application/x-www-form-urlencoded' TYPE=1
  }
})
// 请求前的拦截
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})
// 请求返回后的拦截
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default service
