import axios from 'axios';
import router from '../router/index';
import { Loading,Message } from 'element-ui';
import store from '@/store';

const api = axios.create({
  baseURL: window.$globalConfig.API_BASE_Tabel,
  timeout: 10000,
  withCredentials: true,
});


let clearTime =null,clearMessage = null ;


axios.defaults.transformRequest = [function (data) {
  let newData = ''
  for (let k in data) {
    newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  }
  return newData
}]

// 请求发送拦截，目前需要结合各项目自身来处理...
let loadingInstance;
api.interceptors.request.use(
  config => {
    // if(config.requestBaseUrl === 'ERP'){
    //   config.baseURL = window.$globalConfig.LOGIN_URL
    // }

    if (config.headers) {
			// ...{ 'Authorization': 'Bearer ' + store.state.home.token }
      config.headers = {...config.headers} // 所有请求添加token验证
    } else {
      // config.headers = { 'Authorization': 'Bearer ' + store.state.home.token } // 所有请求添加token验证
    }
    if(config.params){ // 请求接口携带token
      config.params['_r'] = new Date().getTime()
    } else {
      config.params = {'_r': new Date().getTime()}
    }
	  return config
  },
  req => Promise.reject(req),
);

// 请求返回拦截，目前需要结合各项目自身来处理...
api.interceptors.response.use(
  res => {
    // console.log(res)
    if (loadingInstance) loadingInstance.close();
    return Promise.resolve(res.data);
  },
  err => {
   // router.push('/login');
   if (loadingInstance) loadingInstance.close();
   return Promise.reject(err)
  },
);

export default api;
