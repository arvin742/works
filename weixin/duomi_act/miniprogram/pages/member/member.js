//member.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    memberImgUrl: '../../images/member-model.png',
  },

  onLoad: function() {
    var that = this;

    that.setData({
      userInfo: app.globalData.userInfo
    });
  },

})
