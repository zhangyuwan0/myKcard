// components/loading/send-loading.js
const DEFAULT_SIZE = '15px'
const DEFAULT_ANIMATION_TIME = 1.2
const DEFAULT_ITEM_COUNT = 8
const DEFAULT_ITEM_WIDTH_PRECENT = 1.0 / 5.0

class ItemFrame {
  constructor(itemCount, index, itemWidth, size, sumAnimationTime) {
    // 计算每次需要转动的角度
    let offsetRad = (2.0 * Math.PI / 360) * (360 / itemCount) // 转换成弧度
    // 计算所处坐标
    this.itemX = size / 2.0 * Math.sin(offsetRad) - itemWidth * 0.5
    this.itemY = size / 2.0 * Math.cos(offsetRad)
    // 计算当前偏移角度
    this.offsetAngle = 360 / itemCount * index
    // 计算当前帧所处时间
    this.showingTime = sumAnimationTime / itemCount * index
  }

  /**
   * 计算item大小
   * item的面积和默认占组件半径的1/5^2 * PI的大小
   * @param size 组件大小
   * @param itemCount 组件大小
   * @param innerCricleRadius 空出的内圆半径
   * @return list[0]:itemWidth
   *         list[1]:itemHeight
   */
  getItemSize(size, itemCount, innerCricleRadius) {
    let radius = size / 2.0
    let itemHeight = size / 2.0 - innerCricleRadius
    let itemWidth = size / 2.0 / DEFAULT_ITEM_WIDTH_PRECENT * Math.cos(_angle2Rad(360 / itemCount))
    return [itemWidth, itemHeight]
  }

  getOffsetAngle

  _angle2Rad(angle) {
    return angle * (Math.PI / 180)
  }
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 组件大小
    size: {
      type: String,
      value: DEFAULT_SIZE
    },
    // 菊花瓣颜色
    loadingItemColor: {
      type: String,
      value: 'grey' /*加载item的默认颜色为grey */
    },
    // 组件边距
    margin: {
      type: String,
      value: '10px'
    },
    // 菊花花瓣数量
    itemCount: {
      type: Number,
      value: 4
    },
    // 中间空出圆的半径
    innerCricleRadius: {
      type: Number
    },
    // item转动一圈所需时长
    animationTime: {
      type: Number
    }
  },
  data: {
    itemCount: 8 /*item个数*/,
    itemWidth: 0 /*item宽度*/,
    itemHeight: 0 /*item高度*/,
    itemColor: "grey" /*item颜色*/,
    margin: "2px" /*组件margin*/,
    frameList: [] /*ItmeFrame list */
  },
  created: function () {
    console.log("created")
  },
  attached: function () {
    console.log("attached")
    this.setData({
      itemCount: this.properties.itemCount
    })
  },
  ready: function () {
    console.log("ready")
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getOffsetAngle: function (itemCount) {
      return 360.0 / itemCount;
    }

  }
})
