// components/loading/send-loading.js
const DEFAULT_WIDTH = 2
const DEFAULT_HEIGHT = 5
const DEFAULT_ANIMATION_TIME = 1.2
const DEFAULT_ITEM_COUNT = 8
const DEFAULT_INNER_CRICLE_RADIUS = 2

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 组件大小
    itemHeight: {
      type: Number,
      value: DEFAULT_HEIGHT
    },
    itemWidth: {
      type: Number,
      value: DEFAULT_WIDTH
    },
    // 菊花瓣颜色
    loadingItemColor: {
      type: String,
      value: 'grey' /*加载item的默认颜色为grey */
    },
    // 菊花花瓣数量
    itemCount: {
      type: Number,
      value: 8
    },
    // 中间空出圆的半径
    innerCircleRadius: {
      type: Number,
      value: DEFAULT_INNER_CRICLE_RADIUS
    },
    // item转动一圈所需时长
    animationTime: {
      type: Number,
      value: 1.2
    }
  },
  data: {
    itemStyleList: [] /*item样式list*/,
    containerStyle: "" /*container样式*/
  },
  attached: function () {
    let styleList = []
    // 根据参数计算item样式
    for (let index = 0; index < this.properties.itemCount; index++) {
      // 样式模板
      let styleTemplet = "top: {itemTop}px;left: {itemLeft}px;transform: rotate({itemAngle}deg);animation: line-spin-fade-loader {sumAnimationTime}s {itemShowingTime}s infinite ease-in-out;background-color: {itemColor};animation-fill-mode: both;position: absolute;width: {itemWidth}px;height: {itemHeight}px;"
      // 计算当前item所应偏移角度
      let curAngle = 360 / this.properties.itemCount * index
      // 计算当前item对应正常坐标系中的弧度
      let curRad = this._getRealRad(curAngle)
      // 根据参数格式化样式
      styleList.push(styleTemplet.format({
        // 偏移要加上itemHeight 给左侧 上方腾出位置
        // 相当于给坐标系平移itemHeight
        itemTop: this._getRealXY((this.properties.innerCircleRadius + this.properties.itemHeight) * Math.sin(curRad)),
        // -itemWidth * 0.5 是在计算item X轴上的偏移
        itemLeft: this._getRealXY((this.properties.innerCircleRadius + this.properties.itemHeight) * Math.cos(curRad)),
        itemAngle: curAngle,
        sumAnimationTime: this.properties.animationTime,
        itemShowingTime: this.properties.animationTime / this.properties.itemCount * index,
        itemColor: "gray",
        itemWidth: this.properties.itemWidth,
        itemHeight: this.properties.itemHeight
      }))
    }
    console.log(styleList)
    // 组件的宽高 -- (item宽度 + 内圆半径) * 2
    let containerWidth = (this.properties.itemHeight + this.properties.innerCircleRadius) * 2
    // 更新界面
    this.setData({
      itemStyleList: styleList,
      containerStyle: "width:{0}px;height:{0}px".format(containerWidth)
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _angle2Rad: function (angle) {
      return angle * (Math.PI / 180)
    },
    _getRealRad(angle) {
      // 因为CSS3 角度为正时是顺时针旋转 0°在正常坐标系的270°上
      // 所以要做转换才能获取到正确的弧度值
      return this._angle2Rad(angle + 270)
    },
    _getRealXY: function (xOrY) {
      return this.properties.itemHeight + this.properties.innerCircleRadius + xOrY
    }
  }

})
