// pages/index/components/float/float.js
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import shoppingCartStore from '@/stores/shoppingCart'
import userStores from '@/stores/user'
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
    storeBindingsUser: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getShoppingCartTotalData() {
      const openId = this.data.openId;
      getShoppingCartTotal({
        openId
      }).then(res => {
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
      this.data.storeBindingsUser = createStoreBindings(this, {
        store: userStores,
        fields: ['openId'],
      });
    },
    attached() {},
    ready() {
      this.getShoppingCartTotalData();
    },
    detached() {
      this.data.storeBindings.destroyStoreBindings();
      this.data.storeBindingsUser.destroyStoreBindings();
    },
  },
  pageLifetimes: {
    show(){
      this.getShoppingCartTotalData();
    },
  },
})