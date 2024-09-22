// 自定义封装axios 请求工具
import {
  axiosWx
} from './api'

export const login = (params) => {
  return axiosWx('POST', '/login', params);
};