import {
  axiosWx
} from './api'

export const getDefaultAddress = (params) => {
  return axiosWx('GET', '/getDefaultAddress', params);
};

export const getAddress = (params) => {
  return axiosWx('GET', '/getAddress', params);
};

export const addAddress = (params) => {
  return axiosWx('POST', '/addAddress', params);
};

export const setAddress = (params) => {
  return axiosWx('POST', '/getAddress', params);
};