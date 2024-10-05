// packageOrders/ordersInfo/components/address/address.js
import {
  getDefaultAddress
} from '@/fetch/address'
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
    address: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDefaultAddressData() {
      getDefaultAddress().then(res => {
        this.setData({
          address: res.data
        })
        console.log(this.data.address);
      })
    },
    onTapChangeAddress(){
      wx.navigateTo({
        url: '/pages/',
      })
    }
  },
  lifetimes: {
    created() {},
    attached() {
      this.getDefaultAddressData()
    },
    ready() {
      // console.log(this.data.goodsId);
    },
    detached() {},
  },
})