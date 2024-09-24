import {
  axiosWx
} from './api'

export const getCarousel = (params) => {
  return axiosWx('GET', '/home/carousel', params);
};

export const getNav = (params) => {
  return axiosWx('GET', '/home/nav', params);
};

export const getActivity = (params) => {
  return axiosWx('GET', '/home/activity', params);
};
