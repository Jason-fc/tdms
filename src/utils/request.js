import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Message } from "element-ui";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers.Authorization = `xytoken_${getToken('Token')}`
    }
    return config
  },
  error => {
    // do something with request error
    Message({
      message: "请求失败",
      type: "error"
    });
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  response => {
    // token 快过期时 response header值为xy-refresh-token={ token },替换本地token
    const res = response.data
    if (response.status !== 200) {
      if (response.status === 201 || response.status === 202) {
        return res
      } else {
        return Promise.reject(res)
      }
    }
    if(res.code!=='200'){
      if (res.code == '401') {
        // store.dispatch('user/logout').then(() => {
        //   location.reload();
        // })
        return Promise.reject(res)
      }else if(res.code == '403'){
        Message({
          message:'权限不足，请联系管理员',
          type: "error"
        });
        return Promise.reject(res)
      }else{
        Message({
          message:res.msg,
          type: "error"
        });
        return Promise.reject(res)
      }
    }else{
      return res
    }
  }, (error) => {
    if (error.message.includes('timeout')) {
      Message({
        message: "请求超时，请重新操作",
        type: "error"
      });
      return Promise.reject(error)
    }
    if (error.response) {
      let status = error.response.status;
      if (status === 401) {
        // store.dispatch('user/logout').then(() => {
        //   location.reload();
        // })
      } else if (String(status).charAt(0) === "4" && status !== 401) {
        Message.error("服务器请求失败，请稍后重试");
      } else if (String(status).charAt(0) === "5") {
        Message.error("服务器内部错误，请稍后重试");
      }
    } else {
      Message({
        message: "请求失败，请重新操作",
        type: "error"
      });
      return Promise.reject(error)
    }
  }
 
)


export default service
