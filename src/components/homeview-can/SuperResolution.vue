<template>
    <div class="super-resolution">
        <div class="super-resolution-description"></div>
        <div class="super-resolution-upload-image"></div>
        <div class="super-resolution-use-case"></div>
    </div>
</template>

<script>
export default{
    name: 'SuperResolution',
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
        background-color: orange;
        flex: 1;
    }
    .super-resolution-upload-image{
        background-color: green;
        flex: 2;
    }
    .super-resolution-use-case{
        background-color: blue;
        flex: 2;
    }
}
</style>
