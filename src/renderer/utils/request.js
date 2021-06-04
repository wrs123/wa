import axios from 'axios'
import {Message} from 'iview';
import qs from 'qs';


let BASE_URL_CUI = "http://10.31.16.117:19999/api/v1";
let BASE_URL_XING = "http://10.31.16.198:19999/api/v1";

// 创建axios实例
const request = axios.create({
  validateStatus(status) {
    return status >= 200 && status < 504 // 设置默认的合法的状态
  },
  baseURL: BASE_URL_XING, // api 的 base_url
  timeout: 10000 // 请求超时时间
})

request.defaults.retry = 1 // 请求重试次数
request.defaults.retryDelay = 1000 // 请求重试时间间隔
request.defaults.shouldRetry = false // 是否重试

// request拦截器
request.interceptors.request.use(
  config => {
    config.headers['Accept-Language'] = 'zh-CN'
    if (config.method === 'post') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      if (!config.data) { // 没有参数时，config.data为null，需要转下类型
        config.data = {}
      }// qs序列化参数
      config.data = qs.stringify(config.data)
    }
    else if(config.method === 'get'){
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
request.interceptors.response.use(
  response => {
    if (response.data.message === '依赖服务访问异常') {
      response.data.message = '网络访问异常，请重试～'
    }
    if (response.status === 200) {
      let data = response.data
      return Promise.resolve(data)
    }else{
      Message.error('状态:'+response.data.code+';信息:'+response.data.message);
    }
  },
  err => {
    let config = err
    Message.error(config);
  }
)

export default request
