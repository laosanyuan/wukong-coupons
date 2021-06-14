const db = wx.cloud.database()
var Bmob = require('../../utils/bmob.js');
// var app = getApp();

Page({
    data: {
        tabs: [],
        activeTab: 0,
        notice: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        // 优惠券信息
        const tabs =[];
        let coupon_data = Bmob.Object.extend("coupon_type");
        let coupon_query = new Bmob.Query(coupon_data);
        await coupon_query.find({
             success: results => {
                results.forEach( item =>{
                    let coupon = {
                        title: item.get('title'),
                        icon: item.get('icon'),
                        id: item.id,
                        coupon: []
                    };
                    tabs.push(coupon);
                });
            }
        });
        for(let i = 0;i<tabs.length;i++){
            let item_data = Bmob.Object.extend('coupons');
            let item_query = new Bmob.Query(item_data);
            item_query.equalTo('type_id',tabs[i].id);
            await item_query.find({
                success:(cou_items) =>{
                    cou_items.forEach(cou_item => {
                        let info = {
                            bannerPic:cou_item.get('banner_pic'),
                            icon:cou_item.get('icon'),
                            appid:cou_item.get('app_id'),
                            appPath:cou_item.get('app_path'),
                            name:cou_item.get('name'),
                            type:cou_item.get('type')
                        };
                        tabs[i].coupon.push(info);
                    });
                }
            });
        }

        let all = {
            title: '全部',
            icon: '../../images/all.png',
            coupon: []
        };
        tabs.forEach(item => {
            let c = item.coupon;
            c.forEach(citem => {
                all.coupon.push(citem);
            })
        });
        tabs.unshift(all);
        this.setData({tabs:tabs});

        // 滚动欢迎标语
        let notice_data = Bmob.Object.extend("notice");
        let notice_query = new Bmob.Query(notice_data);
        notice_query.find({
            success: (results) => {
                let idx = Math.floor(Math.random() * results.length);
                this.setData({notice:results[idx].get('notice')});
            }
        });
    },
    
    onChange(e) {
        console.log(e)
        console.log(this.data.activeTab)
        const index = e.detail.index
        this.setData({ activeTab: parseInt(index) })
    },

    toCoupon(e) {
        const couponIdx = e.currentTarget.dataset.index;

        wx.navigateToMiniProgram({
            appId: this.data.tabs[this.data.activeTab].coupon[couponIdx].appid,
            path: this.data.tabs[this.data.activeTab].coupon[couponIdx].appPath,
            success(res) {
                // 打开成功
                console.log('打开成功', res);
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
    onShareAppMessage: async function (res) {
        let share_data = Bmob.Object.extend("share_message");
        let share_query = new Bmob.Query(share_data);
        let msg;
        await share_query.find({
            success: (results) => {
                let idx = Math.floor(Math.random() * results.length);
                msg = {
                    'title': results[idx].get('title'),
                    'path': results[idx].get('path'),
                    'imageUrl': results[idx].get('img_url')
                };
            }
        });
        return msg;
    }
})