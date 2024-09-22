import loginBehavi from '../../../../mixins/login.js'
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
    ready() {
      this.setData({
        nickname: this.data.userInfo.nickname,
        avatarUrl: this.data.userInfo.avatarUrl,
      })
    }
  },
  pageLifetimes: {
    show: function () {
      console.log('页面显示');
      // const pages = getCurrentPages();
      const openId = wx.getStorageSync('openId')
      console.log(openId, this.data.flag);
      if (openId && this.data.flag) {
        console.log('我进入了my里login组件的show');
        this.getUserinfoData();
      }
      this.setData({
        flag: false
      })
    },
  },
})