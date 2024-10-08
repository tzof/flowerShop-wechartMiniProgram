import {
  axiosWx
} from './api'

export const addOrders = (params) => {
  return axiosWx('POST', '/addOrders', params);
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