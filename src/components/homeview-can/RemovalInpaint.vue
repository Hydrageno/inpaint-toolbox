<template>
    <div class="removal-inpaint">
        <!--create description area for removal-inpaint-->
        <!--为去除水印创建描述区-->
        <div class="removal-inpaint-description">

        </div>
        <div class="removal-inpaint-upload-image"></div>
        <div class="removal-inpaint-use-case"></div>
    </div>
</template>

<script>
export default{
    name: 'RemovalInpaint',
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
        background-color: rgb(133,204,248);
        flex: 1;
    }
    .removal-inpaint-upload-image{
        background-color: red;
        flex: 2;
    }
    .removal-inpaint-use-case{
        background-color: green;
        flex: 2;
    }
}
</style>
