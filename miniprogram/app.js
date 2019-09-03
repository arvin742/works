//app.js
App({

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

  isAuto: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
    })

    // 查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //用户已经授权过
              that.globalData.userInfo = res.userInfo;

              wx.reLaunch({
                url: '../login/login'
              })

            }
          })
        } else {
          wx.reLaunch({
            url: '../authorize/authorize'
          })
        }

        return true;

        if (this.isAutoCallback) {
          this.isAutoCallback();
        }
      }
    })
    
  },

  globalData: {
    logoImgUrl: 'cloud://arvin-jxy520.6172-arvin-jxy520-1258223218/my-image.png',
    userImg: 'cloud://arvin-jxy520.6172-arvin-jxy520-1258223218/user-unlogin.png',
    userInfo: null,
    genderImg: ['', 'cloud://arvin-jxy520.6172-arvin-jxy520-1258223218/gender-1.png', 'cloud://arvin-jxy520.6172-arvin-jxy520-1258223218/gender-0.png'],
  },
})
