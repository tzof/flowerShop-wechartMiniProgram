// pages/index/components/float/float.js
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import shoppingCartStore from '@/stores/shoppingCart'
import {
  getShoppingCartTotal
} from '@/fetch/shoppingCart'
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
    storeBindings: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getShoppingCartTotalData() {
      getShoppingCartTotal().then(res => {
        const {
          total
        } = res.data;
        this.setTotal(total)
      })
    },
    onTapFloatShoppingCart() {
      wx.switchTab({
        url: '/pages/cart/cart',
      })
    },
  },
  lifetimes: {
    created() {
      this.data.storeBindings = createStoreBindings(this, {
        store: shoppingCartStore,
        fields: ['total'],
        actions: ['setTotal'],
      });
    },
    attached() {},
    ready() {
      this.getShoppingCartTotalData();
    },
    detached() {
      this.data.storeBindings.destroyStoreBindings();
    },
  },
  pageLifetimes: {
    show(){
      this.getShoppingCartTotalData();
    },
  },
})