// packageMy/setUserInfo/setUserInfo.js
import { createStoreBindings } from "mobx-miniprogram-bindings";
import userStores from "../../stores/user";
import { upload } from "../../fetch/upload";
import { setUserinfo } from "../../fetch/user";
Page({
  onTapAvatarUrl(event) {
    const avatarUrl = event.detail.avatarUrl;
    upload({
      file: avatarUrl,
    }).then((res) => {
      console.log(res);
      const { avatarUrl, fileName } = res;
      this.setData({
        avatarUrl,
        avatarfileName: fileName,
      });
    });
  },
  onBlurNickname(event) {
    console.log(event);
    const nickname = event.detail.value;
    console.log(nickname);
    this.setData({
      nickname,
    });
  },
  onTapBlurMask() {
    setTimeout(() => {
      this.onTapSetUserInfo();
    }, 100);
  },
  async onTapSetUserInfo() {
    const { avatarUrl, avatarfileName, nickname } = this.data;
    let params = {
      avatarUrl,
      avatarfileName,
      nickname,
    };
    console.log(params);
    await setUserinfo(params)
      .then((res) => {
        console.log(res);
        wx.showLoading({
          title: "保存中",
        });
        wx.showToast({
          title: "保存成功",
          duration: 500,
        });
        wx.navigateBack();
      })
      .catch((err) => {
        console.log(err);
        wx.hideLoading();
      });
  },
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: null,
    avatarfileName: null,
    nickname: "默认昵称",
    storeBindings: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.storeBindings = createStoreBindings(this, {
      store: userStores,
      fields: ["userInfo"],
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      nickname: this.data.userInfo.nickname,
      avatarUrl: this.data.userInfo.avatarUrl,
      avatarfileName: this.data.userInfo.avatarfileName,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.data.storeBindings.destroyStoreBindings();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
