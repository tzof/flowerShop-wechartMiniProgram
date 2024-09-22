// packageMy/setUserInfo/setUserInfo.js
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import userStores from '../../stores/user'
import {
  upload
} from '../../fetch/upload'
import {
  setUserinfo
} from '../../fetch/user'
Page({
  onTapAvatarUrl(event) {
    const avatarUrl = event.detail.avatarUrl;
    upload({
      file: avatarUrl
    }).then(res => {
      console.log(res);
      const {
        avatarUrl,
        fileName
      } = res;
      this.setData({
        avatarUrl,
        avatarfileName: fileName
      })
    })
  },
  onBlurNickname(event) {
    console.log(event);
    const nickname = event.detail.value;
    console.log(nickname);
    this.setData({
      nickname
    })
  },
  onTapSetUserInfo() {
    console.log('按钮被点击');
    setTimeout(() => {
      const {
        avatarUrl,
        avatarfileName,
        nickname,
      } = this.data
      const openId = wx.getStorageSync('openId')
      let params = {
        openId,
        avatarUrl,
        avatarfileName,
        nickname,
      }
      console.log(params);
      setUserinfo(params).then(res => {
        console.log(res);
        wx.showLoading({
          title: '保存中',
        })
        wx.showToast({
          title: '保存成功',
          duration: 500
        })
        wx.navigateBack()
      }).catch(err => {
        console.log(err);
        wx.hideLoading()
      })
    }, 100);
  },
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: null,
    avatarfileName: null,
    nickname: '123121',
    storeBindings: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.storeBindings = createStoreBindings(this, {
      store: userStores,
      fields: ['token', 'openId', 'userInfo'],
      actions: ['setToken', 'setOpenId', 'setUserInfo'],
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      nickname: this.data.userInfo.nickname,
      avatarUrl: this.data.userInfo.avatarUrl,
      avatarfileName: this.data.userInfo.avatarfileName
    })
    console.log(this.data.openId);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.data.storeBindings.destroyStoreBindings();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})