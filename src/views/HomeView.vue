<template>
  <div class="home">
    <div id="navigator">
      <!--navigator content, include different function anchor, and language select.-->
      <!--导航栏：包含不同功能区的锚点、语言选择。-->
      <!--center the #nvaigator-main.-->
      <!--导航栏分为主内容区、左右边块让内容区居中。-->
      <div id="navigator-leftborder"></div>
      <div id="navigator-main">
        <div id="navigator-main-traidtion-inpaint">
          <!--icon enrich content-->
          <el-icon>
            <View :size="iconSize"></View>
          </el-icon>
          <span class="navigator-text" @click="goAnchor('body-tradition-inpaint')">
            {{ traditionInpaintNavigatorMessage }}
          </span>
        </div>
        <div id="navigator-main-super-resolution">
          <el-icon>
            <ZoomIn :size="iconSize"></ZoomIn>
          </el-icon>
          <span class="navigator-text" @click="goAnchor('body-super-resolution')">
            {{ superResolutionNavigatorMessage }}
          </span>
        </div>
        <div id="navigator-main-removal-inpaint">
          <el-icon>
            <DeleteFilled :size="iconSize"></DeleteFilled>
          </el-icon>
          <span class="navigator-text" @click="goAnchor('body-removal-inpaint')">
            {{ removalInpaintNavigatorMessage }}
          </span>
        </div>
        <div id="navigator-main-segmentation-inpaint">
          <el-icon>
            <Grid :size="iconSize"></Grid>
          </el-icon>
          <span class="navigator-text" @click="goAnchor('body-segmentation-inpaint')">
            {{ segmentationInpaintNavigatorMessage }}
          </span>
        </div>
      </div>
      <div id="navigator-rightborder">
        <!--use switch to choose display language.-->
        <!--使用lan来控制展示的语言-->
        <el-switch v-model="lan" active-text="EN" inactive-text="ZH" size="large" @change="changeDisplayLan()"></el-switch>
      </div>
    </div>
    <div id="body">
      <!--main content: include traditional inpaint、super-resolution、removal、inpaint with segmentation.-->
      <!--主功能区：包含传统图像修复、超分辨率、去除信息、基于语义分割的指导性修复。-->
      <tradition-inpaint id="body-tradition-inpaint"></tradition-inpaint>
      <super-resolution id="body-super-resolution"></super-resolution>
      <removal-inpaint id="body-removal-inpaint"></removal-inpaint>
      <segmentation-inpaint id="body-segmentation-inpaint"></segmentation-inpaint>
    </div>
    <div id="footer">
      <!--thankful for sponsor.-->
      <!--使用的开源代码，诚挚感谢使用的开源项目开发者！-->
      <div id="thankful">
        Code Base on 
        <el-link href="https://github.com/lyndonzheng/TFill" type="info">TFill</el-link>,
        <el-link href="https://github.com/xinntao/Real-ESRGAN" type="info">Real-ESRGAN</el-link>,
        <el-link href="https://github.com/plemeri/InSPyReNet" type="info">InSPyReNet</el-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TraditionInpaint from '@/components/homeview-can/TraditionInpaint.vue';
import SuperResolution from '@/components/homeview-can/SuperResolution.vue';
import RemovalInpaint from '@/components/homeview-can/RemovalInpaint.vue';
import SegmentationInpaint from '@/components/homeview-can/SegmentationInpaint.vue';
import { View, ZoomIn, DeleteFilled, Grid } from '@element-plus/icons-vue'

export default {
  name: 'HomeView',
  components: {
    TraditionInpaint,
    SuperResolution,
    RemovalInpaint,
    SegmentationInpaint,
    View,
    ZoomIn,
    DeleteFilled,
    Grid
  },
  data(){
    return{
      // 1 represents zh, 0 represents en.
      // 默认1为中文，0为英文
      lan: 1, 
      iconSize: "large",
    }
  },
  methods:{
    goAnchor(id){
      /**
       * when user click the anchor character like 'TraditionInpaint', window scroll to the area.
       * 当用户点击对应的锚文字时候，会划到相应的区域。
       */
      // fetch the area by id.
      // 通过ID获得对应的元素。
      var anchor = document.getElementById(id);
      // perform the appropriate swipe action.
      // 执行相应的划动动作。
      window.scrollTo({
        top: anchor.offsetTop,
        behavior: "smooth"
      })
    },
    changeDisplayLan(){
      // if current lan is 1, means that current lan is zh, change to en.
      // 如果lan为1说明当前页面为中文，需要切换到英文。
      let newLan = (this.lan == 1) ? 'en' : 'zh';
      
      this.$i18n.locale = newLan;
      console.log(this.$i18n.locale);
    }
  },
  computed:{
    traditionInpaintNavigatorMessage(){
      // switch the content follow the value of 'language' attribute in i18n
      // 通过i18n中的language属性值来调整展示的内容，如果为zh则显示中文内容，否则显示英文内容
      return this.$t('navigatorText.traditionInpaintNavigatorText');
    },
    superResolutionNavigatorMessage(){
      return this.$t('navigatorText.superResolutionNavigatorText');
    },
    removalInpaintNavigatorMessage(){
      return this.$t('navigatorText.removalInpaintNavigatorText');
    },
    segmentationInpaintNavigatorMessage(){
      return this.$t('navigatorText.segmentationInpaintNavigatorText');
    },
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
  // 100 = navigator-height + body-height + footer-height, while navigator-height equals with footer-height.
  // 导航栏与页脚栏（致谢栏）占据同样高度，主体部分主要内容。
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
    background-color: rgba(255, 255, 255, 0.9); 
    // use the 'sticky' value to stick the #navigator while scrolling.
    // 通过粘滞定位，当滚动页面的时候导航栏和页面顶部相对静止。
    position: sticky;
    // the distance between #navigator and ceiling of explorer.
    // 开启定位后，确定导航栏和页面顶部间的间隔。
    top: 0px;
    // upgrade dimensions, different from #body and #footer.
    // 让导航栏升级维度，在滚动页面时候，导航栏会覆盖#body和#footer内容。
    z-index: 10;
    // let inner element flow by row direction.
    // 让内部元素通过行方向排列。
    display: flex;
    flex-direction: row;
    // navigator-width = navigator-border-width * 2 + navigator-main-width * 4;
    @navigator-border-width: 1;
    #navigator-leftborder{
      flex: @navigator-border-width;
      //background-color: pink;
    }
    #navigator-main{
      flex: 10 - 2 * @navigator-border-width;
      //background-color: yellowgreen;
      // let inner element flow by row direction.
      // 让内部元素通过行方向排列。
      display: flex;
      flex-direction: row;
      @function-width: 2.5;
      #navigator-main-traidtion-inpaint{
        flex: @function-width;
        // set the style of cursor.
        // 设置鼠标悬浮时候样式。
        cursor: pointer;
        // center the navigator-text
        // 让navigator-text水平和垂直居中
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(147,147,147);
        //background-color: blue;
        // set the style of navigator text.
        // 设置导航文字的样式。
        .navigator-text{
          font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          font-size: 4vh;
          // user can't select the text.
          // 通过none来阻止用户选中文字。
          user-select: none;
        }
      }
      #navigator-main-super-resolution{
        flex: @function-width;
        cursor: pointer;
        //background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(147,147,147);
        .navigator-text{
          font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          font-size: 4vh;
          user-select: none;
        }
      }
      #navigator-main-removal-inpaint{
        flex: @function-width;
        cursor: pointer;
        //background-color: green;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(147,147,147);
        .navigator-text{
          font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          font-size: 4vh;
          user-select: none;
        }
      }
      #navigator-main-segmentation-inpaint{
        flex: @function-width;
        cursor: pointer;
        //background-color: yellow;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(147,147,147);
        .navigator-text{
          font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          font-size: 4vh;
          user-select: none;
        }
      }
      #navigator-main-traidtion-inpaint:hover,#navigator-main-super-resolution:hover, #navigator-main-removal-inpaint:hover, #navigator-main-segmentation-inpaint:hover{
        // set the style when hover the #navigator-main-traidtion-inpaint
        // 当用户悬浮鼠标在文字上时候，改变文字颜色。
        color: black;
      }
    }
    #navigator-rightborder{
      flex: @navigator-border-width;
      //background-color: aqua;
      // center the el-switch both horizontal and vertical.
      // 让语言选择器水平和垂直居中。
      display: flex;
      justify-content: center;
      align-items: center;
    }
    // set the border-bottom style and width.
    // 为导航条设置底部样式方便区分。
    border-bottom-style: groove;
    border-bottom-width: 1px;
  }
  #body{
    // decide the percentage of navigator area.
    // 父元素使用flex布局，通过flex属性来声明占据高度。
    flex: @body-height;
    // initialize the color of background in developing period.
    // 前期开发时，使用不同颜色来占据位置确定基本布局。
    //background-color: green;
    // let inner element flow by column.
    // 让HomeView的#body中的功能区按照列排序。
    display: flex;
    flex-direction: column;
    // let four function the same height;
    // differentiate the function by differen color in developing period.
    // 让四个功能区高度相同（后期可以根据需求调整）。
    // 开发阶段按照不同的颜色区分不同的功能区，来调整布局。
    @function-height: 2.5;
    #body-tradition-inpaint{
      flex: @function-height;
      //background-color: blue;
    }
    #body-super-resolution{
      flex: @function-height;
      background-color: purple;
    }
    #body-removal-inpaint{
      flex: @function-height;
      background-color: yellow;
    }
    #body-segmentation-inpaint{
      flex: @function-height;
      background-color: red;
    }
  }
  #footer{
    // decide the percentage of navigator area.
    // 父元素使用flex布局，通过flex属性来声明占据高度。
    flex: @navigator-height;
    // initialize the color of background in developing period.
    // 前期开发时，使用不同颜色来占据位置确定基本布局。
    background-color: black;
    // center the el-switch both horizontal and vertical.
    // 让文字水平和垂直居中。
    display: flex;
    justify-content: center;
    align-items: center;
    #thankful{
      font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      font-size: 4vh;
      color: white;
      user-select: none;
      .el-link{
        font-size: 4vh;
        color: white;
        user-select: none;
      }
    }
  }
}
</style>