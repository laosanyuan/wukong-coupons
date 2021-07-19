// pages/recommend/recommend.wxml.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
    showResult: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://api.taobaokeapi.com/?usertoken=4e0f27c029798bd3028ee0e560bedce3&method=taobao.tbk.sc.material.optional',
      data: {
        'page_size': 50,
        'adzone_id': 109751050236,
        'site_id': 1078400483,
        'q': '超值',
        'has_coupon': true,
        'need_free_shipment': true,
        'end_price': 10.0,
        'start_price': 5.0
      },
      success: function (res) {
        console.log(res);
        that.setData({ couponList: res.data.result_list.map_data });
      }
    });
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 复制淘口令
  setCouponInfo: function (event) {
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