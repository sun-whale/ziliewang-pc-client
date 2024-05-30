import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import config from '@/axios/config'
const baseURL = config.baseURL.pro;
// create an axios instance
const service = axios.create({
  baseURL, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    config.headers['token'] = getToken();
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    loadingCount--;
    if (loadingInstance && loadingCount == 0) {
      loadingInstance.close();
    }
    const dataAxios = response.data;
    const { code } = dataAxios;
    // 根据 code 进行判断}
    if (code === 0) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 VXAdmin 请求最新版本
      return dataAxios;
    } else {
      if (code == 777) {
        messageOnce.error({
          message: `${dataAxios.msg}`,
          type: 'error',
          duration: 5 * 1000,
        });
        setToken('');
        // 清除缓存的权限菜单
        sessionStorage.removeItem("route");
        //跳转登录页面
        router.push({path:`/login?redirect=${router.currentRoute.fullPath}`})
        return
      }
      messageOnce.error({
        message: `${dataAxios.msg}`,
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject(dataAxios.data);
      //   //  发送的接口为response.config.url，进行报错处理
    }
  },
  error => {
    loadingCount--;
    if (loadingInstance && loadingCount == 0) {
      loadingInstance.close();
    }
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break;
        case 401:
          error.message = '未授权，请登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器内部错误';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网关错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网关超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  },
);

export default service
