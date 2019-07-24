//community.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    circleData: '',
  },

  onLoad: function() {
    let that = this;

    that.setData({
      userInfo: app.globalData.userInfo
    });

    console.log(that.data);

    that.getCircleData();
  },

  getCircleData: function () {
    let that = this;

    let dataList = [
      {
        userImgUrl: that.data.userInfo.avatarUrl,
        userName: that.data.userInfo.nickName,
        userContent: '温暖是黑夜中的一盏指路明灯，让迷失方向的人走向光明；温暖是雪地里的一个火堆，让寒冷的人们感到扑面的热气；温暖是沙漠中稀有的一滴水，让口干舌燥的人感到甘甜。',
        userImagesWidth: wx.getSystemInfoSync().windowWidth / 4,
        userImages: [
          'http://img2.imgtn.bdimg.com/it/u=2118739199,3378602431&fm=27&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=2277942808,1417432970&fm=27&gp=0.jpg',
          'http://img5.imgtn.bdimg.com/it/u=1504812505,3480403568&fm=27&gp=0.jpg',
          'http://img4.imgtn.bdimg.com/it/u=3456219059,4251129897&fm=27&gp=0.jpg',
          'http://img3.imgtn.bdimg.com/it/u=3912316188,1981132393&fm=27&gp=0.jpg',
        ],
        userAddress: '广东省 · 广州市',
        date: '2天前',
        actLovePoint: false,
        isLovePoint: false,
        userLove: ['Chris', 'Jade', 'Gail', 'Vicky', 'Amber', 'Irene', 'Roberta', 'Hedy'],
        userComment: [
          {
            name: 'Chris',
            content: '愿所有的后会有期，都是他日的别来无恙。',
          },
          {
            name: 'Gail',
            content: '总有某段路，只能你一个人走;总有许多事，需要你一个人扛。',
          },
          {
            name: 'Amber',
            content: '付出的时候，都说自己是心甘情愿，但没有得到回报的时候，还是会忍不住计较。',
          },
          {
            name: 'Roberta',
            content: '接受突如其来的失去，珍惜不期而遇的惊喜。',
          },
        ],
      },
      {
        userImgUrl: that.data.userInfo.avatarUrl,
        userName: that.data.userInfo.nickName,
        userContent: '温暖是黑夜中的一盏指路明灯，让迷失方向的人走向光明；温暖是雪地里的一个火堆，让寒冷的人们感到扑面的热气；温暖是沙漠中稀有的一滴水，让口干舌燥的人感到甘甜。',
        userImagesWidth: wx.getSystemInfoSync().windowWidth / 4,
        userImages: [
          'http://img2.imgtn.bdimg.com/it/u=2118739199,3378602431&fm=27&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=2277942808,1417432970&fm=27&gp=0.jpg',
          'http://img5.imgtn.bdimg.com/it/u=1504812505,3480403568&fm=27&gp=0.jpg',
          'http://img4.imgtn.bdimg.com/it/u=3456219059,4251129897&fm=27&gp=0.jpg',
          'http://img3.imgtn.bdimg.com/it/u=3912316188,1981132393&fm=27&gp=0.jpg',
        ],
        userAddress: '广东省 · 广州市',
        date: '2天前',
        actLovePoint: false,
        isLovePoint: false,
        userLove: ['Chris', 'Jade', 'Gail', 'Vicky', 'Amber', 'Irene', 'Roberta', 'Hedy'],
        userComment: [
          {
            name: 'Chris',
            content: '愿所有的后会有期，都是他日的别来无恙。',
          },
          {
            name: 'Gail',
            content: '总有某段路，只能你一个人走;总有许多事，需要你一个人扛。',
          },
          {
            name: 'Amber',
            content: '付出的时候，都说自己是心甘情愿，但没有得到回报的时候，还是会忍不住计较。',
          },
          {
            name: 'Roberta',
            content: '接受突如其来的失去，珍惜不期而遇的惊喜。',
          },
        ],
      },
    ];

    that.setData({
      circleData: dataList
    });
  },

  lookImage: function (e) {
    let index = e.currentTarget.dataset.index;

    wx.previewImage({
      current: e.currentTarget.dataset.imageUrl,
      urls: this.data.circleData[index].userImages,
    })
  },

  actLovePoint: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let actLovePoint = 'circleData[' + e.currentTarget.dataset.index + '].actLovePoint';
    
    that.setData({
      [actLovePoint]: !that.data.circleData[index].actLovePoint,
    });
  },

  lovePoint: function (e) {
    let that = this;
  },

  commentPoint: function (e) {
    let that = this;
  },

})
