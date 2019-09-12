//index.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    year: 0,
    month: 0,
    week: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isActive: -1,
    isTodayWeek: false,
    todayIndex: 0,
    nowStarus: [],
  },

  onLoad: function() {
    var that = this;

    //初始化加载，先判断用户登录状态
    if (app.isReady()) {
      app.isReady()
    } else {
      app.isReadyCallback = () => {
        app.isReady()
      }
    }
    
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let today = '' + year + (month > 9 ? month : '0' + month) + (now.getDate() > 9 ? now.getDate() : '0' + now.getDate());
    this.setData({
      userInfo: app.globalData.userInfo,
      genderImg: app.globalData.genderImg,
      year: year,
      month: month,
      isToday: today,
      isActive: today,
    });
    
    this.dateInit();
    this.courseInfoInit();

    // console.log(that.data);
  },

  /**
   * 获取当月课程信息
   */
  courseTableInit: function(){
    let that = this;

    let now = new Date();
    let firstDay = app.formatNumber('' + that.data.year + '/' + that.data.month + '/' + '01' + ' 00:00:00');
    let lastDay = app.formatNumber('' + that.data.year + '/' + that.data.month + '/' + (new Date(that.data.year, that.data.month, 0).getDate()) + ' 24:00:00');
    let formatDate, table = [];
    // console.log(firstDay, lastDay);

    //查询孩子课程信息
    return new Promise(function (resolve, reject) {
      db.collection('dm_art_child_course').where({
        child_id: app.globalData.child_id,
        status: 1,
      }).get({
        success: function (res) {
          // console.log(res.data);
          db.collection('dm_art_course_season').where({
            _id: res.data[0].course_season_id,
          }).get({
            success: function (res_c) {
              let n = 0;
              for (let i = 0; i < res_c.data[0].date.length; i++) {
                if (res_c.data[0].date[i] >= firstDay && res_c.data[0].date[i] < lastDay) {
                  let ojb = {}
                  if (res.data[0].course_info[i] == 2) {
                    ojb.title = '假'; ojb.status = 's2';
                  } else if (res.data[0].course_info[i] == 1) {
                    ojb.title = '签'; ojb.status = 's1';
                  } else {
                    ojb.title = '课'; ojb.status = 's0';
                  }
                  formatDate = app.formatTime(res_c.data[0].date[i]);
                  ojb.date = '' + formatDate.year + formatDate.month + formatDate.day;
                  table[n] = ojb;
                  n++;
                }
              }
              resolve(table);
              // console.log(table);
            },
            fail: () => {
              reject("系统异常，请重试！")
            }
          })
        }
      })
    })
  },
  /**
   * 获取选择日期课程信息
   */
  courseInfoInit: function (date) {
    let that = this;
    let now = new Date();
    let reDate = date ? app.formatNumber(date) : (Date.parse(now) / 1000);
    let kidName = '', kidGender = 0;
    let info = '';
    // console.log(reDate)

    if (!app.globalData.child_id) return false;
    //查询孩子课程详细信息
    db.collection('dm_art_children').where({
      _id: app.globalData.child_id,
      status: 1,
    }).get({
      success: function (res) {
        // console.log(res.data);
        db.collection('dm_art_child_course').where({
          child_id: res.data[0]._id,
          status: 1,
        }).get({
          success: function (res_c) {
            // console.log(res.data);
            db.collection('dm_art_course').where({
              course_group_id: res_c.data[0].course_group_id,
            }).get({
              success: function (res_cc) {
                for (let i = 0; i < res_cc.data.length; i++) {
                  if (reDate < res_cc.data[i].date) {
                    info = res_cc.data[i];
                    break;
                  }
                }
                let formatDate = app.formatTime(info.date);
                info.date = '' + formatDate.year + '/' + formatDate.month + '/' + formatDate.day + ' 19:30-21:00';
                info.kidName = res.data[0].nickname;
                info.kidGender = res.data[0].gender;
                info.className = res.data[0].classname;
                console.log(info);
                // that.setData({
                //   courseInfo: info
                // });
              }
            })
          }
        })
      }
    })

    // info = [
    //   {
    //     title: '文化感知',
    //     className: '启蒙A班',
    //     lessonInfo: {
    //       time: 1,
    //       title: '宇宙星球',
    //       date: '2019/07/17 18:00-19:00',
    //       status: 0,
    //       statusColor: 'black',
    //       statusName: '未上课',
    //     },
    //     kidName: '小明',
    //     kidGender: 1,
    //   },
    //   {
    //     title: '文化感知',
    //     className: '启蒙B班',
    //     lessonInfo: {
    //       time: 1,
    //       title: '蒙德里安的格子——蜘蛛网',
    //       date: '2019/07/17 18:00-19:00',
    //       status: 1,
    //       statusColor: 'green',
    //       statusName: '已签到',
    //     },
    //     kidName: '小红',
    //     kidGender: 2,
    //   },
    //   {
    //     title: '色彩感知',
    //     className: '启蒙C班',
    //     lessonInfo: {
    //       time: 1,
    //       title: '色彩与情感表达',
    //       date: '2019/07/17 18:00-19:00',
    //       status: 2,
    //       statusColor: 'red',
    //       statusName: '已请假',
    //     },
    //     kidName: '小明',
    //     kidGender: 1,
    //   },
    // ];

    // that.setData({
    //   courseInfo: info
    // });
  },

  dateInit: function (setYear, setMonth) {
    let that = this;
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];                                                       //需要遍历的日历数组数据
    let arrLen = 0;                                                         //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();                                 //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay();  //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();                   //获取目标月有多少天
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        num = num > 9 ? ('' + num) : ('0' + num);
        let monthStr = (month + 1) > 9 ? ('' + (month + 1)) : ('0' + (month + 1));
        let today = '' + year + monthStr + num;

        obj = {
          isToday: today,
          dateNum: num,
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    // console.log(dateArr);
    this.setData({
      dateArr: dateArr,
    })

    // 小标课程日期
    this.courseTableInit().then((res) => {
      // console.log(res)
      this.setData({
        courseTable: res
      });
      // console.log(res)
    }).catch((res) => {
      console.log(res)
    });
    
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  /**
   * 上月切换
   */
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1),
    })
    this.dateInit(year, month);
  },
  /**
   * 下月切换
   */
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1),
    })
    this.dateInit(year, month);
  },

  /**
   * 选择日期查看课程
   */
  actCourse: function (e) {
    if (!e.currentTarget.dataset.datenum) return false;
    
    let that = this;
    let year = e.currentTarget.dataset.year;
    let month = e.currentTarget.dataset.month;
    let day = e.currentTarget.dataset.datenum;

    month = month > 9 ? month : '0' + month;

    let date = year + '/' + month + '/' + day;
    let info = [
      {
        title: '文化感知',
        className: '启蒙A班',
        lessonInfo: {
          time: 1,
          title: '宇宙星球',
          date: '2019/07/17 18:00-19:00',
          status: 0,
          statusColor: 'green',
          statusName: '未上课',
        },
        kidName: '小明',
        kidGender: 1,
      },
    ];

    //选择日期
    that.setData({
      isActive: '' + year + month + day,
      courseInfo: info,
    });

    console.log(date);
  },

  //查看课程详细信息
  goCourseInfo: function () {
    wx.navigateTo({
      url: '../course/course',
    })
  },
})
