// pages/index/components/nav/nav.js
import {
  getCategory,
} from '@/fetch/category'
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
    getCategoryData() {
      getCategory().then(res => {
        console.log(res);
        this.setData({
          list: res.data
        })
      })
    },
    onTapCategory(event) {
      const {
        category_id
      } = event.currentTarget.dataset
      wx.navigateTo({
        url: '/packageGoods/goodsList/goodsList?category_id=' + category_id,
      })
    },
  },
  lifetimes: {
    ready() {
      this.getCategoryData();
    },
  },
})