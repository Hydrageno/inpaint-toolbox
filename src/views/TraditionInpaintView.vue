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
        <div class="tradition-inpaint-view-content" ref="traditionInpaintViewContent"></div>
        <!--toolbar for canvas-->
        <!--画布的工具栏-->
        <div class="tradition-inpaint-view-toolbar"></div>
    </div>
</template>

<script>
export default{
    name: 'TraditionInpaintView',
    methods:{
        backMain:function(){
            // return home
            // 返回主页面
            this.$router.push({path: '/'});
        } 
    },
    computed:{
        backHome(){
            // switch the content follow the value of 'language' attribute in i18n.
            // 通过i18n中的language属性值来调整展示的内容，如果为zh则显示中文内容，否则显示英文内容。
            return this.$t('traditionInpaintView.navigatorText.backHome')
        }
    }
}
</script>

<style lang="less">
*{
    user-select: none;
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
}
</style>
