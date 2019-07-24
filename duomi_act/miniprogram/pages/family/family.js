//family.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    genderImg: [],
    familyInfo: [
      {
        nickName: '小明',
        gender: 1,
        age: '4岁7个月',
        familyImgUrl: '../../images/user-unlogin.png',
      },
      {
        nickName: '小红',
        gender: 0,
        age: '5岁3个月',
        familyImgUrl: '../../images/user-unlogin.png',
      },
    ],
  },

  onLoad: function() {
    var that = this;

    that.setData({
      userInfo: app.globalData.userInfo,
      genderImg: app.globalData.genderImg
    });
  },

})
