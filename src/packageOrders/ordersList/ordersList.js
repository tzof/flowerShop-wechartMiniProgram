// packageOrders/ordersList/ordersList.js
import { getOrders } from "@/fetch/orders";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 订单状态 0.已经创建 1.已支付 2.商家确定 3.已经发货 4.已收货 5.交易完成
    status: null,
    timer: false,
    isEnd: false,
    pageNum: 1,
    pageSize: 10,
    list: [],
  },
  getOrdersData() {
    const params = {
      status: this.data.status,
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
    };
    getOrders(params).then((res) => {
      res.data.forEach((item) => {
        // orders_status 订单状态 0.已经创建 1.已支付 2.商家确定 3.已经发货 4.已收货 5.交易完成
        switch (item.orders_status) {
          case 0:
            item.status = "已经创建";
            break;
          case 1:
            item.status = "已支付";
            break;
          case 2:
            item.status = "商家确定";
            break;
          case 3:
            item.status = "已经发货";
            break;
          case 4:
            item.status = "已经创建";
            break;
          case 5:
            item.status = "交易完成";
            break;
          default:
            item.status = "已经创建";
            break;
        }
      });
      this.setData({
        list: this.data.list.concat(res.data),
        total: res.total,
      });
      if (res.total > this.data.list.length) {
        this.setData({
          timer: false,
        });
      } else {
        this.setData({
          isEnd: true,
          timer: true,
        });
      }
    });
  },
  onTapOrderDetail(event) {
    const ordersId = event.currentTarget.dataset.ordersid;
    wx.navigateTo({
      url: '/packageOrders/ordersInfo/ordersInfo?ordersId=' + ordersId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { status } = options;
    this.setData({
      status,
    });
    this.getOrdersData();
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
  onReachBottom() {
    if (this.data.timer) {
      // 加个节流预防频繁翻页和翻页大于总数的问题
      return;
    }
    this.setData({
      pageNum: this.data.pageNum + 1,
      timer: true,
    });
    this.getOrdersData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
