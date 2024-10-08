// packageOrders/ordersInfo/components/address/address.js
import { getDefaultAddress, getAddress } from "@/fetch/address";
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    address: null,
    selectAddressId: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDefaultAddressData() {
      getDefaultAddress().then((res) => {
        this.setData({
          address: res.data,
          selectAddressId: res.data.addressId,
        });
      });
    },
    onTapChangeAddress() {
      wx.navigateTo({
        url:
          "/packageAddress/showAddress/showAddress?isOrders=1&selectAddressId=" +
          this.data.selectAddressId,
        events: {
          changeAddressId: (data) => {
            getAddress({ addressId: data }).then((res) => {
              this.setData({
                address: res.data[0],
                selectAddressId: res.data[0].addressId,
              });
            });
          },
        },
      });
    },
  },
  lifetimes: {
    created() {},
    attached() {
      this.getDefaultAddressData();
    },
    ready() {
      // console.log(this.data.goodsId);
    },
    detached() {},
  },
});
