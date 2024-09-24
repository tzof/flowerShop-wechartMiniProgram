// pages/index/components/recommend/recommend.js
import {
  getGoods,
} from '@/fetch/goods'
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    isReachBottom: { // 全写
      type: Boolean, // 类型
      value: false, // 默认值
      observer: function (newVal, oldVal) {
        // 可选：当属性值变化时触发的观察者函数
        // console.log('isChecked changed from', oldVal, 'to', newVal);
        this.pageGoodsData()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageNum: 1,
    pageSize: 9,
    list: [],
  },
  observers: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    getGoodsData() {
      return getGoods().then(res => {
        console.log(res);
        this.setData({
          list: res.data
        })
      })
    },
    pageGoodsData() {
      this.setData({
        pageNum: this.data.pageNum + 1,
      })
      const pageNum = this.data.pageNum;
      const pageSize = this.data.pageSize;
      return getGoods({
        pageNum,
        pageSize
      }).then(res => {
        this.setData({
          list: [...this.data.list, ...res.data]
        })
        // this.triggerEvent("isPage", false)
      })
    },
  },
  lifetimes: {
    ready() {
      this.getGoodsData();
    },
  },
})