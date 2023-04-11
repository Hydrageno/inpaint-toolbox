<template>
    <div class="super-resolution-view">
        <!--navigator for current view-->
        <!--当前页面的导航栏-->
        <div class="super-resolution-view-navigator">
            <div class="back-main" @click="backMain">
                <h1>←{{ backHome }}</h1>
            </div>
        </div>
        <!--container for canvas-->
        <!--画布的容器-->
        <div class="super-resolution-view-content" ref="superResolutionViewContent">
            <canvas class="super-resolution-view-canvas" ref="superResolutionInpaintCanvas"
                @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"></canvas>
        </div>
        <!--toolbar for canvas-->
        <!--画布的工具栏-->
        <div class="super-resolution-view-toolbar">
            <div class="mode-select">
                <!--INPAINT MODE SELECTOR-->
                <!--修复模式选择器-->
                <el-select v-model="modeValue" :placeholder="selectMode">
                    <el-option v-for="mode in modeOptions" :key="mode.value" :label="mode.label" :value="mode.value"></el-option>
                </el-select>
            </div>     
            <div class="submit-painted">
                <el-button size="small" @click="submitPainted" :disabled="submitLocked">
                    <h2>{{ submit }}</h2>
                </el-button>
            </div>
            <div class="download-result">
                <el-button size="small" @click="downloadResult" :disabled="downloadLocked">
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
//import 'default-passive-events'

export default{
    name: 'SuperResolutionView',
    components:{
        EditPen,
    },
    data(){
        return {
            imageTIURL: store.state.imageURL,
            context: null,
            scale: 1,
            translateX: 0,
            translateY: 0,
            modeValue: ref(''),
            // aims to prevent user from clicking the button.
            // 在服务器处理数据期间阻止用户点击按钮。
            submitLocked: false,
            downloadLocked: true,
        }
    },
    methods:{
        backMain:function(){
            // return home.
            // 返回主页面。
            this.$router.push({path: '/'});
        },
        handleZoom(event){
            const traditionInpaintViewContent = this.$refs.traditionInpaintViewContent;
            // set zoom factor
            // 设置缩放因子
            const scaleDelta = event.deltaY > 0 ? 0.9 : 1.1; 
            const { clientX, clientY } = event;
            const boundingRect = traditionInpaintViewContent.getBoundingClientRect();
            const x = clientX - boundingRect.left;
            const y = clientY - boundingRect.top;
            // update scale value
            // 更新缩放因子
            this.scale *= scaleDelta; 
            // update x-axis translation value
            // 更新translateX值
            this.translateX = (1 - scaleDelta) * x + this.translateX; 
            // update y-axis translation value
            // 更新translateY值
            this.translateY = (1 - scaleDelta) * y + this.translateY; 
            traditionInpaintViewContent.style.transform = `scale(${this.scale}) translate3d(${this.translateX}px, ${this.translateY}px, 0)`;
        },

        downloadResult:function(){
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://127.0.0.1:5000/download-inpaint');
            // set response type.
            // 设定返回类型。
            xhr.responseType = 'blob'
            let replacer = this;
            replacer.submitLocked = true;
            replacer.downloadLocked = true;
            xhr.onload = function(){
                if(xhr.status === 200 && xhr.readyState === 4){
                    console.log("download-inpaint connection build");
                    let response = xhr.response;
                    let blob = response;
                    let inpaintImageURL = URL.createObjectURL(blob);
                    // create a tag & download it.
                    // 创造a节点并且下载。
                    const a = document.createElement('a');
                    a.href = inpaintImageURL;
                    a.style.display = 'none';
                    a.download = 'inpaintedImage.png'
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    replacer.submitLocked = false;
                    replacer.downloadLocked = false;
                }
            }
            xhr.send();
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
        // set the background image.
        // 设置背景图片。
        this.$refs.traditionInpaintViewContent.style.backgroundImage = `url(${this.imageTIURL})`
        // set height and width for canvas.
        // 为画布设置高度和宽度。
        this.$refs.traditionInpaintCanvas.height = store.state.imageHeight;
        this.$refs.traditionInpaintCanvas.width = store.state.imageWidth;

        // add wheel zoom event.
        // 添加鼠标滚轮缩放事件。
        const traditionInpaintViewContent = this.$refs.traditionInpaintViewContent;
        traditionInpaintViewContent.addEventListener('wheel', this.handleZoom);

        // draw the background for canvas.
        // 为画布画图。
        const traditionInpaintCanvas = this.$refs.traditionInpaintCanvas;
        const ctx = traditionInpaintCanvas.getContext('2d');

        // set style of line.
        // 设置线条之间的样式。
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
.super-resolution-view{
    height: 100vh;
    .super-resolution-view-navigator{
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
    .super-resolution-view-content{
        transform-origin: left top;
        margin: 0 auto;
        width: fit-content;
    }
    .super-resolution-view-toolbar{
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
            .el-button{
                background-color: rgb(244,245,247);
            }
        }
        .download-result{
            //background-color: pink;
            flex: 1;
            // make inner element center horizontal.
            // 让内部元素水平居中。
            display: flex;
            justify-content: center;
            .el-button{
                background-color: rgb(244,245,247);
            }
        }
    }
}
</style>