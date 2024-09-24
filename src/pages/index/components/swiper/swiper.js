// pages/index/components/swiper.js
import {
  getCarousel,
} from '@/fetch/home'
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getCarouselData() {
      return getCarousel().then(res => {
        console.log(res);
      })
    },
  },
  lifetimes: {
    ready() {
      console.log('我是轮播组件的ready');
      this.getCarouselData();
    },
  },
})