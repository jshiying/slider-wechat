//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    team_curIndex: 2,  //当前显示的view下标
    team_prev:1,
    team_next:3,
   
    swiperList: [
      { 'person_src': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527324788361&di=a7760b6d3349b4d782df4d5c59b3ead3&imgtype=0&src=http%3A%2F%2Fimg03.tooopen.com%2Fuploadfile%2Fdowns%2Fimages%2F20110714%2Fsy_20110714135215645030.jpg', 'intro_src': 'http://img3.imgtn.bdimg.com/it/u=2358689708,1558820&fm=214&gp=0.jpg' },
      { 'person_src': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527324788349&di=70d17984c39bbd553bb95c504444ba51&imgtype=0&src=http%3A%2F%2Fpic36.nipic.com%2F20131213%2F6704106_223232205107_2.png', 'intro_src': 'http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=468315030324ab18f41be9745d938cb8/962bd40735fae6cd6f6c5b4405b30f2442a70f3e.jpg' },
      { 'person_src': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527324788360&di=c950b06bd7dd5f72a3290d5c898bb860&imgtype=0&src=http%3A%2F%2Fpic41.nipic.com%2F20140507%2F18602184_142854861000_2.jpg', 'intro_src': 'http://img3.imgtn.bdimg.com/it/u=2358689708,1558820&fm=214&gp=0.jpg' },
      { 'person_src': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527324788357&di=db45b1affb62ac9fabf70e119cdc150c&imgtype=0&src=http%3A%2F%2Fimg05.tooopen.com%2Fimages%2F20140328%2Fsy_57865838889.jpg', 'intro_src': 'http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=468315030324ab18f41be9745d938cb8/962bd40735fae6cd6f6c5b4405b30f2442a70f3e.jpg' },
      { 'person_src': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527324788351&di=a955634d047b94386264e07cc1918cae&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F13%2F68%2F11%2F35W58PICzbv_1024.jpg', 'intro_src': 'http://img3.imgtn.bdimg.com/it/u=2358689708,1558820&fm=214&gp=0.jpg' },
    ], //轮播数据列表

    itemWidth:416, //单个轮播图swiper-item的宽度；
    scale: 0.7,   //  缩放大小倍数；

    startClinetX: '', //触摸开始位置；
    startTimestamp: '', //触摸开始时间；

    translateDistance: 0,//动画移动的 距离；
    animationToLarge: {}, //从小变大的动画；
    animationToSmall: {},
  },

  //触摸开始的事件
  swiperTouchstart: function (e) {
    // console.log('touchstart',e);
    let startClinetX = e.changedTouches[0].clientX;
    this.setData({
      startClinetX: startClinetX, //触摸开始位置；
      startTimestamp: e.timeStamp, //触摸开始时间；
    })
  },
  //触摸结束事件
  swiperTouchend: function (e) {
    let times = e.timeStamp - this.data.startTimestamp, //时间间隔；
      distance = e.changedTouches[0].clientX - this.data.startClinetX; //距离间隔；
    //判断
    if (times < 500 && Math.abs(distance) > 10) {
      let team_curIndex = this.data.team_curIndex;
      let x0 = this.data.itemWidth*0.5, x1 = this.data.translateDistance, x = 0;
      if (distance > 0) {     //向右滑
        team_curIndex = team_curIndex - 1
        
        if (this.data.team_prev > -1){
          this.setData({
            team_prev: this.data.team_prev - 1,
            team_next: this.data.team_next - 1
          })
        } else if (this.data.team_prev <= -1) {
          this.data.team_next = 1
          this.data.team_prev = -1
        }
        
        console.log(this.data.team_prev, team_curIndex, this.data.team_next)
        if (team_curIndex < 0) {
          team_curIndex = 0;
          x0 = 0;
        }
        if (team_curIndex==0){
          x=315;
          console.log('偏移300')
        }else{
          x = x1 + x0;
        }
        
        console.log('向右滑之后：x=' + x+',x1='+x1)
      } else {           //向左滑
        if (this.data.team_prev < 3){
          this.setData({
            team_prev: this.data.team_prev + 1,
            team_next: this.data.team_next + 1
          })
        } else if (this.data.team_prev >= 3) {
          this.data.team_next = 5
          this.data.team_prev = 3
        }
        
        team_curIndex = team_curIndex + 1
        if (team_curIndex >= this.data.swiperList.length) {
          team_curIndex = this.data.swiperList.length - 1;
          x0 = 0;
        }
        if (team_curIndex==1){
          x = 208
        } else {
          x = x1 - x0;
        }  
            
        
        console.log('team_prev=' + this.data.team_prev + ',team_curIndex=' + team_curIndex + ',team_next=' + this.data.team_next)
        console.log('向左滑之后：x=' + x + ',x1=' + x1)
      }
      this.animationToLarge(team_curIndex, x);
      this.animationToSmall(team_curIndex, x);
      this.setData({
        team_curIndex: team_curIndex,
        translateDistance: x
      })

    } 
  },
  // 动画
  animationToLarge: function (team_curIndex, x) {

    this.animation.translateX(x).scale(1).step()
    this.setData({
      animationToLarge: this.animation.export()
    })
  },
  animationToSmall: function (team_curIndex, x) {

    this.animation.translateX(x).scale(0.7).step()
    this.setData({
      animationToSmall: this.animation.export()
    })
  },

  onLoad: function () {
    var that = this
    this.animation = wx.createAnimation({
      duration: 800,
      timingFunction: "ease-out",
      delay: 0
    })
    console.log(this.data.team_prev, this.data.team_curIndex, this.data.team_next)
  },


})
