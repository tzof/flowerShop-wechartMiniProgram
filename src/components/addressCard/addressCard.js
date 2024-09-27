// components/addressCard/addressCard.js
import {
  getDefaultAddress,
  getAddress,
  addAddress,
  setAddress
} from '@/fetch/address'
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import userStores from '@/stores/user'
Component({
  options: {
    // styleIsolatio，默认情况下开启样式隔离isolated  
    // apply-shared表示父组件的样式能影响到自定义组件，但是自定义组件的样式不会影响父组件的样式
    // shared表示父组件的样式能影响到自定义组件，自定义组件的样式也能影响到其他设置了apply-shared或shared的自定义组件。属性值为shared时externalClasses失效
    // component.json中设置也可以
    styleIsolation: "shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否只显示默认地址
    isDefault: {
      type: Number,
      value: 0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    storeBindings: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDefaultAddressData() {
      const openId = this.data.openId;
      getDefaultAddress({
        openId
      }).then(res => {
        this.setData({
          list: [res.data]
        })
      })
    },
    getAddressData() {
      const openId = this.data.openId;
      getAddress({
        openId
      }).then(res => {
        this.setData({
          list: res.data
        })
      })
    },
  },
  lifetimes: {
    created() {
      this.data.storeBindings = createStoreBindings(this, {
        store: userStores,
        fields: ['openId'],
      });
    },
    attached() {},
    ready() {
      if (this.data.isDefault) {
        this.getDefaultAddressData();
      } else {
        this.getAddressData();
      }
    },
    detached() {},
  },
  pageLifetimes: {
    show() {},
  },
})