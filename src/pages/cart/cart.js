// pages/cart/cart.js
import {
  getShoppingCart,
  setShoppingCart,
  deleteShoppingCart,
  setShoppingCartSelect,
  setShoppingCartAllSelect,
} from "@/fetch/shoppingCart";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    totalPrice: 0,
    isAllSelect: false,
  },
  getShoppingCartData() {
    getShoppingCart().then((res) => {
      console.log(res);
      const selectCart = res.data.filter((item) => item.isSelect);
      const totalPrice = selectCart
        .reduce((sum, item) => {
          return sum + item.totalPrice;
        }, 0)
        .toFixed(2);
      this.setData({
        list: res.data,
        totalPrice,
        isAllSelect: selectCart.length == res.data.length ? true : false,
      });
    });
  },
  onChangeCardCheckbox(event) {
    const isSelect = event.detail;
    const carId = event.currentTarget.dataset.carid;
    const params = {
      carId,
      isSelect,
    };
    setShoppingCartSelect(params).then((res) => {
      console.log(res);
      this.getShoppingCartData();
    });
  },
  onChangeAllCheckbox(event) {
    const isSelect = event.detail;
    const params = {
      isSelect,
    };
    setShoppingCartAllSelect(params).then((res) => {
      console.log(res);
      this.setData({
        isAllSelect: isSelect,
      });
      this.getShoppingCartData();
    });
  },
  onChangeCount(event) {
    const count = event.detail;
    const goodsId = event.currentTarget.dataset.goodsid;
    const params = {
      goodsId,
      count,
    };
    setShoppingCart(params).then((res) => {
      console.log(res);
      this.getShoppingCartData();
      // const dataPath = `list[${changeIndex}]`
      // this.setData({
      //   [dataPath]: changeData
      // })
    });
  },
  deleteShoppingCart(carId) {
    wx.showModal({
      title: "提示",
      content: "确定删除该商品吗？",
      confirmColor: "red",
      success: (res) => {
        console.log(res);
        if (res.confirm) {
          const params = {
            carId,
          };
          deleteShoppingCart(params).then((res) => {
            console.log(res);
            wx.showToast({
              title: "删除成功",
              duration: 500,
            });
            this.getShoppingCartData();
          });
        }
      },
      fail: (err) => {
        console.log(err);
      },
    });
  },
  onBindDisableMinus(event) {
    const carId = event.currentTarget.dataset.carid;
    this.deleteShoppingCart(carId);
  },
  onDeleteShoppingCart(event) {
    const carId = event.currentTarget.dataset.carid;
    this.deleteShoppingCart(carId);
  },
  onTapGoods(event) {
    const goodsId = event.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: "/packageGoods/goodsInfo/goodsInfo?goodsId=" + goodsId,
    });
  },
  onTapSettleAccounts(event) {
    wx.navigateTo({
      url: "/packageOrders/ordersAdd/ordersAdd",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getShoppingCartData();
  },

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
