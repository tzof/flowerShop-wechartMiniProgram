// pages/category/category.js
import {
  getCategory,
} from '@/fetch/category'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeIndex: 0,
    sidebarList: [],
    list: [],
  },
  getCategoryData() {
    getCategory().then(res => {
      console.log(res);
      this.setData({
        sidebarList: res.data
      })
      this.getSmallCategoryData(this.data.sidebarList[this.data.changeIndex].category_id)
    })
  },
  getSmallCategoryData(id) {
    getCategory({
      id
    }).then(res => {
      console.log(res);
      this.setData({
        list: res.data
      })
    })
  },
  onChangeAside(event) {
    const {
      index,
      item
    } = event.currentTarget.dataset;
    this.setData({
      changeIndex: index
    })
    this.getSmallCategoryData(item.category_id)
  },
  onTapCategory(event){
    const {category_id} = event.currentTarget.dataset
    wx.navigateTo({
      url: '/packageGoods/goodsList/goodsList?category_id=' + category_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCategoryData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // this.setData({
    //   changeIndex: 0
    // })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})