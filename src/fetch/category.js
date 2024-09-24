import {
  axiosWx
} from './api'

export const getCategory = (params) => {
  return axiosWx('GET', '/category', params);
};