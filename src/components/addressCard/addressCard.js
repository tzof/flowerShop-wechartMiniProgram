// components/addressCard/addressCard.js
import {
  getDefaultAddress,
  getAddress,
  setDefaultAddress,
  deleteAddress,
} from "@/fetch/address";
Component({
  options: {
    // styleIsolation，默认情况下开启样式隔离isolated
    // apply-shared表示父组件的样式能影响到自定义组件，但是自定义组件的样式不会影响父组件的样式
    // shared表示父组件的样式能影响到自定义组件，自定义组件的样式也能影响到其他设置了apply-shared或shared的自定义组件。属性值为shared时externalClasses失效
    // component.json中设置也可以
    styleIsolation: "apply-shared",
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否只显示默认地址
    isDefault: {
      type: Number,
      value: 0,
    },
    // 是否是订单状态的地址列表
    isOrders: {
      type: Number,
      value: 0,
    },
    // 订单状态时选择的地址id
    selectAddressId: {
      type: Number,
      value: null,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    storeBindings: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDefaultAddressData() {
      getDefaultAddress().then((res) => {
        this.setData({
          list: res.data ? [res.data] : null,
        });
      });
    },
    getAddressData() {
      getAddress().then((res) => {
        res.data.forEach((item) => {
          if (
            this.data.isOrders &&
            item.addressId == this.data.selectAddressId
          ) {
            item.change = true;
          }
        });
        this.setData({
          list: res.data,
        });
      });
    },
    onChangeAddress(event) {
      if (this.data.isOrders) {
        const addressId = event.currentTarget.dataset.addressid;
        let listData = this.data.list;
        let changeId = null;
        listData.forEach((item, index) => {
          item.change = false;
          if (item.addressId == addressId) {
            item.change = true;
            changeId = item.addressId;
          }
        });
        this.setData({
          list: listData,
        });
        this.triggerEvent("changeAddress", changeId);
      }
    },
    onChangeCheckbox(event) {
      const { addressid } = event.currentTarget.dataset;
      const is_default = event.detail;
      const params = {
        addressId: addressid,
        is_default,
      };
      setDefaultAddress(params).then(async (res) => {
        console.log(res);
        await this.getAddressData();
        wx.showToast({
          title: "已设为默认地址",
          duration: 500,
        });
      });
    },
    onTapDelete(event) {
      const { addressid } = event.currentTarget.dataset;
      console.log(addressid);
      wx.showModal({
        title: "提示",
        content: "确定删除该地址吗？",
        confirmColor: "red",
        success: (res) => {
          console.log(res);
          if (res.confirm) {
            deleteAddress({
              addressId: addressid,
            }).then(async (res) => {
              console.log(res);
              await this.getAddressData();
              wx.showToast({
                title: "删除地址成功",
                duration: 500,
              });
            });
          }
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
    onTapUpdate(event) {
      const { addressid } = event.currentTarget.dataset;
      wx.navigateTo({
        url: `/packageAddress/setAddress/setAddress?addressId=${addressid}`,
        events: {
          idSuccess: (res) => {
            console.log(res);
          },
        },
        success: (res) => {
          res.eventChannel.emit("addressId", addressid);
        },
      });
    },
  },
  lifeitmes: {
    created() {},
    attached() {},
    ready() {},
    detached() {},
  },
  pageLifetimes: {
    show() {
      if (this.data.isDefault) {
        this.getDefaultAddressData();
      } else {
        this.getAddressData();
      }
    },
  },
});
