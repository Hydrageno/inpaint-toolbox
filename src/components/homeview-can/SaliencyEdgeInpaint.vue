<template>
    <div class="saliency-edge-inpaint">
        <!--create description area for saliency-edge-inpaint-->
        <!--为显著性目标边缘检测创建描述区-->
        <div class="saliency-edge-inpaint-description">
            <div class="saliency-edge-inpaint-description-content">
                <img src="@/assets/demo.gif" class="saliency-edge-inpaint-description-animation">
                <!--add description text for saliency-edge-inpaint-->
                <!--为显著性目标边缘检测添加描述性文字-->
                <div class="saliency-edge-inpaint-description-text">
                    <span class="saliency-edge-inpaint-description-text-fluorescence">&nbsp;{{ saliencyEdge }}&nbsp;</span>
                    <span>{{ damage }}</span><br>
                    <span>{{ or }}</span>
                    <span class="saliency-edge-inpaint-description-text-fluorescence">&nbsp;{{ saliencyObject }}&nbsp;</span><br>
                    <span>{{ tryTool }}</span>
                </div>
            </div>
        </div>
        <div class="saliency-edge-inpaint-upload-image"></div>
        <div class="saliency-edge-inpaint-use-case"></div>
    </div>
</template>

<script>
export default{
    name: 'SaliencyEdgeInpaint',
    computed:{
        saliencyEdge(){
            // switch the content follow the value of 'language' attribute in i18n.
            // 通过i18n中的language属性值来调整展示的内容，如果为zh则显示中文内容，否则显示英文内容。
            return this.$t('homeview.saliencyEdgeInpaint.descriptionText.saliencyEdge')           
        },
        damage(){
            return this.$t('homeview.saliencyEdgeInpaint.descriptionText.damage')  
        },
        or(){
            return this.$t('homeview.saliencyEdgeInpaint.descriptionText.or')
        },
        saliencyObject(){
            return this.$t('homeview.saliencyEdgeInpaint.descriptionText.saliencyObject')           
        },
        tryTool(){
            return this.$t('homeview.saliencyEdgeInpaint.descriptionText.tryTool')
        }
    }
}
</script>

<style lang="less">
.saliency-edge-inpaint{
    // let inner element flow by column
    // 让内部元素按照竖向排序
    display: flex;
    flex-direction: column;
    // height = desciption-height + upload-iamge-height + use-case-height.
    .saliency-edge-inpaint-description{
        //background-color: black;
        flex: 1;
        // let inner element center horizontal and vertical.
        // 让内部元素水平和垂直居中。
        display: flex;
        justify-content: center;
        align-items: center; 
        .saliency-edge-inpaint-description-content{
            // let inner element center horizontal and vertical.
            // 让内部元素水平和垂直居中。
            display: flex;
            justify-content: center;
            align-items: center; 
            .saliency-edge-inpaint-description-animation{
                // set the style of animation.
                // 设置演示动画的样式，包括边界、边界样式、背景阴影。
                border-radius: 30px;
                border-style: none;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
                width: 25%;
            }
            .saliency-edge-inpaint-description-text{
                // set the style of font.
                // 设置字体大小和粗细程度。
                font-weight: bolder;
                font-size: 1.75em;
                color: rgb(44, 62, 80);
                // align the text inside the saliency-edge-inpaint-description-text div to the right.
                // 让内部的字靠在最右边。
                text-align: left;
                // create distance between text and picture.
                // 文字和图片间保持一定间距
                margin-left: 10px;
                .saliency-edge-inpaint-description-text-fluorescence{
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
    .saliency-edge-inpaint-upload-image{
        background-color: blue;
        flex: 2;
    }
    .saliency-edge-inpaint-use-case{
        background-color: red;
        flex: 2;
    }
}
</style>
