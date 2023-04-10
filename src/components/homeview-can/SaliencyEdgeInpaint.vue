<template>
    <div class="saliency-edge-inpaint">
        <!--create description area for saliency-edge-inpaint-->
        <!--为显著性目标边缘检测创建描述区-->
        <div class="saliency-edge-inpaint-description"></div>
        <div class="saliency-edge-inpaint-upload-image"></div>
        <div class="saliency-edge-inpaint-use-case"></div>
    </div>
</template>

<script>
export default{
    name: 'SaliencyEdgeInpaint',
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
        background-color: black;
        flex: 1;
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
