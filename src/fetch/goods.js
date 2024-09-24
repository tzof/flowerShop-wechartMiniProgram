import {
  axiosWx
} from './api'

export const getGoods = (params) => {
  return axiosWx('GET', '/goods', params);
};