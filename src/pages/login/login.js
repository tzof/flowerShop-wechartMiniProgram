import { createStoreBindings } from "mobx-miniprogram-bindings";
import userStore from "@/stores/user";
import { login } from "@/fetch/login";
import { getUserinfo } from "@/fetch/user";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    storeBindings: {},
    isNotTokenToLogin: false,
  },
  loginGetToken() {
    wx.showLoading({
      title: "登录中",
    });
    wx.login({
      success: (res) => {
        const { code } = res;
        if (code) {
          console.log(code);
          login({
            code,
          })
            .then((res) => {
              console.log(res);
              const { openId, token } = res;
              this.setToken(token);
              this.setOpenId(openId);
              wx.setStorageSync("token", token);
              wx.setStorageSync("openId", openId);
              this.getUserinfoData();
            })
            .catch((err) => {
              console.log(err);
              this.clear();
            });
        }
      },
      fail(err) {
        console.log(err);
        this.clear();
      },
    });
  },
  getUserinfoData() {
    getUserinfo()
      .then((res) => {
        console.log(res);
        this.setUserInfo(res.data);
        wx.showToast({
          title: "登录成功",
          duration: 500,
        });
        wx.hideLoading();
        // 如果时候调用接口时token失效转跳到登录页面则回退页面
        if (this.data.isNotTokenToLogin) {
          wx.navigateBack();
        } else {
          // 默认进来登录页面则转跳index首页
          wx.switchTab({
            url: "/pages/index/index",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.clear();
      });
  },
  clear() {
    wx.removeStorageSync("token");
    wx.removeStorageSync("openId");
    this.clearUser();
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { isNotTokenToLogin } = options;
    this.setData({
      isNotTokenToLogin,
    });
    this.data.storeBindings = createStoreBindings(this, {
      store: userStore,
      fields: ["userInfo"],
      actions: ["setToken", "setOpenId", "setUserInfo", "clearUser"],
    });
    this.loginGetToken();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("我出现了");
  },

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
