// packageGoods/goodsInfo/goodsInfo.js
import { getGoodsDetail } from "@/fetch/goods";
import { getShoppingCartTotal, setShoppingCart } from "@/fetch/shoppingCart";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsId: null,
    info: null,
    cartTotal: 0,
  },
  getGoodsDetailData() {
    getGoodsDetail({
      goodsId: this.data.goodsId,
    }).then((res) => {
      console.log(res);
      this.setData({
        info: res.data,
      });
    });
  },
  getShoppingCartTotalData() {
    getShoppingCartTotal().then((res) => {
      console.log(res);
      this.setData({
        cartTotal: res.data.total,
      });
    });
  },
  onClickHome() {
    wx.switchTab({
      url: "/pages/index/index",
    });
  },
  onClickCart() {
    wx.switchTab({
      url: "/pages/cart/cart",
    });
  },
  onClickAddCart(event) {
    const goodsId = event.currentTarget.dataset.goodsid;
    const params = {
      goodsId: goodsId,
    };
    setShoppingCart(params).then((res) => {
      wx.showToast({
        title: "增加购物车成功",
        duration: 500,
      });
      this.getShoppingCartTotalData();
    });
  },
  onClickBuy(event) {
    const goodsId = event.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: "/packageOrders/ordersAdd/ordersAdd?goodsId=" + goodsId,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { goodsId } = options;
    this.setData({
      goodsId,
    });
    this.getGoodsDetailData();
    this.getShoppingCartTotalData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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
  onUnload() {},

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
