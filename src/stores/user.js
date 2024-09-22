import {
  observable,
  action
} from 'mobx-miniprogram'
const numstore = observable({
  token: null,
  openId: null,
  userInfo: {},
  setToken: action(function (data) {
    this.token = data;
  }),
  setOpenId: action(function (data) {
    this.openId = data;
  }),
  setUserInfo: action(function (data) {
    this.userInfo = data;
  }),
  clearUser: action(function (){
    this.token = null;
    this.openId = null;
    this.userInfo = {};
  })
})

export default numstore