// pages/index/components/activity/activity.js
import {
  getActivity,
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
    getActivityData() {
      return getActivity().then(res => {
        console.log(res);
        this.setData({
          list: res.data
        })
      })
    },
    onTapActivity() {
      wx.navigateTo({
        url: '/packageGoods/goodsList/goodsList'
      })
    },
  },
  lifetimes: {
    ready() {
      this.getActivityData();
    },
  },
})