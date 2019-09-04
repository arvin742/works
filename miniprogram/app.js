//app.js
App({

  globalData: {
    signOutTime: '',
    logoImgUrl: 'cloud://arvin-jxy520.6172-arvin-jxy520-1258223218/my-image.png',
    userImg: 'cloud://arvin-jxy520.6172-arvin-jxy520-1258223218/user-unlogin.png',
    userInfo: null,
    genderImg: ['', 'cloud://arvin-jxy520.6172-arvin-jxy520-1258223218/gender-1.png', 'cloud://arvin-jxy520.6172-arvin-jxy520-1258223218/gender-0.png'],
  },

  onLaunch: function () {
    let that = this;

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    
  },

  //判断用户是否授权和登录
  isReady: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
    })

    // 查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //初始化加载，先判断用户登录状态
          if (!wx.getStorageSync('user')) {
            wx.reLaunch({
              url: '../login/login'
            })
          } else {
            wx.hideLoading();
          }
        } else {
          wx.reLaunch({
            url: '../authorize/authorize'
          })
        }

        return true;

        if (this.isReadyCallback) {
          this.isReadyCallback();
        }
      }
    })
  },

  onShow: function() {
    var that = this;
    if (!wx.clearStorageSync()){
      clearTimeout(that.globalData.signOutTime);
      console.log(that.globalData.signOutTime);
    }
  },

  onHide: function() {
    var that = this;
    that.globalData.signOutTime = setTimeout(function(){
      wx.showModal({
        title: '提示',
        content: '太长时间没有连接，请重新登录',
        success(res) {
          console.log('退出登录');
          wx.clearStorageSync();  //删除用户登录信息
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      })
    }, 300000)
  },
})
