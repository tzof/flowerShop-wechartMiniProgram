import axios from 'axios'
// 特定于微信小程序的适配器
import mpAdapter from 'axios-miniprogram-adapter'
// 使用适配器
axios.defaults.adapter = mpAdapter
// 创建一个axios实例
const instance = axios.create({
  baseURL: 'https://tzof.net:217',
  timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // Bearer令牌是一种常用的认证机制，特别是在 OAuth 2.0 授权框架中。尽管 JWT 本身是一种独立的令牌格式，但在实际应用中，通常会在 HTTP 请求头中使用 Bearer 方式来携带 JWT。
  // Bearer JWT Bearer表示后面的令牌是一种“持有者令牌”（bearer token）。这意味着任何持有该令牌的人都被视为合法的请求者。
  const token = 'Bearer ' + wx.getStorageSync('token') || '';
  config.headers.Authorization = token;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export function axiosWx(method, url, params) {
  // instance.request发送请求，不加request也可以，也可以直接用axios对象发送
  // params通常是GET、DELETE请求的时候用的 会变成字符串拼接到路由上 /users?page=1&limit=10
  // data通常是POST、PUT、PATCH请求的时候用的 会变成键值对模式 {"username":"tzof","age":"18"}
  // headers请求头信息如Content-Type、Authorization等。
  let axiosParams = {
    method,
    url,
  }
  if (method === 'GET' || method === 'DELETE') {
    axiosParams.params = params;
  } else {
    axiosParams.data = params;
    axiosParams.headers = {
      'Content-Type': 'application/json'
    }
  }
  // 返回一个promise对象 引用的地方可以使用.then或者await获取res数据
  return new Promise((resolve, reject) => {
    instance(axiosParams).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })

}

export function uploadFile(url, params) {
  const filePath = params.file;
  delete params.file
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      filePath,
      name: 'file',
      url: instance.defaults.baseURL + url,
      formData: params,
      header: {
        'authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success: (res) => {
        resolve(JSON.parse(res.data))
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}