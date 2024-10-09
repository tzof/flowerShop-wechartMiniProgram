import {
  axiosWx,
  axiosWxJson
} from './api'

export const addOrders = (params) => {
  return axiosWxJson('POST', '/addOrders', params);
};

export const getOrders = (params) => {
  return axiosWx('GET', '/getOrders', params);
};

export const getOrdersDetail = (params) => {
  return axiosWx('GET', '/getOrdersDetail', params);
};

export const getOrdersTotal = (params) => {
  return axiosWx('GET', '/getOrdersTotal', params);
};