import { createStoreBindings } from "mobx-miniprogram-bindings";
import userStore from "@/stores/user";
import { getUserinfo } from "@/fetch/user";
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    storeBindings: {},
    token: null,
    flag: false, // 是否需要重新获取用户信息 从设置用户信息返回后需要
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapLogin() {
      wx.navigateTo({
        url: "/pages/login/login?isNotTokenToLogin=true",
      });
    },
    onTapSettingUserInfo() {
      this.setData({
        flag: true,
      });
      wx.navigateTo({
        url: "/packageMy/setUserInfo/setUserInfo",
      });
    },
    getUserinfoData() {
      getUserinfo()
        .then((res) => {
          this.setUserInfo(res.data);
          this.setData({
            flag: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  lifetimes: {
    created() {
      this.data.storeBindings = createStoreBindings(this, {
        store: userStore,
        fields: ["userInfo"],
        actions: ["setUserInfo"],
      });
    },
    attached() {},
    ready() {},
    detached() {
      this.data.storeBindings.destroyStoreBindings();
    },
  },
  pageLifetimes: {
    show() {
      const token = wx.getStorageSync("token");
      this.setData({
        token,
      });
      if (this.data.flag) {
        this.getUserinfoData();
      }
    },
  },
});
