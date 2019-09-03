//member.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    memberImgUrl: 'cloud://arvin-jxy520.6172-arvin-jxy520/member-model.jpg',
  },

  onLoad: function() {
    var that = this;

    that.setData({
      userInfo: app.globalData.userInfo
    });
  },

})
