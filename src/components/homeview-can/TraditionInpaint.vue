<template>
    <div class="tradition-inpaint">
        <div class="tradition-inpaint-description"></div>
        <div class="tradition-inpaint-upload-image"></div>
        <div class="tradition-inpaint-use-case"></div>
    </div>
</template>

<script>
export default{
    name: 'TraditionInpaint',
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
        background-color: green;
        flex:1;
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
