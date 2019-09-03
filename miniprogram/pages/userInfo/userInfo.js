//userInfo.js
const app = getApp()

Page({
  data: {
    userInfo: {},
  },


  onLoad: function () {
    var that = this;

    that.setData({
      genderImg: app.globalData.genderImg,
      userInfo: app.globalData.userInfo,
    });

    console.log(that.data.userInfo);
  },

  goMember: function() {
    wx.navigateTo({
      url: '../member/member',
    })
  },

  goFamily: function () {
    wx.navigateTo({
      url: '../family/family',
    })
  },

  goMyCourse: function () {
    wx.navigateTo({
      url: '../mycourse/mycourse',
    })
  },

  signOut: function () {
    wx.showModal({
      title: '提示',
      content: '确定退出该账号吗？',
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync();  //删除用户登录信息
          wx.reLaunch({
            url: '../login/login'
          })
        }
      }
    })
  },

})
