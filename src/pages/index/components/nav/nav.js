// pages/index/components/nav/nav.js
import {
  getNav,
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
    getNavData() {
      return getNav().then(res => {
        console.log(res);
        this.setData({
          list: res.data
        })
      })
    },
  },
  lifetimes: {
    ready() {
      this.getNavData();
    },
  },
})