// 自定义封装axios 请求工具
import {
  axiosWx,
  axiosWxJson
} from './api'

export const getShoppingCartTotal = (params) => {
  return axiosWx('GET', '/getShoppingCartTotal', params);
};

export const getShoppingCart = (params) => {
  return axiosWx('GET', '/getShoppingCart', params);
};

export const setShoppingCart = (params) => {
  return axiosWx('POST', '/setShoppingCart', params);
};

export const deleteShoppingCart = (params) => {
  return axiosWx('POST', '/deleteShoppingCart', params);
};

export const setShoppingCartSelect = (params) => {
  return axiosWx('POST', '/setShoppingCartSelect', params);
};

export const setShoppingCartAllSelect = (params) => {
  return axiosWx('POST', '/setShoppingCartAllSelect', params);
};

export const setMinusShoppingCartCount = (params) => {
  return axiosWxJson('POST', '/setMinusShoppingCartCount', params);
};