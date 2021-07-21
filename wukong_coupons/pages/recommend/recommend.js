// pages/recommend/recommend.wxml.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
    showResult: true,
    page_no: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.get_goods_list();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.get_goods_list();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 获取特卖商品列表
  get_goods_list: function () {
    var that = this;
    wx.request({
      url: 'https://api.taobaokeapi.com/?usertoken=4e0f27c029798bd3028ee0e560bedce3&method=taobao.tbk.sc.material.optional',
      data: {
        'page_size': 100,
        'page_no': that.data.page_no,
        'adzone_id': 109751050236,
        'site_id': 1078400483,
        'q': '超值',
        'has_coupon': true,
        'need_free_shipment': true,
        'end_price': 80.0,
        'start_price': 5.0,
        'include_good_rate': true,
        'include_rfd_rate': true,
        'include_pay_rate_30': true
      },
      success: function (res) {
        console.log(res);
          that.setData({ couponList: that.data.couponList.concat(res.data.result_list.map_data) });
        that.data.page_no++;
      }
    });
  },

  // 复制淘口令
  get_taobao_command: function (event) {
    console.log(event);
    var item_id = event.target.dataset.item;
    // 获取淘口令
    wx.request({
      url: 'https://api.taobaokeapi.com/?usertoken=4e0f27c029798bd3028ee0e560bedce3&method=api.taobao.id2tkl',
      data: {
        'adzone_id': 109751050236,
        'site_id': 1078400483,
        'item_id': item_id,
      },
      success: function (res) {
        console.log(res);
        wx.setClipboardData({
          data: res.data.result.data.mode,
          success: function (e) {
            wx.hideToast();
            wx.showModal({
              title: '温馨提示',
              content: '淘口令已复制，打开对应App会自动跳转到领券地址',
              showCancel: false,
              confirmText: "确定",
              confirmColor: "#576B95"
            })
          }
        })
      }
    })
  }
})