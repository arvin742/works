//family.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    userInfo: {},
    genderImg: [],
    // familyInfo: [
    //   {
    //     nickName: '小明',
    //     gender: 1,
    //     age: '4岁7个月',
    //     familyImgUrl: '../../images/user-unlogin.png',
    //   },
    //   {
    //     nickName: '小红',
    //     gender: 2,
    //     age: '5岁3个月',
    //     familyImgUrl: '../../images/user-unlogin.png',
    //   },
    // ],
  },

  onLoad: function() {
    var that = this;

    that.setData({
      userInfo: app.globalData.userInfo,
      genderImg: app.globalData.genderImg
    });

    that.autoData();
  },

  autoData: function() {
    var that = this;

    let userid = wx.getStorageSync('userid');
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;

    db.collection('dm_art_children').where({
      pid: userid,
      status: 1,
    }).get({
      success: function (res) {
        if (res.data[0]) {
          for (let i = 0; i < res.data.length; i++){
            if (month < res.data[i].birthmonth){
              month = month + 12;
              year = year - 1;
            }
            let reMonth = month - res.data[i].birthmonth;
            let reYear = year - res.data[i].birthyear;
            res.data[i].age = reYear + '岁' + reMonth + '个月';
          }
          that.setData({
            familyInfo: res.data
          })
          // console.log(res.data);
        }
        // console.log(res.data.length);
      }
    })
  }

})
