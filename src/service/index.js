import Request from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"
import localCache from "@/utils/cache"
import router from "@/router"

// 全局配置
const myRequest = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache("token") ?? ""
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`
        config.headers.token = `${token}`
      }
      // console.log("请求成功的拦截");
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log("请求失败的拦截");
      return err
    },
    responseInterceptor: (res) => {
      // console.log("响应成功的拦截");
      // 直接拿到数据
      if (res.data.code != 200) {
        console.log(res.data.msg)
      }
      // token非法处理
      if (res.data.msg === "token非法,请重新登录") {
        localCache.removeCache("token")
        router.push({ path: "/login" })
      }
      return res.data
    },
    responseInterceptorCatch: (err) => {
      // console.log("响应成功的拦截");
      return err
    }
  }
})

export default myRequest
