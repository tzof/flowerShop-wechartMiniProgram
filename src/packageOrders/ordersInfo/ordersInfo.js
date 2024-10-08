// packageOrders/ordersInfo/ordersInfo.js
import { getOrdersDetail } from "@/fetch/orders";
import moment from "moment";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ordersId: null,
    info: {},
    goodsList: null,
    steps: [
      {
        text: "已经创建",
      },
      {
        text: "已支付",
      },
      {
        text: "商家确定",
      },
      {
        text: "已经发货",
      },
      {
        text: "已收货",
      },
      {
        text: "交易完成",
      },
    ],
  },
  async getOrdersDetailData() {
    await getOrdersDetail({ ordersId: this.data.ordersId }).then((res) => {
      res.data.deliveryTime = moment(res.data.deliveryTime).format(
        "YYYY-MM-DD HH:mm"
      );
      res.data.createTime = moment(res.data.createTime).format(
        "YYYY-MM-DD HH:mm"
      );
      this.data.steps.forEach((item, index) => {
        if (index <= res.data.orders_status) {
          item.desc = res.data.createTime;
        }
      });
      this.setData({
        info: res.data,
        steps: this.data.steps,
        goodsList: res.data.goodsList,
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { ordersId } = options;
    this.setData({
      ordersId,
    });
    this.getOrdersDetailData();
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
