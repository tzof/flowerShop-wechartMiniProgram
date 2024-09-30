// packageMy/setAddress/setAddress.js
import QQMapWX from '@/libs/qqmap-wx-jssdk.min'
import {
  getAddress,
  addAddress,
  setAddress,
} from '@/fetch/address'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isUpdate: false,
    addressId: null,
    recipients: null,
    phone: null,
    region: null,
    full_address: null,
    is_default: false,
    qqmapwx: null,
  },
  getAddressData() {
    getAddress({
      addressId: this.data.addressId
    }).then(res => {
      console.log(res);
      this.setData({
        recipients: res.data[0].recipients,
        phone: res.data[0].phone,
        region: [res.data[0].province, res.data[0].city, res.data[0].county],
        full_address: res.data[0].full_address,
        is_default: res.data[0].is_default,
      })
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value, e)
    this.setData({
      region: e.detail.value
    })
  },
  async onTapLocation() {
    // console.log(await wx.chooseLocation());
    const {
      latitude,
      longitude,
      name
    } = await wx.chooseLocation()
    // 使用 reverseGeocoder 方法进行逆地址解析
    // https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/methodReverseGeocoder
    this.data.qqmapwx.reverseGeocoder({
      location: {
        longitude,
        latitude
      },
      success: (res) => {
        console.log(res);
        // 获取省市区、省市区编码
        const {
          province,
          city,
          district
        } = res.result.ad_info

        // 获取街道、门牌 (可能为空)
        const {
          street,
          street_number
        } = res.result.address_component

        // 获取标准地址
        const {
          recommend, // 经过腾讯地图优化过的描述方式，更具人性化特点
        } = res.result.formatted_addresses

        // // 对获取的数据进行格式化、组织，然后赋值给 data 中的字段
        this.setData({
          // 省
          'region[0]': province,

          // 市
          'region[1]': city,

          // 县
          'region[2]': district,

          // 详细地址以及完整地址，在以后开发中根据产品的需求来进行选择、处理即可
          // 组织详细地址
          full_address: street + street_number + name,
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },
  onTapSave(event) {
    const {
      recipients,
      phone,
      region,
      full_address,
      is_default
    } = event.detail.value
    const [province, city, county] = region;
    const params = {
      recipients,
      phone,
      province,
      city,
      county,
      full_address,
      is_default: is_default ? 1 : 0
    }
    if (this.data.isUpdate) {
      params.addressId = this.data.addressId;
      setAddress(params).then(res => {
        console.log(res);
        wx.showToast({
          title: '修改地址成功',
          duration: 500,
        })
        wx.navigateBack();
      })
    } else {
      addAddress(params).then(res => {
        console.log(res);
        wx.showToast({
          title: '新增地址成功',
          duration: 500,
        })
        wx.navigateBack();
      })
    }
    console.log(params);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('addressId', (res) => {
      console.log(res);
    })
    eventChannel.emit('idSuccess', 'tzof')
    if (options.addressId) {
      this.setData({
        isUpdate: true,
        addressId: options.addressId
      })
      this.getAddressData()
    } else {
      this.setData({
        isUpdate: false,
        addressId: null
      })
    }
    // 对核心类 QQMapWX 进行实例化
    this.data.qqmapwx = new QQMapWX({
      // key 要使用自己申请的 key
      // 在进行逆解析的时候，如果发现 key 只能使用一次，需要在腾讯位置服务后台配置额度
      key: 'UT6BZ-YIS6U-KTFV5-GDAJQ-YOF4K-Z5FHP'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})