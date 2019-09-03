//course.js
const app = getApp()

Page({
  data: {
  },

  onLoad: function () {
    let that = this;
    that.setData({
      logoImgUrl: app.globalData.logoImgUrl,
    })
  },

})
