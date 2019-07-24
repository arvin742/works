//mycourse.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    genderImg: [],
    courseInfo: [
      {
        title: '创意故事绘',
        className: '启蒙A班',
        lessonInfo: {
          now: 2,
          sum: 8,
          title: '油画基础',
          date: '2019/06/06 18:00-19:00',
          time: '1课时',
        },
        kidName: '小明',
        kidGender: 1,
      },
      {
        title: '童话故事',
        className: '启蒙B班',
        lessonInfo: {
          now: 2,
          sum: 8,
          title: '户外写生',
          date: '2019/06/06 18:00-19:00',
          time: '1课时',
        },
        kidName: '小红',
        kidGender: 0,
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
