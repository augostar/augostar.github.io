import axios from 'axios';
import { notification } from 'ant-design-vue';
import storage from '/@/utils/storage';
import { useRouter } from 'vue-router';
import { AdminStore } from '/@/store/user';



/*
 * {
 *   baseURL: '',
 *   timeout: 1000,
 *   headers: {'X-Custom-Header': 'foobar'}
 * }
 */

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: ''
});

// eslint-disable-next-line no-unused-vars
const store = storage.getSessionStorage('info');

// Alter defaults after instance has been created


// 覆写库的超时默认值 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 10000;



// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  const adminStore = AdminStore();
  // 在发送请求之前做些什么
  config.headers.Authorization = adminStore.token;
  // withCredentials: false, // default
  config.withCredentials = true;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  
  if(response.status!==200){
    notification.error({ message: '服务器异常', description: '请联系管理员' });
    // if(response){   }
    
    return; 
  }
  if(response.data.code === 5012){
    storage.removeSessionStorage('info');
    const adminStore = AdminStore();
    adminStore.$reset();
    let router = useRouter();
    router.push({
      path:'/login'
    });
  }
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  notification.error({ message: '网络异常', description: '请检查网络 或联系管理员' });

  return Promise.reject(error);
});


// instance.get

export default  instance;