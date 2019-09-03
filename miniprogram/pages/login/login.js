//login.js
const app = getApp()

Page({
  data: {
    logoImgUrl: '../../images/logo.png',
    codeBtn:{
      title: '获取验证码',
      disabled: false,
    },
    userInfo: {},
    user: {},
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
    let phone = '15766227543';
    let code = '7543';
    console.log(e.detail.value);

    if (e.detail.value.phone == phone) {
      wx.setStorageSync('user', 'admin');
      wx.switchTab({
        url: '../index/index',
      })
    } else{
      wx.showToast({
        title: '用户不存在',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    }
    
  },

})
