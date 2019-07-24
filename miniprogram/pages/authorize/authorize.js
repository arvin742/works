//authorize.js
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),  //判断小程序的API，回调，参数，组件等是否在当前版本可用
  },

  onLoad: function () {
    let that = this;
    that.setData({
      logoImgUrl: app.globalData.logoImgUrl,
    })
  },

  getUserInfo: function (e) {
    let that = this;
    // console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      app.globalData.userInfo = e.detail.userInfo;

      wx.reLaunch({
        url: '../login/login',
      })
    } else {
      //用户按了拒绝按钮
    }
  },

})
