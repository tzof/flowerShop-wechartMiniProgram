// pages/my/components/order/order.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onTapOrderStatus(event) {
      const { status } = event.currentTarget.dataset;
      wx.navigateTo({
        url: '/packageOrders/ordersList/ordersList' + (status ? `?status=${status}` : ''),
      })
    },
  },
});
