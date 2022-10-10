import axios from "axios"

import { ElLoading } from "element-plus"

const DEAFULT_LOADING = false

class Request {
  constructor(config) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("所有实例都有的拦截器：请求拦截成功");

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据....",
            background: "rgba(0, 0, 0, 0.5)"
          })
        }

        return config
      },
      (err) => {
        // console.log("所有实例都有的拦截器：请求拦截失败");
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("所有实例都有的拦截器：响应拦截成功");

        // 将loading移除
        this.loading?.close()

        if (res.code !== 200) {
          return {
            statusCode: res.code,
            errorMsg: res.msg
          }
        } else {
          return res
        }
      },
      (err) => {
        // console.log("所有实例都有的拦截器：响应拦截失败");

        // 将loading移除
        this.loading?.close()

        // 例子：判断不同的HttpErrorCode显示不同的错误信息 -> switch
        if (err.response.status === 404) {
          console.log("404的错误~")
        }
        return err
      }
    )
  }
  // 每个请求独有的拦截器（axios本身是没有提供的）
  request(config) {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理（二次请求拦截）
      if (config.interceptors?.requestInterceptor) {
        // 理解：就相当于是用户传的普通函数，然后在这里调用了一遍，不需要给config重新赋值，因为传过去的是引用，外面改了这里也会改
        config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === true || config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request(config)
        .then((res) => {
          // 1.单个请求对数据的处理（二次响应拦截）
          if (config.interceptors?.responseInterceptor) {
            // 这里需要赋值，因为要将外面的响应拦截器的返回值拿过来
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading恢复原始值, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading恢复原始值, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          reject(err)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: "GET" })
  }

  post(config) {
    return this.request({ ...config, method: "POST" })
  }

  delete(config) {
    return this.request({ ...config, method: "DELETE" })
  }

  put(config) {
    return this.request({ ...config, method: "PUT" })
  }

  patch(config) {
    return this.request({ ...config, method: "PATCH" })
  }

  put(config) {
    return this.request({ ...config, method: "PUT" })
  }
}

export default Request
