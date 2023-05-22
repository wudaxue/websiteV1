import axios, { AxiosRequestConfig, CustomSuccessData, AxiosResponse } from 'axios'
import { IResponseData } from '@/types/axios'
import { ElMessage, ElLoading } from 'element-plus'

const isPro = import.meta.env.PROD
const service = axios.create({
  baseURL: isPro ? `${location.protocol}//${location.host}` : '/api',
  timeout: 30000,
})

interface ILoading {
  [key: string]: ReturnType<typeof ElLoading.service>
}

const loading: ILoading = {}

function startLoading(el: string, text = '') {
  if (!el || loading[el]) return
  loading[el] = ElLoading.service({
    lock: true,
    target: el,
    text,
  })
}

function endLoading(el: string | undefined) {
  if (el && loading[el]) {
    loading[el].close()
    delete loading[el]
  }
}

// request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.el) {
      startLoading(config.el, config.text)
    }
    const is_get = config.method === 'get'
    if (is_get) {
      config.headers = {
        'Content-Type': 'application/json',
      }
      config.data = null
    }
    return config
  },
  (error) => {
    startLoading(error.request.config.el)
    return Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(responseHandler, (error) => {
  console.log(error, 'error')
  if (error.response) {
    endLoading(error.response.config.el)
    if (!error.response.config.silence) {
      ElMessage.error(error.message)
    }
  }
  return Promise.reject(error)
})

function responseHandler(response: AxiosResponse): CustomSuccessData<IResponseData<any>> | void | Promise<never> {
  const res = response.data.data ? response.data.data : response.data // TODO: recover
  const config = response.config
  if (config.el) {
    endLoading(config.el)
  }
  const resFinal = res.rsp || res || {}
  const code = resFinal.errorCode || resFinal.code
  const msg = resFinal.msg || resFinal.errorMsg || resFinal.error || '接口错误'
  if (code) {
    if (!isPro) {
      console.log('报错URL: ', config.url)
    }
    !config.silence && ElMessage.error(msg)
    return Promise.reject(new Error(msg))
  }
  return res
}

export default service
