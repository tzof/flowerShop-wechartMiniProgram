// packageOrders/ordersAdd/components/goodsList/goodsList.js
import { getGoodsDetail } from "@/fetch/goods";
import { getShoppingCart } from "@/fetch/shoppingCart";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsId: {
      type: String,
      value: null,
    },

    goodsList: {
      type: Array,
      value: null,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    totalPrice: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getFromGoodsDetail() {
      const goodsId = this.data.goodsId;
      getGoodsDetail({ goodsId }).then((res) => {
        res.data.count = 1;
        this.setData({
          list: [res.data],
          totalPrice: Number(res.data.discounted_price).toFixed(2),
        });
        this.triggerEvent("totalPrice", this.data.totalPrice);
      });
    },
    getFromCartDetail() {
      getShoppingCart().then((res) => {
        const selectCart = res.data.filter((item) => item.isSelect);
        const goodsInfo = selectCart.map((item) => {
          item.goodsInfo.count = item.count;
          return item.goodsInfo;
        });
        const totalPrice = goodsInfo
          .reduce((sum, item) => {
            return sum + item.count * item.discounted_price;
          }, 0)
          .toFixed(2);
        this.setData({
          list: goodsInfo,
          totalPrice,
        });
        this.triggerEvent("totalPrice", this.data.totalPrice);
      });
    },
    getFromOrdersDetail() {
      console.log(this.data.goodsList);
      const goodsInfo = this.data.goodsList.map((item) => {
        item.goodsInfo.count = item.count;
        return item.goodsInfo;
      });
      this.setData({
        list: goodsInfo,
      });
    },
    onTapGoods(event) {
      const goodsId = event.currentTarget.dataset.goodsid;
      wx.navigateTo({
        url: "/packageGoods/goodsInfo/goodsInfo?goodsId=" + goodsId,
      });
    },
  },
  lifetimes: {
    created() {},
    attached() {},
    ready() {
      if (this.data.goodsId) {
        this.getFromGoodsDetail();
      } else if (this.data.goodsList) {
        this.getFromOrdersDetail();
      } else {
        this.getFromCartDetail();
      }
    },
  },
});
