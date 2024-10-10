// pages/my/components/login/login.js
import { login } from "@/fetch/login";
import { getUserinfo } from "@/fetch/user";
const behavi = Behavior({
  data: {
    avatarUrl: null,
    avatarfileName: null,
    nickname: null,
    storeBindings: {},
  },
  methods: {
    onTapLogin() {
      return new Promise((resolveLogin, reject) => {
        wx.showLoading({
          title: "登录中",
        });
        console.log("进入wxlogin");
        wx.login({
          success: (res) => {
            const { code } = res;
            console.log(res);
            if (code) {
              console.log(code);
              login({
                code,
              })
                .then(async (res) => {
                  console.log(res);
                  const { openId, token } = res;
                  this.setToken(token);
                  this.setOpenId(openId);
                  wx.showToast({
                    title: "登录成功",
                    duration: 500,
                  });
                  wx.setStorageSync("token", token);
                  wx.setStorageSync("openId", openId);
                  await this.getUserinfoData();
                  resolveLogin();
                })
                .catch((err) => {
                  console.log(err);
                  reject();
                  this.clear();
                });
            }
          },
          fail(err) {
            console.log(err);
            reject(err);
            this.clear();
          },
        });
      });
    },
    getUserinfoData() {
      return getUserinfo()
        .then((res) => {
          console.log(res);
          const { avatarUrl, avatarfileName, nickname } = res.data;
          this.setData({
            avatarUrl,
            avatarfileName,
            nickname,
          });
          this.setUserInfo(res.data);
          wx.hideLoading();
        })
        .catch((err) => {
          console.log(err);
          this.clear();
        });
    },
    clear() {
      wx.removeStorageSync("token");
      wx.removeStorageSync("openId");
      this.clearUser();
      wx.hideLoading();
      this.setData({
        avatarUrl: null,
        nickName: null,
        avatarfileName: null,
      });
    },
  },
});

export default behavi;
