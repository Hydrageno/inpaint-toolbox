<template>
    <div class="upload-image">
        <!--custom upload-->
        <!--支持用户自助上传-->
        <div class="custom-upload">
            <div class="upload-image-guide">
                &nbsp;
                <el-icon><PictureFilled/></el-icon>
                {{ uploadImageGuide }}
                &nbsp;
            </div>
            <!--drag or click-->
            <!--支持用户拖拽图片上传或者点击后选择-->   
             <el-upload drag action=""
                :before-upload="beforeUploadImage">
                <!--use element-plus icon-->
                <!--使用element-plus的图标-->
                <el-icon class="el-icon--upload">
                    <UploadFilled />
                </el-icon>
                <!--description text for el-upload-->
                <!--el-upload的描述用语-->
                <div class="el-upload__text"><h3>{{ uploadImageDescription }}</h3></div>
            </el-upload>
        </div>
        <div class="provided-upload">
            <!--description text for providedUpload-->
            <!--providedUpload的描述用语-->
            <div class="provided-upload-description">
                <h4> {{ providedUpload }} </h4>
            </div>
            <!--image example for user-->
            <!--展示给用户的样例图片-->
            <div class="provided-upload-image-list">
                <img class="provided-upload-image" v-for="(imgSrc, index) in egImageAddrs" :key="index" :src="imgSrc" width="120" height="130">
            </div>
        </div>
    </div>
</template>

<script>
import { PictureFilled } from '@element-plus/icons-vue'
import { UploadFilled } from '@element-plus/icons-vue'
export default{
    name: "UploadImage",
    components:{
        PictureFilled,
        UploadFilled,
    },
    // recieve image address from parent.
    // 使用组件间的通信接收图片地址。
    props:['egImageAddrs'],
    methods:{
        beforeUploadImage(){

        }
    },
    computed:{
        uploadImageGuide(){
            // switch the content follow the value of 'language' attribute in i18n.
            // 通过i18n中的language属性值来调整展示的内容，如果为zh则显示中文内容，否则显示英文内容。
            return this.$t("uploadImage.customUpload.uploadImageGuide")
        },
        uploadImageDescription(){
            return this.$t("uploadImage.customUpload.uploadImageDescription")
        },
        providedUpload(){
            return this.$t("uploadImage.providedUpload")
        }
    }
}
</script>

<style lang="less">
.upload-image{
    // succeed the height from parent tag.
    // 完全继承父节点的高度。
    height: 100%;
    // let inner element center horizontal and vertical.
    // 让内部元素水平、垂直居中。
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .custom-upload{
        flex: 3;
        position: relative;
        height: 100%;
        width: 45%;
        .upload-image-guide{
            // let the icon more dimensional.
            // 让图标相比其它内容更高维。
            top: 0;
            left: 0;
            position: absolute;
            z-index: 1;
            // stop user from selecting.
            // 阻止用户选择。
            user-select: none;
            // set the border style of guide.
            // 设置提示的边框样式。
            border-style: groove;
            border-color: #E5E7EB;
            border-top-left-radius: 20px;
            border-bottom-right-radius: 20px;
            color: rgb(107, 116, 156);
            font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }
        // set the el-upload height succeed from its parent tag.
        // 设置el-upload和el-upload-dragger的样式。
        .upload-image-guide+div{
            //background-color:black;
            height:98%;
            .el-upload{
                height: 100%;
                .el-upload-dragger{
                    height: 100%;
                    // let inner icon and description-text flow by column, also center horizontal and vertical.
                    // 让内部图标和描述性文字按照竖向排序，并且水平、竖直居中
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    // set the style of border
                    // 设置边框的样式
                    border-style: groove;
                    border-radius: 20px;
                    border-color: #E5E7EB;
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .25);
                }
                // set the style of icon and text when hold the mouse
                .el-upload-dragger:hover{
                    .el-icon{
                        color: rgb(44,62,80);
                    }
                    .el-upload__text{
                        color: rgb(44,62,80);
                    }
                }
            }
        }
    }
    .provided-upload{
        flex: 2;
        display: flex;
        flex-direction: column;  
        .provided-upload-description{
            flex: 1;
            color: rgb(44, 62, 80);
            position: relative;
            display: flex;
            justify-content: center;
            // move the description text to certain location.
            // 将描述性文字移动到合适的位置。
            h4{
                position: relative;
                top: 30%;
            }
        }
        .provided-upload-image-list{
            flex: 4;
            display: flex;
            justify-content: center;
            .provided-upload-image{
                cursor: pointer;
                position: relative;
                // set the margin between image example
                // 设置样例图片间的间隔
                margin: 2%;
                // set the style of image
                border-radius: 15px;
                border-color: #E5E7EB;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .25);
            }
            .provided-upload-image:hover{
                opacity: .75;
            }
        }
    }
}
</style>
