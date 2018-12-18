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
  // Vue.$vux.loading.show({
  //   text: 'Loading'
  // })
  // if (sessionStorage.getItem('token')) {
  //   config.headers.common['Authorization'] = sessionStorage.getItem('token')
  // }
  // config.data = JSON.stringify(config.data);// TYPE=2
  // if (config.url === '/user/login') {
  // } else {
  //   config.data = Qs.stringify(config.data) TYPE=1
  // }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})
// 请求返回后的拦截
service.interceptors.response.use(
  response => {
    // console.log(response)
    // if (response.status !== 200) {
    //   const index=response.config.url.lastIndexOf('/')
    //   const str=response.config.url.slice(index);
    //   Vue.$vux.toast.show({
    //     text:"接口故障："+str,
    //     type: 'warn'
    //   })
    // } else {
    //   if (response.data.code !== 0) {
    //     Vue.$vux.toast.show({
    //       text:response.data.msg,
    //       type: 'warn'
    //     })
    //   }
    // }
    // Vue.$vux.loading.hide()
    return response
  },
  error => {
    // Vue.$vux.loading.hide()
    return Promise.reject(error)
  }
)
export default service
