import loginBehavi from '@/mixins/loginBehavior'
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import userStores from '@/stores/user'
Component({
  behaviors: [loginBehavi],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: false,
    storeBindings: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapSettingUserInfo() {
      wx.navigateTo({
        url: '/packageMy/setUserInfo/setUserInfo',
      })
      this.setData({
        flag: true
      })
    },
  },
  lifetimes: {
    async created() {
      this.data.storeBindings = await createStoreBindings(this, {
        store: userStores,
        fields: ['openId', 'userInfo'],
        actions: ['setToken', 'setOpenId', 'setUserInfo', 'clearUser'],
      })
    },
    async attached() {

    },
    ready() {

    },
    detached() {
      this.data.storeBindings.destroyStoreBindings();
    }
  },
  pageLifetimes: {
    show: function () {
      const openId = this.data.openId;
      if (openId && this.data.flag) {
        this.getUserinfoData();
      }
      this.setData({
        flag: false
      })
    },
  },
})