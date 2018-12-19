import store from 'store'
/*
 * @param {string} name 存储localStorage的名字
 * @param {any}  content  存储localStorage的内容
 */
export const setStore = (name, content) => {
  if (!name) return
  return store.set(name, content)
}

/*
 * @param {string}  name  获取localStorage 数组格式自己会JSON.parse()
 */
export const getStore = name => {
  if (!name) return
  return store.get(name)
}

/*
 * 获取路由带的参数
 * @param {object}  item  item是记录详情
 * @param {string}  type  type: 是跳转类型，默认为info
 */
export function goToAPP (item, type = 'info') {
  // 1、将可能与需要的字段相关列举出来
  // 2、将app需要的字段列举出来
  // 3、函数接收type属性
  // 4、循环判断相关的属性在不在这个item中
  // 5、如果在将其与需要的进行比较（通过字段名是否一或统一转化为小写是否一致）
  // 6、如果一致将其加入到整个链接中&${params}=${item[data]}
  const dataArr = ['LinkTitle', 'Title', 'TypeCode', 'typeCode', 'AdsTypeCode', 'LinkUrl', 'url', 'Id', 'id', 'FunctionTypeId', 'funId', 'CreatedDate', 'Summary', 'FrontCover']
  const needParamsArr = ['adstypecode', 'typecode', 'title', 'url', 'id', 'FunctionTypeId', 'CreateDate', 'FunctionParams']
  let href = `@redirect=${type}`
  for (let data of dataArr) {
    if (item[data] !== undefined) {
      for (let params of needParamsArr) {
        let newdata = data
        if (data.indexOf('Link') >= 0 || data.indexOf('link') >= 0) {
          newdata = data.slice(4)
        }
        console.log('newdata', newdata)
        if (newdata === params) {
          console.log(params)
          if (params === 'url' || params === 'title') {
            href += `&${params}=${encodeURIComponent(item[data])}`
          } else {
            href += `&${params}=${item[data]}`
          }
          break
        } else if (newdata.toLowerCase() === params) {
          if (params === 'url' || params === 'title') {
            href += `&${params}=${encodeURIComponent(item[data])}`
          } else {
            href += `&${params}=${item[data]}`
          }
          break
        }
      }
    }
  }
  console.log('goToApp', href)
  window.location.href = href
}

/*
 * 获取路由带的参数
 * @param {string}  funid  需要的值称对应的参数
 * @return {string}   需要的参数名称对应的值
 */
export function getQueryString (name) {
  // if (!!this.requestParam && this.requestParam[name] !== undefined) { return this.requestParam[name] }
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r !== null) return unescape(r[2])
  return ''
}

/*
 * 获取埋点的一些参数
 * @param {string}  funid  埋点的唯一标识
 * @return {string}   埋点的clickKey与clickType
 */
export function getManDianParams (funid) {
  const staticJsonData = require('./statisticHelper').default
  const clickObj = staticJsonData[funid]
  if (!clickObj) return ''
  return (
    '&clickKey=' + clickObj.clickKey + '&clickType=' + clickObj.clickType
  )
}

/*
 * 获取埋点的一些参数
 * @param {string}  img  图片路径
 * @return {string}   图片base64码
 */
export function getBase64 (img) { // 传入图片路径，返回base64
  function getBase64Image (img, width, height) { // width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
    var canvas = document.createElement('canvas')
    canvas.width = width || img.width
    canvas.height = height || img.height
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    var dataURL = canvas.toDataURL()
    return dataURL
  }
  return new Promise(function (resolve, reject) {
    var image = new Image()
    image.crossOrigin = 'Anonymous'
    image.src = img
    if (img) {
      image.onload = function () {
        resolve(getBase64Image(image)) // 将base64传给done上传处理
      }
      image.onerror = (e) => {
        reject(e)
      }
    }
  })
}

/*
 * 获取埋点的一些参数
 * @param {number}  time  传入时间戮
 * @return {string}  cFormat 时间的样式默认是'{y}-{m}-{d} {h}:{i}:{s}' '{y}-{m}-{d} {h}:{i}:{s} 星期{a}'
 */
export function parseTime (time, cFormat = '{y}-{m}-{d} {h}:{i}:{s}') {
  // 1、如果返回的是秒*1000 并且要转成时间格式  new Date(parseInt(time))
  // 2、如果传入的直接是时间格式new Data() 就不需要转
  // 3、
  if (arguments.length === 0) {
    return null
  }
  if (String(time).length === 10) {
    time = +time * 1000
  }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timestr = cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timestr
}
/*
 * 跳转方法 埋点
 * @param {number}  time  传入时间戮
 * @return {string}  cFormat 时间的样式默认是'{y}-{m}-{d} {h}:{i}:{s}' '{y}-{m}-{d} {h}:{i}:{s} 星期{a}'
 */
export function goToFunction (data, functionParam) {
  let functionParamStr = ''
  if (functionParam) {
    functionParamStr = '&' + functionParam
  }
  const clickParam = getManDianParams(data)
  let funid = data !== undefined ? (data + '').split('@')[0] : ''
  if (
    getQueryString('platform')
      .toLowerCase()
      .indexOf('iphone') >= 0
  ) {
    const href = 'ehtsec@funid=' + funid + clickParam + functionParamStr
    console.log('iphone', href)
    window.location.href = href
  } else {
    const href = 'ehtsec://funid=' + funid + clickParam + functionParamStr
    console.log('android', href)
    window.location.href = href
  }
}
/*
 * 发送ios请求的通知
 * @param {string}  types  通知执行你定义的函数
 * @param {object}  params  通知需要带的入参
 */
export const sendIOSMessage = (types, params) => {
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.JSToNativeBridge) {
    window.webkit.messageHandlers.JSToNativeBridge.postMessage({
      type: types,
      params: params
    })
  }
}

/*
 * 加密请求
 * @param {string}  types  通知执行你定义的函数
 * @param {object}  params  通知需要带的入参
 */
export function encryptByDES (message, key) {
  var keyHex = window.CryptoJS.enc.Utf8.parse(key)
  var encrypted = window.CryptoJS.DES.encrypt(message, keyHex, {
    mode: window.CryptoJS.mode.ECB,
    padding: window.CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
/*
 * 处理字段与值分开的接口数据
 * @param {object}  d  处理的对象
 * @param {string}  dataParams  对象中的data数据
 * @param {string}  fieldParams  对象中的data对应的字段
 */
export function handleData (d, dataParams, fieldParams) {
  var data = dataParams || 'data'
  var field = fieldParams || 'field'
  if (!!d && !!d[data] && !!d[field]) {
    d[data].forEach(function (item, i) {
      var obj = {}
      for (var key in d[field]) {
        obj[d[field][key]] = item[key]
      }
      d[data][i] = obj
    })
  }
  return d
}
/*
 * 对对象进行深层遍历
 * @param {source}  对象变量  对象入参
 */
export function deepClone(source){
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for(let keys in source){ // 遍历目标
    if(source.hasOwnProperty(keys)){
      if(source[keys] && typeof source[keys] === 'object'){ // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      }else{ // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}