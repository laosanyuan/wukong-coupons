var Bmob = require('utils/bmob.js');
Bmob.initialize("39292288dd43892f5501fe09cd80449f", "546fc8409c5bc8e367922a9453f756f1");

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud1-7gff63ayf073f5b9',
        traceUser: true,
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
