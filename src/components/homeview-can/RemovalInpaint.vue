<template>
    <div class="removal-inpaint">
        <!--create description area for removal-inpaint-->
        <!--为去除水印创建描述区-->
        <div class="removal-inpaint-description">
            <div class="removal-inpaint-description-content">
                <!--add description text for removal-inpaint-->
                <!--为超分辨率添加描述性文字-->
                <div class="removal-inpaint-description-text">
                    <span>{{ picHave }}&nbsp;</span>
                    <span class="removal-inpaint-description-text-fluorescence">&nbsp;{{ waterMark }}&nbsp;</span>
                    <span>&nbsp;{{ questionMark }}</span><br>
                    <span>{{ picHave }}&nbsp;</span>
                    <span class="removal-inpaint-description-text-fluorescence">&nbsp;{{ stains }}&nbsp;</span>
                    <span>&nbsp;{{ questionMark }}</span><br>
                    <span>{{ tryTool }}&nbsp;</span>
                    <span class="removal-inpaint-description-text-fluorescence">&nbsp;{{ deWaterMarkStains }}&nbsp;</span>
                    <span>&nbsp;{{ endTool }}</span>
                </div>
                <img src="@/assets/demo.gif" class="removal-inpaint-description-animation">
            </div>
        </div>
        <div class="removal-inpaint-upload-image">
            <!--pass egImageAddrs by component communication-->
            <!--使用组件通信给egImageAddrs赋值-->
            <upload-image :egImageAddrs="egImageRIAddrs"></upload-image>
        </div>
        <div class="removal-inpaint-use-case"></div>
    </div>
</template>

<script>
import UploadImage from "@/components/upload-can/UploadImage.vue";
export default{
    name: 'RemovalInpaint',
    components: {
        UploadImage
    },
    data(){
        return {
            egImageRIAddrs: ["https://i.328888.xyz/2023/03/15/J5vEN.png",
            "https://i.328888.xyz/2023/03/15/J5vEN.png"]
        }
    },
    computed:{
        picHave(){
            // switch the content follow the value of 'language' attribute in i18n.
            // 通过i18n中的language属性值来调整展示的内容，如果为zh则显示中文内容，否则显示英文内容。
            return this.$t('homeview.removalInpaint.descriptionText.picHave') 
        },
        waterMark(){
            return this.$t('homeview.removalInpaint.descriptionText.waterMark') 
        },
        stains(){
            return this.$t('homeview.removalInpaint.descriptionText.stains') 
        },
        questionMark(){
            return this.$t('homeview.removalInpaint.descriptionText.questionMark')
        },
        tryTool(){
            return this.$t('homeview.removalInpaint.descriptionText.tryTool')
        },
        deWaterMarkStains(){
            return this.$t('homeview.removalInpaint.descriptionText.deWaterMarkStains')
        },
        endTool(){
            return this.$t('homeview.removalInpaint.descriptionText.endTool')
        }
    }
}
</script>

<style lang="less">
.removal-inpaint{
    // let inner element flow by column.
    // 让内部元素按照竖向排序。
    display: flex;
    flex-direction: column;
    // height = desciption-height + upload-iamge-height + use-case-height.
    .removal-inpaint-description{
        background-color: rgb(215, 243, 255);
        flex: 1;
        // let inner element center horizontal and vertical.
        // 让内部元素水平和垂直居中。
        display: flex;
        justify-content: center;
        align-items: center;
        .removal-inpaint-description-content{
            // let inner element center horizontal and vertical.
            // 让内部元素水平和垂直居中。
            display: flex;
            justify-content: center;
            align-items: center; 
            .removal-inpaint-description-text{
                // set the style of font.
                // 设置字体大小和粗细程度。
                font-weight: bolder;
                font-size: 1.75em;
                color: rgb(44, 62, 80);
                // align the text inside the super-resolution-description-text div to the right.
                // 让内部的字靠在最右边。
                text-align: left;
                // create distance between text and picture.
                // 文字和图片间保持一定间距
                margin-right: 10px;
                .removal-inpaint-description-text-fluorescence{
                    // set the style of fluorescence text
                    // 设置荧光背景样式
                    background-color: rgba(189, 255, 1, 0.9);
                    box-shadow:0 2px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 10px;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                }
            }
            .removal-inpaint-description-animation{
                // set the style of animation.
                // 设置演示动画的样式，包括边界、边界样式、背景阴影。
                border-radius: 30px;
                border-style: none;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
                width: 25%;
            }
        }
    }
    .removal-inpaint-upload-image{
        background-color: rgb(215, 243, 255);
        flex: 2;
    }
    .removal-inpaint-use-case{
        //background-color: green;
        flex: 2;
    }
}
</style>
