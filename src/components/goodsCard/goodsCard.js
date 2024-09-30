import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import shoppingCartStore from '@/stores/shoppingCart'
import {
  getGoods,
} from '@/fetch/goods'
import {
  setShoppingCart,
  getShoppingCartTotal
} from '@/fetch/shoppingCart'
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    category_ids: {
      type: String,
      value: null,
    },
    isReachBottom: { // 全写
      type: Boolean, // 类型
      value: false, // 默认值
      observer: function (newVal, oldVal) {
        // 可选：当属性值变化时触发的观察者函数
        // console.log('isChecked changed from', oldVal, 'to', newVal);
        this.pageGoodsData()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timer: null,
    isEnd: false,
    pageNum: 1,
    pageSize: 10,
    list: [],
    storeBindings: {},
  },
  observers: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    getGoodsData() {
      getGoods({
        category_ids: this.data.category_ids
      }).then(res => {
        console.log(res);
        this.setData({
          list: res.data
        })
      })
    },
    pageGoodsData() {
      // 加个节流预防频繁翻页和翻页大于总数的问题
      if (this.data.timer) {
        return
      }
      this.setData({
        pageNum: this.data.pageNum + 1,
        timer: true
      })
      const pageNum = this.data.pageNum;
      const pageSize = this.data.pageSize;
      getGoods({
        pageNum,
        pageSize,
        category_ids: this.data.category_ids
      }).then(res => {
        this.setData({
          list: [...this.data.list, ...res.data]
        })
        this.triggerEvent("isPage", false);
        if (res.total > this.data.list.length) {
          this.setData({
            timer: false,
          })
        } else {
          this.setData({
            isEnd: true
          })
        }
      })
    },
    onTapShoppingCart(event) {
      const {
        item
      } = event.currentTarget.dataset;
      console.log(item);
      const params = {
        goodsId: item.goodsId,
        count: 1
      }
      console.log(params);
      setShoppingCart(params).then(res => {
        console.log(res);
        getShoppingCartTotal().then(res => {
          console.log(res);
          const {
            total
          } = res.data;
          this.setTotal(total)
        })
      })
    },
  },
  lifetimes: {
    created() {
      this.data.storeBindings = createStoreBindings(this, {
        store: shoppingCartStore,
        actions: ['setTotal'],
      });
    },
    ready() {
      this.getGoodsData();
    },
    detached() {
      this.data.storeBindings.destroyStoreBindings();
    }
  },
})