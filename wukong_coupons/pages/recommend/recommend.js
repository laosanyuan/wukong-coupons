// pages/recommend/recommend.wxml.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList:[],
    showResult:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://o.yiqifa.com/servlet/interface?method=yiqifa.product.nonelink.list.get',
      data:{
        'app_key':'G07CO2S2R7',
        'app_secret':'106d211c9ed35054d4f3',
        'path':1,
        'isPostFree':1,
        'status':0,
        'IsCoupon':1,
        'encoding':'UTF-8',
        'mobilePrice':'0,10.0'
      },
      success:function(e){
        console.log(e);
      },
      fail:function(e){
        console.log(e);
      },
      complete:function(res){
        console.log(res);
        that.setData({couponList:res.data.result.data});
      }
    })
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

  setCouponInfo: function(){

  }
})