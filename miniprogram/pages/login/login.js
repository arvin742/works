//login.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    codeBtn:{
      title: '获取验证码',
      disabled: false,
    },
  },

  onLoad: function () {
    let that = this;

    that.setData({
      logoImgUrl: app.globalData.logoImgUrl,
    })
  },

  getCode: function () {
    let that = this;
    let time = 60;
    let codeTitle = 'codeBtn.title';
    let codeDisabled = 'codeBtn.disabled';

    that.setData({
      [codeDisabled]: true,
      [codeTitle]: time + ' s',
    });

    let codeTime = setInterval(function(){
      time--;

      if (time == 0) {
        clearInterval(codeTime);
        that.setData({
          [codeTitle]: '获取验证码',
          [codeDisabled]: false,
        });
        return false;
      }

      that.setData({
        [codeTitle]: time + ' s',
      });
    }, 1000);
  },

  loginSubmit: function (e) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })

    let phone = e.detail.value.phone;
    let code = e.detail.value.code;
    // console.log(e.detail.value);

    db.collection('dm_art_parents').where({
      phone: phone,
      status: 1,
    }).get({
      success: function (res) {
        if (res.data[0]) {
          wx.setStorageSync('userid', res.data[0]._id);
          wx.setStorageSync('user', res.data[0].phone);
          wx.switchTab({
            url: '../index/index',
          })
        } else {
          wx.showToast({
            title: '用户不存在',
            icon: 'none',
            mask: true,
            duration: 2000
          })
        }
        // console.log(res.data)
      }
    })
    
  },

})
