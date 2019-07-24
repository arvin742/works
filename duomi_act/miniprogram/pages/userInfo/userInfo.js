//userInfo.js
const app = getApp()

Page({
  data: {
    userInfo: {
      avatarUrl: '../../images/user-unlogin.png'
    },
    genderImg: [],
  },


  onLoad: function () {
    var that = this;

    that.setData({
      userInfo: app.globalData.userInfo,
      genderImg: app.globalData.genderImg
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

})
