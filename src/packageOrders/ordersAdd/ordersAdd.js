// packageOrders/ordersAdd/ordersAdd.js
import moment from "moment";
import { addOrders } from "@/fetch/orders";
import { setMinusShoppingCartCount } from "@/fetch/shoppingCart";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsId: null,
    totalPrice: 0,
  },
  setTotalPrice(data) {
    this.setData({
      totalPrice: data.detail,
    });
  },
  onTapSubmitOrders() {
    // 地址
    const addressData = this.selectComponent("#addressM").data;
    const {
      recipients,
      phone,
      province,
      city,
      county,
      full_address,
    } = addressData.address;
    const address =
      recipients + phone + province + city + county + full_address;
    // 订购信息 期望送达时间 订单备注
    const infoData = this.selectComponent("#info").data;
    const { orders_name, orders_phone, orders_notes } = infoData;
    let deliveryTime =
      moment().format("YYYY-MM-DD") + " " + (infoData.deliveryTime || "00:00");
    // 商品列表
    const goodsListData = this.selectComponent("#goodsList").data;
    const { list, totalPrice } = goodsListData;
    const goodsList = list.map((item) => {
      return {
        goodsId: item.goodsId,
        count: item.count,
      };
    });
    const params = {
      address,
      recipients,
      phone,
      province,
      city,
      county,
      full_address,
      orders_name,
      orders_phone,
      deliveryTime,
      orders_notes,
      goodsList,
      totalPrice,
    };
    addOrders(params).then((res) => {
      // 购物车点击结算下单成功后减少购物车商品数量
      if (!this.data.goodsId) {
        const changeCartsList = goodsList.map((item) => {
          return {
            goodsId: item.goodsId,
            count: item.count,
          };
        });
        setMinusShoppingCartCount({ changeCartsList }).then((res) => {
          wx.showToast({
            title: "下单成功",
            duration: 500,
            success: () => {
              wx.navigateBack();
            },
          });
        });
      }
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
