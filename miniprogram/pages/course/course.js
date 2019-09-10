//course.js
const app = getApp()

Page({
  data: {
    courseInfo: ''
  },

  onLoad: function () {
    let that = this;
    that.setData({
      logoImgUrl: app.globalData.logoImgUrl,
    })

    this.courseInfo();
    console.log(that.data)
  },

  courseInfo: function () {
    let that = this;

    let courseInfo = {
      title: '《宇宙星球》',
      type: '文化感知',
      imgurl: 'cloud://arvin-jxy520.6172-arvin-jxy520-1258223218/course_model.jpeg',
      major: '初步认识与了解宇宙空间，认识星球，知道地球是人类居住的星球',
      content: '1、星球运用散点式构图均匀分布在画面上；\n2、如何借助媒介制作画面立体效果；\n3、了解各星球对应的颜色与大小'
    }

    that.setData({
      courseInfo: courseInfo
    });
  },

})
