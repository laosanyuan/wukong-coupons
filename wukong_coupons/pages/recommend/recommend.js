// pages/recommend/recommend.wxml.js
var Bmob = require('../../utils/bmob.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
    showResult: true,
    page_no: 1,
    isVerify: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.isInited) {
      this.setData({ isVerify: app.globalData.isVerify });
      if (!that.data.isVerify) {
        that.get_goods_list();
      }
    } else {
      app.initedCallBack = verify => {
        this.setData({ isVerify: app.globalData.isVerify });
        if (!verify) {
          that.get_goods_list();
        }
      }
    }

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
  get_goods_list: async function () {
    var that = this;
    wx.showLoading({
      title: '特卖收集中',
    });
    await wx.request({
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
        that.setData({ couponList: that.data.couponList.concat(res.data.result_list.map_data) });
        that.data.page_no++;
      },
      complete: function () {
        wx.hideLoading();
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
            });
          }
        });
      }
    });
  }
})