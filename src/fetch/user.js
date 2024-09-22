// 自定义封装axios 请求工具
import {
  axiosWx
} from './api'

export const getUserinfo = (params) => {
  return axiosWx('POST', '/getUserinfo', params);
};

export const setUserinfo = (params) => {
  return axiosWx('POST', '/setUserinfo', params);
};