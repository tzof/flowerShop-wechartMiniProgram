// app.js
App({
  onLaunch() {
    // wx.clearStorageSync()
    wx.removeStorageSync("token");
    wx.removeStorageSync("openId");
  },
});
