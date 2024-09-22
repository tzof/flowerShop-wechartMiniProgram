// pages/my/components/login/login.js
import {
  login
} from '../fetch/login'
import {
  getUserinfo
} from '../fetch/user'
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import userStores from '../stores/user'
const behavi = Behavior({
  data: {
    avatarUrl: null,
    avatarfileName: null,
    nickname: null,
    storeBindings: {},
  },
  methods: {
    onTapLogin() {
      console.log('onTapLogin进去了');
      wx.showLoading({
        title: '登录中',
      })
      console.log('进入wxlogin');
      wx.login({
        success: (res) => {
          const {
            code
          } = res
          console.log(res);
          if (code) {
            console.log(code);
            login({
              code
            }).then(res => {
              console.log(res);
              const {
                openId,
                token
              } = res;
              this.setToken(token);
              this.setOpenId(openId);
              console.log(openId, this.data.openId);
              wx.showToast({
                title: '登录成功',
                duration: 500,
              })
              wx.setStorageSync('token', token);
              wx.setStorageSync('openId', openId);
              console.log(token, openId);
              this.getUserinfoData();
            }).catch(err => {
              console.log(err);
              this.clear();
            })
          }
        },
        fail(err) {
          console.log(err);
          this.clear();
        }
      })
    },
    getUserinfoData() {
      const openId = wx.getStorageSync('openId')
      getUserinfo({
        openId
      }).then(res => {
        console.log(res);
        const {
          avatarUrl,
          avatarfileName,
          nickname,
        } = res.data;
        this.setData({
          avatarUrl,
          avatarfileName,
          nickname
        })
        console.log(nickname, '我是昵称');
        this.setUserInfo(res.data);
        wx.hideLoading()
      }).catch(err => {
        console.log(err);
        this.clear()
      })
    },
    clear() {
      console.log('进入了clear');
      wx.removeStorageSync('token');
      wx.removeStorageSync('openId')
      this.clearUser();
      wx.hideLoading();
      this.setData({
        avatarUrl: null,
        nickName: null,
      })
    }
  },
  lifetimes: {
    created() {
      console.log('我是lifetimes的created');
      const openId = wx.getStorageSync('openId')
      if (openId) {
        this.getUserinfoData();
      } else {
        this.onTapLogin();
      }
      this.data.storeBindings = createStoreBindings(this, {
        store: userStores,
        fields: ['token', 'openId', 'userInfo'],
        actions: ['setToken', 'setOpenId', 'setUserInfo', 'clearUser'],
      })
    },
    ready() {

      if (!this.data.token && !this.data.openId) {
        const token = wx.getStorageSync('token')
        const openId = wx.getStorageSync('openId')
        this.setToken(token);
        this.setOpenId(openId);
      }
    },
    detached() {
      this.data.storeBindings.destroyStoreBindings();
    }
  },
  pageLifetimes: {

  },
})

export default behavi;