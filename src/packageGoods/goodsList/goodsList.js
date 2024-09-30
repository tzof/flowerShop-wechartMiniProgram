// packageGoods/goodsList/goodsList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isReachBottom: false,
    category_ids: null,
  },
  isPageThen(event) {
    // console.log(event.detail);
    this.setData({
      isReachBottom: event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const category_ids = options.category_id;
    this.setData({
      category_ids
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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
    console.log('我触底了');
    this.setData({
      isReachBottom: true,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})