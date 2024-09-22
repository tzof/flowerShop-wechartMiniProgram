// 自定义封装axios 请求工具
import {
  uploadFile
} from './api'

export const upload = (params) => {
  return uploadFile('/upload', params);
};