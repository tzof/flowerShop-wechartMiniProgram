// pages/my/components/address/address.js
Component({
  options: {
    // styleIsolatio，默认情况下开启样式隔离isolated  
    // apply-shared表示父组件的样式能影响到自定义组件，但是自定义组件的样式不会影响父组件的样式
    // shared表示父组件的样式能影响到自定义组件，自定义组件的样式也能影响到其他设置了apply-shared或shared的自定义组件。属性值为shared时externalClasses失效
    // component.json中设置也可以
    styleIsolation: "shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultAddress: {
      recipients: '养老',
      phone: '17682426910',
      province: '浙江省',
      city: '杭州市',
      county: '萧山区',
      full_address: '大栅栏看能否肯定是你考拉放大收纳拉卡萨放大你那啥打法吗，索尼大法，吗'
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapAddressSetting(){
      wx.navigateTo({
        url: '/packageMy/showAddress/showAddress',
      })
    },
  }
})