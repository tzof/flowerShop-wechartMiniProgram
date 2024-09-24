// index.js
import loginBehavi from '@/mixins/loginBehavior'
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import userStores from '@/stores/user'
Page({
  behaviors: [loginBehavi],
  data: {
    storeBindings: {},
  },
  onLoad() {
    this.data.storeBindings = createStoreBindings(this, {
      store: userStores,
      fields: ['token', 'openId', 'userInfo'],
      actions: ['setToken', 'setOpenId', 'setUserInfo', 'clearUser'],
    })
  },
  onReady() {
    console.log('我准备好了');
    if (this.data.userInfo && Object.keys(this.data.userInfo).length === 0) {
      this.onTapLogin();
    }
  },
  onUnload() {
    this.data.storeBindings.destroyStoreBindings();
  },
})