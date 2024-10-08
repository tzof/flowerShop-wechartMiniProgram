import {
  axiosWx
} from './api'

export const addOrders = (params) => {
  return axiosWx('POST', '/addOrders', params);
};

export const getOrders = (params) => {
  return axiosWx('POST', '/getOrders', params);
};

export const getOrdersDetail = (params) => {
  return axiosWx('GET', '/getOrdersDetail', params);
};