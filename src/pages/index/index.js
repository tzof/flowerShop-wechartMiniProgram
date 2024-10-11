// index.js
Page({
  data: {
    isReachBottom: false,
  },
  // goodsCard传来的
  isPageThen(event) {
    this.setData({
      isReachBottom: event.detail,
    });
  },
  onLoad() {},
  onShow() {},
  onReady() {},
  onUnload() {},
  // 上拉触底
  // app.json或page.json中通过onReachBottomDistance配置触发距离，默认50(px)
  onReachBottom() {
    console.log("我触底了");
    this.setData({
      isReachBottom: true,
    });
  },
});
