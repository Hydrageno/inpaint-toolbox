<template>
    <div class="tradition-inpaint">
        <div class="tradition-inpaint-description">
            <div class="tradition-inpaint-description-content">
                <div class="tradition-inpaint-description-text">
                    {{ front }}
                    <span class="tradition-inpaint-description-text-fluorescence">&nbsp;{{ object }}&nbsp;</span>&nbsp;,
                    <span class="tradition-inpaint-description-text-fluorescence">&nbsp;{{ people }}&nbsp;</span>&nbsp;,
                    <span class="tradition-inpaint-description-text-fluorescence">&nbsp;{{ scenery }}&nbsp;</span>&nbsp;,
                    <br>
                    <span class="tradition-inpaint-description-text-fluorescence">&nbsp;{{ animation }}&nbsp;</span>
                    {{ later }}
                    <br>
                    <span class="tradition-inpaint-description-sorry-text-fluorescence">{{ helpful }}</span>
                </div>
                <img  src="@/assets/demo.gif" class="tradition-inpaint-description-animation">
            </div>   
        </div>
        <div class="tradition-inpaint-upload-image">
            <upload-image></upload-image>
        </div>
        <div class="tradition-inpaint-use-case"></div>
    </div>
</template>

<script>
import UploadImage from "@/components/upload-can/UploadImage.vue"
export default{
    name: 'TraditionInpaint',
    components: {
        UploadImage
    },
    computed:{
        front(){
            return this.$t('homeview.traditionInpaint.descriptionText.front');
        },
        object(){
            return this.$t('homeview.traditionInpaint.descriptionText.object');
        },
        people(){
            return this.$t('homeview.traditionInpaint.descriptionText.people');
        },
        scenery(){
            return this.$t('homeview.traditionInpaint.descriptionText.scenery');
        },
        animation(){
            return this.$t('homeview.traditionInpaint.descriptionText.animation');
        },
        later(){
            return this.$t('homeview.traditionInpaint.descriptionText.later');
        },
        helpful(){
            return this.$t('homeview.traditionInpaint.descriptionText.helpful');
        },
    }
}
</script>

<style lang="less">
.tradition-inpaint{
    // let inner element flow by column.
    // 让内部元素按照竖向排序
    display: flex;
    flex-direction: column;
    // height = desciption-height + upload-iamge-height + use-case-height
    .tradition-inpaint-description{
        //background-color: green;
        flex:1;
        // let inner element center horizontal and vertical.
        // 让内部元素水平和垂直居中
        display: flex;
        justify-content: center;
        align-items: center; 
        .tradition-inpaint-description-content{
            // let inner element center horizontal and vertical.
            // 让内部元素水平和垂直居中
            display: flex;
            justify-content: center;
            align-items: center; 
            .tradition-inpaint-description-text{
                // set the style of font.
                // 设定字体大小和粗细程度
                font-weight: bolder;
                font-size: 1.75em;
                color: rgb(44,62,80);
                .tradition-inpaint-description-text-fluorescence{
                    // set the style of fluorescence text
                    // 设置荧光背景样式
                    background-color: rgba(189, 255, 1, 0.9);
                    box-shadow:0 2px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 10px;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                }
                .tradition-inpaint-description-sorry-text-fluorescence{
                    // set the style of fluorescence sorry text
                    // 设置”道歉“的荧光背景和字体颜色
                    background-color: rgba(201,212,229);
                    box-shadow:0 2px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 10px;
                    color: white;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                }
            }
            .tradition-inpaint-description-animation{
                // set the style of annimation
                // 设置演示动画的样式，包括边界、边界样式、背景阴影
                border-radius: 30px;
                border-style: none;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
                width: 25%;
            }   
        }
    }
    .tradition-inpaint-upload-image{
        background-color: yellow;
        flex: 2;

    }
    .tradition-inpaint-use-case{
        background-color: pink;
        flex: 2;
    }
}
</style>
