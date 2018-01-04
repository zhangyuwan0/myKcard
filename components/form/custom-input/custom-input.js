// components/form/custom-input/custom-input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shownLabel : {
      type : Boolean,
      value : false,
      observer : function() {
        console.log("shownLabel is" + this.properties.shownLabel)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
