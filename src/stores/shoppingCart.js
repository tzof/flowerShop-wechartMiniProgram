import {
  observable,
  action
} from 'mobx-miniprogram'
const shoppingCartStore = observable({
  total: 0,
  setTotal: action(function (data) {
    this.total = Number(data);
  }),
  clearShoppingCart: action(function () {
    this.total = 0;
  })
})

export default shoppingCartStore