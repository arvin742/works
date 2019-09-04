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

    //获取用户信息userInfo
    that.getUserInfo();

    that.setData({
      logoImgUrl: app.globalData.logoImgUrl,
    })
  },

  getUserInfo: function() {
    //获取用户信息userInfo
    wx.getUserInfo({
      success: function (res) {
        //用户已经授权过
        app.globalData.userInfo = res.userInfo;
        //获取openid
        wx.cloud.callFunction({
          name: 'getOpenid',
          complete: res => {
            app.globalData.userInfo.openid = res.result.openId;
          }
        })
      }
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
    let phone = e.detail.value.phone;
    let code = e.detail.value.code;
    // console.log(e.detail.value);

    if (!phone) {
      wx.showToast({
        title: '手机不能为空',
        icon: 'none',
        mask: true,
        duration: 1500
      })
      return false;
    }

    wx.showLoading({
      title: '加载中',
      mask: true,
    })

    //查询父母信息
    db.collection('dm_art_parents').where({
      phone: phone,
      status: 1,
    }).get({
      success: function (res) {
        if (res.data[0]) {
          wx.setStorageSync('userid', res.data[0]._id);
          wx.setStorageSync('user', res.data[0].phone);

          //查询孩子信息
          db.collection('dm_art_children').where({
            pid: res.data[0]._id,
            status: 1,
          }).get({
            success: function (res_c) {
              app.globalData.child_id = res_c.data[0]._id;
              console.log(typeof res_c.data[0]._id);

              //查询孩子课程信息
              db.collection('dm_art_parents').where({
                phone: phone,
                status: 1,
              }).get({
                success: function (res_cc) {
                  console.log(res_cc.data);
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              })
            }
          });
        } else {
          wx.showToast({
            title: '用户不存在',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        }
        // console.log(res.data)
      }
    })
    
  },

})
