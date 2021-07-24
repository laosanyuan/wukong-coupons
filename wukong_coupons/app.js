var Bmob = require('utils/bmob.js');
Bmob.initialize("39292288dd43892f5501fe09cd80449f", "546fc8409c5bc8e367922a9453f756f1");

App({
  onLaunch: function () {
    let verify_data = Bmob.Object.extend("verify");
    let verify_query = new Bmob.Query(verify_data);
    verify_query.first({
      success: result => {
        this.globalData.isVerify = result.get("is_verify");
        this.globalData.isInited = true;
        if(this.initedCallBack){
          this.initedCallBack(this.globalData.isVerify);
        }
      }
    });

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud1-7gff63ayf073f5b9',
        traceUser: true,
      });
    };
  },

  globalData: {
    isInited:false,   // 是否初始化完成
    isVerify: false   // 是否处于审核阶段
  }
})
