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
    isReachBottom: false,
  },
  // goodsCard传来的
  isPageThen(event) {
    // console.log(event.detail);
    this.setData({
      isReachBottom: event.detail
    })
  },
  onLoad() {
    this.data.storeBindings = createStoreBindings(this, {
      store: userStores,
      fields: ['userInfo'],
      actions: ['setToken', 'setOpenId', 'setUserInfo', 'clearUser'],
    })
  },
  onReady() {
    if (this.data.userInfo && Object.keys(this.data.userInfo).length === 0) {
      this.onTapLogin();
    }
  },
  onUnload() {
    this.data.storeBindings.destroyStoreBindings();
  },
  // 上拉触底
  // app.json或page.json中通过onReachBottomDistance配置触发距离，默认50(px)
  onReachBottom() {
    console.log('我触底了');
    this.setData({
      isReachBottom: true,
    })
  },
})