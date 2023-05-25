<template>
    <div class="super-resolution">
        <!--create description area for super-resolution-->
        <!--为超分辨率创建描述区-->
        <div class="super-resolution-description">
            <div class="super-resolution-description-content">
                <img src="@/assets/sr_animation.gif" class="super-resolution-description-animation">
                <!--add description text for super-resolution-->
                <!--为超分辨率添加描述性文字-->
                <div class="super-resolution-description-text">
                    <span class="super-resolution-description-text-fluorescence">&nbsp;{{ superResolve }}&nbsp;</span><br>
                    <span>{{ withWantedPic }}</span><br>
                    <span>{{ customScale }}</span>
                    <span class="super-resolution-description-text-fluorescence">&nbsp;{{ scaleSequence }}&nbsp;</span>
                </div>
            </div>
        </div>
        <div class="super-resolution-upload-image">
            <!--pass egImageAddrs by component communication-->
            <!--使用组件通信给egImageAddrs赋值-->
            <upload-image :egImageAddrs="egImageSRAddrs" :viewType="viewType"></upload-image>
        </div>
        <div class="super-resolution-use-case">
            <div class="super-resolution-use-case-content">
                <!--title for super resolution-->
                <!--为超分辨率添加标题-->
                <div class="super-resolution-use-case-title">
                    <h1> {{ useCase }}</h1>
                </div>
                <!--lesson picture for super resolution-->
                <!--为超分辨率添加教程图片-->
                <div class="super-resolution-use-case-picture">
                    <img src="@/assets/sr_usecase.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UploadImage from "@/components/upload-can/UploadImage.vue";
export default{
    name: 'SuperResolution',
    components: {
        UploadImage
    },
    data(){
        return {
            egImageSRAddrs: ["https://i.imgtg.com/2023/05/25/OaVwIM.jpg",
            "https://i.imgtg.com/2023/05/25/OaYOFG.png"],
            viewType: "SR"
        }
    },
    computed:{
        superResolve(){
            // switch the content follow the value of 'language' attribute in i18n.
            // 通过i18n中的language属性值来调整展示的内容，如果为zh则显示中文内容，否则显示英文内容。
            return this.$t('homeview.superResolution.descriptionText.superResolve')
        },
        withWantedPic(){
            return this.$t('homeview.superResolution.descriptionText.withWantedPic')
        },
        customScale(){
            return this.$t('homeview.superResolution.descriptionText.customScale')
        },
        scaleSequence(){
            return this.$t('homeview.superResolution.descriptionText.scaleSequence')
        },
        useCase(){
            return this.$t('homeview.superResolution.useCase')
        }
    }
}
</script>

<style lang="less">
.super-resolution{
    // let inner element flow by column.
    // 让内部元素按照竖向排序。
    display: flex;
    flex-direction: column;
    // height = desciption-height + upload-iamge-height + use-case-height.
    .super-resolution-description{
        background-color: rgb(243,244,246);
        flex: 1;
        // let inner element center horizontal and vertical.
        // 让内部元素水平和垂直居中。
        display: flex;
        justify-content: center;
        align-items: center; 
        .super-resolution-description-content{
            // let inner element center horizontal and vertical.
            // 让内部元素水平和垂直居中。
            display: flex;
            justify-content: center;
            align-items: center; 
            .super-resolution-description-animation{
                // set the style of animation.
                // 设置演示动画的样式，包括边界、边界样式、背景阴影。
                border-radius: 30px;
                border-style: none;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
                width: 20%;
            }
            .super-resolution-description-text{
                // set the style of font.
                // 设置字体大小和粗细程度。
                font-weight: bolder;
                font-size: 1.75em;
                color: rgb(44, 62, 80);
                // align the text inside the super-resolution-description-text div to the right.
                // 让内部的字靠在最右边。
                text-align: right;
                // create distance between text and picture.
                // 文字和图片间保持一定间距
                margin-left: 10px;
                .super-resolution-description-text-fluorescence{
                    // set the style of fluorescence text
                    // 设置荧光背景样式
                    background-color: rgba(189, 255, 1, 0.9);
                    box-shadow:0 2px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 10px;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                }
            }
        }
    }
    .super-resolution-upload-image{
        //background-color: green;
        flex: 2;
    }
    .super-resolution-use-case{
        //background-color: rgb(133,204,248);
        flex: 2;
        .super-resolution-use-case-content{
            height: 100%;
            // let inner element flow by row.
            // 让内部元素按照行排序
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .super-resolution-use-case-title{
                flex: 1;
                h1{
                    // set the wrting-mode
                    // 设置书写的方式
                    writing-mode: vertical-lr;
                    font-family:'Times New Roman', Times, serif;
                    // make the title and picture closer
                    // 让标题和图片更靠近
                    position: relative;
                    left: 99%;
                }
            }
            .super-resolution-use-case-picture{
                flex: 4;
                // let inner element center horizontal and vertical.
                // 让内部元素水平和垂直居中
                display: flex;
                justify-content: center;
                img{
                    width: 50%;
                    // make the title and picture closer
                    // 让标题和图片更靠近
                    position: relative;
                    right: 10%;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
                }
            }
        }
    }
}
</style>
