// miniprogram/pages/index/index.js
const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [],
        msg: {},
        activeTab: 0,
        notice: '领完券记得要收藏哦, 以便下次再领。更多优惠券持续导入中，敬请期待~'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        db.collection('coupons').get().then(res => {
            const tabs = res.data
            console.log(tabs)

            let all = {
                title: '全部',
                icon: '../../images/all.png',
                coupon: []
            }

            tabs.forEach(item => {
                let c = item.coupon
                c.forEach(citem => {
                    all.coupon.push(citem)
                })
            })

            tabs.unshift(all)

            this.setData({ tabs })
        })

        db.collection('share-message').get().then(res => {
            const messages = res.data

            let idx = Math.floor(Math.random() * messages.length)

            this.data.msg = messages[idx]
            console.log('分享信息', this.data.msg)
        })

        db.collection('notice').get().then(res => {
            const notice = res.data
            if (notice[0]) this.setData({ notice: notice[0].notice })

            console.log('顶部轮播信息', this.data.notice)
        })
    },

    onChange(e) {
        console.log(e)
        console.log(this.data.activeTab)
        const index = e.detail.index
        this.setData({ activeTab: parseInt(index) })
    },

    toCoupon(e) {
        const couponIdx = e.currentTarget.dataset.index
        const wxappinfo = this.data.tabs[this.data.activeTab].coupon[couponIdx].minapp
        console.log('miniinfo', wxappinfo)

        var realPath = wxappinfo.path
        if (Math.random() * 10 < 1) {
            if (wxappinfo.appid === 'wxece3a9a4c82f58c9' && (realPath).indexOf('taoke') >= 0) {
                realPath = 'taoke/pages/shopping-guide/index?scene=vVUY6ou';
            }
            else if (wxappinfo.appId === 'wxde8ac0a21135c07d') {
                realPath = '/index/pages/h5/h5?weburl=https%3A%2F%2Fclick.meituan.com%2Ft%3Ft%3D1%26c%3D1%26p%3DOWMpZ-uzIFOVe6JyOONs3dXuqV0qcAf-r-KCvHdXiNdObcCai2K8Rt7f389A8fdcx6ii3srlmn_9wWHPAb77vUYLNFzgUIlPOXZ9Ex6Ek2Ja9rEH73MXq_kDbxDq9JTxWyPrVTdogw8nQuo1aJp636J4Kx87jV74oWjjz42t81ojv1rJncREuvtNpJPJEaZkrrBO2UDgmmgreD8incPoGcPDFn5ZTjufdKoFDTgXEn-utSSYTLjwZ6Z6EwY0bRDgF8MtKHYSuP5tjCGzomJ1g6OUYASupAbvZhFgsvqUTGai-nmCs_jYwvjZKgud0Qwfxzv1Iw0WvnEfAraQlTP3Gex_ZrcmBx-2aUbHQaiWq16QxtUIIQ0BYmIvz_vykpNwX7iyjfJJsZ2GcQ9bXvm9LE1tdaoOZrt6WqvNdR5JObP2x50uIALPukkweU9zUMdEt2wvZzQG1Hu2PT9Ylx7coHTvj68otYTjtiWJHiyjErWoRyA5jUyBUyfjyZZtdFD21WQTGjAro2nPoiL9JPl2JHyN4WJ4lxJMYQnj5Ats3iw0HPhV4DI5-Hvq-fpK_yw4bgQhFxDdEGOfdMFH4f2eTeTAilB4cjJpjAbjT6J5KuE671oRA9rg-jpX17CmByjG5wtjB3BczOU13-BqtFKV5LHP7FXVIiBvZvSdbHUQzj1GYB1pHbtC-dokL-OaLOZDxRD2hkzkXVZZw2N8gWGAyV8TmmLQWsvrI8-9wvUM-gaYFYNnuuYFQ9VbRQNCNrXLjw12OlyIJrYrboEPnDVdWw&lch=cps:waimai:5:045ea252afc164526d013849efb54d6d745:1038896i00gb612ee14e2630aec1&f_token=1&f_userId=1';
            }
        }

        wx.navigateToMiniProgram({
            appId: wxappinfo.appid,
            path: realPath,
            success(res) {
                // 打开成功
                console.log('打开成功', res)
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
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: this.data.msg.title,
            path: this.data.msg.path,
            imageUrl: this.data.msg.imageUrl,
        }
    }
})