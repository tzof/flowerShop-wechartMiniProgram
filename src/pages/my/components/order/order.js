// pages/my/components/order/order.js
import { getOrdersTotal } from "@/fetch/orders";
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    statusList: [
      {
        label: "待付款",
        icon: "credit-pay",
        infoTotal: 0,
        status: 2,
      },
      {
        label: "待收货",
        icon: "logistics",
        infoTotal: 0,
        status: 3,
      },
      {
        label: "已完成",
        icon: "sign",
        infoTotal: 0,
        status: 5,
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapOrderStatus(event) {
      const { status } = event.currentTarget.dataset;
      wx.navigateTo({
        url:
          "/packageOrders/ordersList/ordersList" +
          (status ? `?status=${status}` : ""),
      });
    },
    getOrdersTotalData(status) {
      getOrdersTotal({ status }).then((res) => {
        this.data.statusList.forEach((item) => {
          if (item.status == status) {
            item.infoTotal = res.data;
          }
        });
        this.setData({
          statusList: this.data.statusList,
        });
      });
    },
  },
  lifetimes: {
    created() {},
    attached() {},
    ready() {
      this.getOrdersTotalData(0);
      this.getOrdersTotalData(3);
      this.getOrdersTotalData(5);
    },
  },
});
