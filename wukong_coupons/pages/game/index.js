//index.js
const util = require('../../utils/util.js')


var end; 
var ssd;
Page({
  data: {
    logs: [],
    button:"开始",
    endButton:"停止",
    sty:"什么",
    dateText:'早上',
    datas:[],
    switchs:false,
    content:"面包 蛋糕 荷包蛋 烧饼 饽饽 肉夹馍 油条 馄饨 火腿 面条 小笼包 玉米粥 肉包 煎饼果子 饺子 煎蛋 烧卖 生煎 锅贴 包子 酸奶 苹果 梨 香蕉 皮蛋瘦肉粥 蛋挞 南瓜粥 煎饼 玉米糊 泡面 粥 馒头 燕麦片 水煮蛋 米粉 豆浆 牛奶 花卷 豆腐脑 煎饼果子 小米粥 黑米糕 鸡蛋饼 牛奶布丁 水果沙拉 鸡蛋羹 南瓜馅饼 鸡蛋灌饼 奶香小馒头 汉堡包 披萨 八宝粥 三明治 蛋包饭 豆沙红薯饼 驴肉火烧 粥 粢饭糕 蒸饺 白粥"
  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
    this.Date()
  },
  Date:function(){
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    console.log(time)
    if (0 <= time && time<11 )
    {
      this.setData({
        dateText: "早饭"
      }); 
    }
    if (11 <= time && time < 17) {
      this.setData({
        dateText: "午饭"
      });
    }
    if (17 <= time && time < 21) {
      this.setData({
        dateText: "晚饭"
      });
    }
    if (21 <= time && time < 23) {
      this.setData({
        dateText: "夜宵"
      });
    } 
  },
  // 自定义的开始按钮
  startBtn: function () {
    var content = this.data.content.split(" ");
    this.setData({
      switchs: true
    })
    this.startn(content);
    //隐藏消失
    this.endDatas();
  },
  startn:function(content)
  {
    var that = this;
    end = setTimeout(function () {
      var s = content[Math.floor(Math.random() * content.length)]
      var datas = that.data.datas
      datas.push({
        "name":s,
        "x":Math.floor(Math.random() * 350),
        "y": Math.floor(Math.random() * 600),
        "size": Math.floor(Math.random() * 40),
        "opacity": Math.floor(Math.random()*2)
      })
      that.setData({
        sty: s
      })
      that.startn(content);
    }, 20)
  },
  // 自定义的暂停按钮  
  endBtn: function () {
    this.setData({
      switchs: false,
    })
    clearTimeout(end);
    //20秒后关闭
    setTimeout(function () {
      clearTimeout(ssd);
    }, 2000)
  },
  //定时清除数组
  endDatas:function(){
    var that = this
    ssd = setTimeout(function () {
      var datas = that.data.datas
      var cdata = []
      for (var sd = 0; sd < datas.length; sd++) {
        var opacity = datas[sd].opacity - 0.01
        if(opacity<0){
          //console.log(opacity)
        }else{
          cdata.unshift({
            "name": datas[sd].name,
            "x": datas[sd].x,
            "y": datas[sd].y,
            "size": datas[sd].size,
            "opacity": opacity
          })
        } 
      }
      that.setData({
        datas: cdata
      })
      that.endDatas();
    }, 40)
  }
})