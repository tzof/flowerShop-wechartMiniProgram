import { createStoreBindings } from "mobx-miniprogram-bindings";
import userStore from "@/stores/user";
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
      wx.navigateTo({
        url: "/packageMy/setUserInfo/setUserInfo",
      });
    },
  },
  lifetimes: {
    created() {
      this.data.storeBindings = createStoreBindings(this, {
        store: userStore,
        fields: ["userInfo"],
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
    },
  },
});
