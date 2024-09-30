import {
  axiosWx
} from './api'

export const getGoods = (params) => {
  return axiosWx('GET', '/goods', params);
};

export const getGoodsDetail = (params) => {
  return axiosWx('GET', '/goodsDetail', params);
};