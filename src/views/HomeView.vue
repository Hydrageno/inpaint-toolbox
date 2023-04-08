<template>
  <div class="home">
    <div id="navigator">
      <!--navigator content, include different function anchor, and language select-->
      <!--导航栏：包含不同功能区的锚点、语言选择-->
    </div>
    <div id="body">
      <!--main content: include traditional inpaint、super-resolution、removal、inpaint with segmentation-->
      <!--主功能区：包含传统图像修复、超分辨率、去除信息、基于语义分割的指导性修复-->
    </div>
    <div id="footer">
      <!--thankful for sponsor-->
      <!--使用的开源代码，诚挚感谢使用的开源项目开发者！-->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {
    
  }
}
</script>


<style lang="less">
*{
  padding: 0;
  margin: 0;
}
.home{
  height: 5200px;
  // let inner element flow by column direction. 
  // 让内部元素按照竖向排序
  display: flex;
  flex-direction: column;
  // 100 = navigator-height + body-height + footer-height, while navigator-height equals with footer-height
  // 导航栏与页脚栏（致谢栏）占据同样高度，主体部分主要内容
  @navigator-height: 2;
  @body-height: 96;
  #navigator{
    // decide the percentage of navigator area.
    // 父元素使用flex布局，通过flex属性来声明占据高度。
    flex: @navigator-height;
    // when scroll the page, the navigator will hide the content.
    // 当滚动页面的使用，导航栏将覆盖对应的位置内容，使用白色塑造“烟雾”的效果。
    // initialize the color of background in developing period.
    // 前期开发时，使用不同颜色来占据位置确定基本布局。
    background-color: black;
    // use the 'sticky' value to stick the #navigator while scrolling.
    // 通过粘滞定位，当滚动页面的时候导航栏和页面顶部相对静止。
    position: sticky;
    // the distance between #navigator and ceiling of explorer.
    // 开启定位后，确定导航栏和页面顶部间的间隔。
    top: 0px;
    // upgrade dimensions, different from #body and #footer.
    // 让导航栏升级维度，在滚动页面时候，导航栏会覆盖#body和#footer内容。
    z-index: 10;
  }
  #body{
    // decide the percentage of navigator area.
    // 父元素使用flex布局，通过flex属性来声明占据高度。
    flex: @body-height;
    // initialize the color of background in developing period.
    // 前期开发时，使用不同颜色来占据位置确定基本布局。
    background-color: green;
  }
  #footer{
    // decide the percentage of navigator area.
    // 父元素使用flex布局，通过flex属性来声明占据高度。
    flex: @navigator-height;
    // initialize the color of background in developing period.
    // 前期开发时，使用不同颜色来占据位置确定基本布局。
    background-color: blue;
  }
}
</style>