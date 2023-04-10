<template>
    <div class="tradition-inpaint-view">
        <!--navigator for current view-->
        <!--当前页面的导航栏-->
        <div class="tradition-inpaint-view-navigator">
            <div class="back-main" @click="backMain">
                <h1>←{{ backHome }}</h1>
            </div>
        </div>
        <!--container for canvas-->
        <!--画布的容器-->
        <div class="tradition-inpaint-view-content" ref="traditionInpaintViewContent">
            <canvas class="tradition-inpaint-view-canvas" ref="inpaintCanvas"></canvas>
        </div>
        <!--toolbar for canvas-->
        <!--画布的工具栏-->
        <div class="tradition-inpaint-view-toolbar">
            <div class="custom-thickness">
                <!--Pen for canvas-->
                <!--画布的笔-->
                <el-icon :size="20"><EditPen /></el-icon>
                <h3>{{ penThickness }}</h3>
                <!--number type limit & range limit-->
                <!--限制输入类型只能为数字并且限制范围-->
                <el-input-number v-model="lineWidth" :min="0" :max="100" />
                <h3>&nbsp;&nbsp;px</h3>
            </div> 
            <div class="turn-erase">
                <!--Eraser for canvas-->
                <!--画布的橡皮擦-->
                <el-switch v-model="eraseOn" inline-prompt :active-text="eraseText" :inactive-text="penText" size="large"></el-switch>
            </div>
            <div class="mode-select">
                <!--INPAINT MODE SELECTOR-->
                <!--修复模式选择器-->
                <el-select v-model="modeValue" :placeholder="selectMode">
                    <el-option v-for="mode in modeOptions" :key="mode.value" :label="mode.label" :value="mode.value"></el-option>
                </el-select>
            </div>     
            <div class="submit-painted">
                <el-button size="mini">
                    <h2>{{ submit }}</h2>
                </el-button>
            </div>
            <div class="download-result">
                <el-button size="mini">
                    <h2>{{ download }}</h2>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { EditPen } from '@element-plus/icons-vue'
import { ref } from 'vue'
import store from '@/store'
export default{
    name: 'TraditionInpaintView',
    components:{
        EditPen,
    },
    data(){
        return {
            imageTIURL: store.state.imageURL,
            lineWidth: 0,
            eraseOn: false,
            modeValue: ref(''),
        }
    },
    methods:{
        backMain:function(){
            // return home
            // 返回主页面
            this.$router.push({path: '/'});
        },
    },
    computed:{
        backHome(){
            // switch the content follow the value of 'language' attribute in i18n.
            // 通过i18n中的language属性值来调整展示的内容，如果为zh则显示中文内容，否则显示英文内容。
            return this.$t('traditionInpaintView.navigatorText.backHome')
        },
        penThickness(){
            return this.$t('traditionInpaintView.toolBar.penThickness')
        },
        eraseText(){
            return this.$t('traditionInpaintView.toolBar.eraseText')
        },
        penText(){
            return this.$t('traditionInpaintView.toolBar.penText')
        },
        selectMode(){
            return this.$t('traditionInpaintView.toolBar.selectMode')
        },
        celehq(){
            return this.$t('traditionInpaintView.toolBar.celehq')
        },
        places(){
            return this.$t('traditionInpaintView.toolBar.places')
        },
        imageNet(){
            return this.$t('traditionInpaintView.toolBar.imageNet')
        },
        animation(){
            return this.$t('traditionInpaintView.toolBar.animation')
        },
        submit(){
            return this.$t('traditionInpaintView.toolBar.submit')
        },
        download(){
            return this.$t('traditionInpaintView.toolBar.download')
        },
        modeOptions(){
            return [
                {
                    value: 1,
                    label: this.celehq,
                },
                {
                    value: 2,
                    label: this.places,
                },
                {
                    value: 3,
                    label: this.imageNet,
                },
                {
                    value: 4,
                    label: this.animation,
                }
            ]
        }
    },
    mounted(){
    this.$refs.inpaintViewContent.style.backgroundImage = `url(${this.imageTIURL})`
    this.$refs.inpaintCanvas.height = store.state.imageHeight;
    this.$refs.inpaintCanvas.width = store.state.imageWidth;

    // add wheel zoom event
    const inpaintViewContent = this.$refs.inpaintViewContent;
    inpaintViewContent.addEventListener('wheel', this.handleZoom);

    // draw the background for canvas
    const inpaintCanvas = this.$refs.inpaintCanvas;
    const ctx = inpaintCanvas.getContext('2d');

    // set context to content of picture
    this.context = ctx;
    this.context.lineJoin = 'round';
    this.context.lineCap = 'round';
  }
}
</script>

<style lang="less">
*{
    user-select: none;
}
h3{
    display: inline;
}
.tradition-inpaint-view{
    height: 100vh;
    .tradition-inpaint-view-navigator{
        // make the navigator fix to its location.
        // 让导航栏与网页保持相对距离
        position: fixed;
        .back-main{
            cursor: pointer;
            width: 35vh;
            background-color: rgba(189,255,1, 0.9);
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .25);
            border-radius: 10px;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            position: relative;
            // let inner element center just horizontal.
            // 让内部元素只水平居中。
            display: flex;
            justify-content: center;
        }
    }
    .tradition-inpaint-view-content{
        transform-origin: left top;
        margin: 0 auto;
        width: fit-content;
    }
    .tradition-inpaint-view-toolbar{
        height: 2.0em;
        width: 52rem;
        position: fixed;
        overflow: hidden;
        // the distance between toolbar and bottom.
        // 工具栏和底部的距离。
        bottom: 0.5rem;
        // make the toolbar center horizontal.
        // 让工具栏水平居中。
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgb(255, 255, 255);
        border-width: 2px;
        border-color: rgb(190, 189, 189);
        border-style: double;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        border-radius: 1rem;
        // dimensionalization in z-direction.
        // Z轴升维
        z-index: 5;
        // make inner element center vertical.
        // 让内部元素垂直居中。
        display: flex;
        align-items: center;
        .custom-thickness{
            //background-color: red;
            flex: 3;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            // make inner element center both horizontal and vertical.
            // 让内部元素水平、垂直居中。
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .turn-erase{
            //background-color: green;
            // make inner element center horizontal.
            // 让内部元素水平居中。
            display: flex;
            justify-content: center;
            .el-switch{
                span{
                    // set the font color.
                    // 设置字体颜色
                    color:black;
                }
            }
            flex: 1;
        }
        .mode-select{
            //background-color: black;
            flex: 2;
            // make inner element center horizontal.
            // 让内部元素水平居中。
            display: flex;
            justify-content: center;

        }
        .submit-painted{
            //background-color: yellow;
            flex: 0.85;
            // make inner element center horizontal.
            // 让内部元素水平居中。
            display: flex;
            justify-content: center;
        }
        .download-result{
            //background-color: pink;
            flex: 1;
            // make inner element center horizontal.
            // 让内部元素水平居中。
            display: flex;
            justify-content: center;
        }
    }
}
</style>
