//index.js
const app = getApp()

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
  },

  onLoad: function() {
    var that = this;

    // wx.clearStorageSync();  //删除用户登录信息
    //初始化加载，先判断用户登录状态
    if (!wx.getStorageSync('user')) {
      if (app.isAuto()) {
        app.isAuto()
      } else {
        app.isAutoCallback = () => {
          app.isAuto()
        }
      }
    } else{
      wx.getUserInfo({
        success: function (res) {
          //用户已经授权过
          app.globalData.userInfo = res.userInfo;
        }
      })
    }

    that.setData({
      userInfo: app.globalData.userInfo,
      genderImg: app.globalData.genderImg
    });
    
    this.courseTableInit();
    this.courseInfoInit();

    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let today = '' + year + (month > 9 ? month : '0' + month) + (now.getDate() > 9 ? now.getDate() : '0' + now.getDate());
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: today,
      isActive: today,
    });

    // console.log(that.data);
  },

  /**
   * 获取当月课程信息
   */
  courseTableInit: function(date){
    let that = this;
    date = date ? date : '';
    let table = '';

    table = [
      {
        title: '签',
        date: '20190703',
        status: 's1',
      },
      {
        title: '假',
        date: '20190705',
        status: 's2',
      },
      {
        title: '课',
        date: '20190716',
        status: 's0',
      },
      {
        title: '课',
        date: '20190728',
        status: 's0',
      }
    ];

    that.setData({
      courseTable: table
    });
  },
  /**
   * 获取选择日期课程信息
   */
  courseInfoInit: function (date) {
    let that = this;
    date = date ? date : '';
    let info = '';

    info = [
      {
        title: '文化感知',
        className: '启蒙A班',
        lessonInfo: {
          time: 1,
          title: '宇宙星球',
          date: '2019/07/17 18:00-19:00',
          status: 0,
          statusColor: 'black',
          statusName: '未上课',
        },
        kidName: '小明',
        kidGender: 1,
      },
      {
        title: '文化感知',
        className: '启蒙B班',
        lessonInfo: {
          time: 1,
          title: '蒙德里安的格子——蜘蛛网',
          date: '2019/07/17 18:00-19:00',
          status: 1,
          statusColor: 'green',
          statusName: '已签到',
        },
        kidName: '小红',
        kidGender: 2,
      },
      {
        title: '色彩感知',
        className: '启蒙C班',
        lessonInfo: {
          time: 1,
          title: '色彩与情感表达',
          date: '2019/07/17 18:00-19:00',
          status: 2,
          statusColor: 'red',
          statusName: '已请假',
        },
        kidName: '小明',
        kidGender: 1,
      },
    ];

    that.setData({
      courseInfo: info
    });
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
        let monthStr = (month + 1) > 9 ? ('' + month + 1) : ('0' + (month + 1));
        let today = '' + year + monthStr + num;
        let isCourseTableStatus = '';

        //把课程状态放在对应的日期
        for (let j = 0; j < that.data.courseTable.length; j++){
          isCourseTableStatus = '';
          if (that.data.courseTable[j].date == today){
            isCourseTableStatus = that.data.courseTable[j];
            break;
          }
        }

        obj = {
          isToday: today,
          dateNum: num,
          isCourseTable: isCourseTableStatus,
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr,
    })
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
})
