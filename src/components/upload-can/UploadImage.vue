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
             <el-upload drag action="#"
                :before-upload="beforeUploadImage">
                <!--use element-plus icon-->
                <!--使用element-plus的图标-->
                <el-icon class="el-icon--upload">
                    <UploadFilled />
                </el-icon>
                <!--description text for el-upload-->
                <!--el-upload的描述用语-->
                <div class="el-upload__text">
                    <h3> 
                        {{ uploadImageDescription }}
                        <transition name="user-instruction">
                            <!--use correctUpload's value to show or hide-->
                            <!--用correctUpload的属性值来决定是否展示或隐藏-->
                            <p v-if="correctUpload"> {{ typeLimit }}</p>
                        </transition>
                    </h3>
                </div>
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
import store from '@/store'

export default{
    name: "UploadImage",
    components:{
        PictureFilled,
        UploadFilled,
    },
    data(){
        return {
            correctUpload: false,
        }
    },
    // recieve image address from parent.
    // 使用组件间的通信接收图片地址。
    props:['egImageAddrs', 'viewType'],
    methods:{
        beforeUploadImage(file){
            // type check.
            // 类型检查
            if(['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) == -1){
                // show user instruction.
                // 让user-instruction浮现出来
                this.correctUpload = true;
                return false;
            }
            this.correctUpload = false;
            this.uploadCustomImage(file);
        },
        uploadCustomImage(file){
            // synchronous methods.
            // 同步方法。
            // create a new form data object.
            // 创建FormData对象。
            const formData = new FormData();
            // append the file to the form data object.
            // 将文件添加到formData中。
            formData.append('file', file);
            // post the image to back-end.
            // 将图片传给后端。
            // create synchronous request.
            // 创建一个同步请求对象。
            let xhr = new XMLHttpRequest();
            let replacer = this;
            // post the url.
            // 使用POST来连接。
            xhr.open('POST', 'http://127.0.0.1:5000/custom-upload');
            xhr.onload = function(){
                if(xhr.status === 200 && xhr.readyState === 4){
                    console.log("upload connection build");    
                    // get the image from back-end.
                    // 接收后端来的图片。
                    xhr.open('GET', 'http://127.0.0.1:5000/return-image-flow');
                    // set response type.
                    // 设定返回类型。
                    xhr.responseType = 'blob'
                    xhr.onload = function(){
                        if(xhr.status === 200 && xhr.readyState === 4){
                            console.log("get-image connection build");
                            let response = xhr.response;
                            let blob = response
                            let imageURL = window.URL.createObjectURL(blob);
                            // execute the setImageURL method in store instance.
                            // 执行store中的setImageURL方法。
                            store.commit('setImageURL', imageURL);
                            // get the image size from back-end.
                            // 从后端获取图片的尺寸大小。
                            xhr.open('GET', 'http://127.0.0.1:5000/return-image-size');
                            xhr.responseType = 'text'
                            xhr.onload = function(){
                                if(xhr.status === 200 && xhr.readyState === 4){
                                    console.log("get-image-size connection build");
                                    // split the size(height, width) from back-end.
                                    // 将后端中的(height, width)数据进行分割。
                                    const sizeArr = xhr.response.split('_');
                                    store.commit('setImageSize', sizeArr);
                                    // execute the setImageSize method in store instance.
                                    // 执行store中的setImageSize方法。
                                    console.log(store.state.imageURL);
                                    // jump to certain page.
                                    // 跳转到对应的页面。
                                    replacer.jumpCertainPage();  
                                }
                            }   
                            xhr.send();
                        }
                    }   
                    xhr.send(); 
                }
            }
            xhr.send(formData);
        },
        jumpCertainPage(){
            if(this.viewType == "TI")
                this.$router.push({path: "/tradition-inpaint"});
            else if(this.viewType == "SR")
                this.$router.push({path: "/super-resolution"});
            else if(this.viewType == "RI")
                this.$router.push({path: "/removal-inpaint"});
            else if(this.viewType == "SEI")
            this.$router.push({path: "/saliency-edge-inpaint"});
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
        typeLimit(){
            return this.$t("uploadImage.customUpload.typeLimit")
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
        @top-distance: 3%;
        .upload-image-guide{
            // let the icon more dimensional.
            // 让图标相比其它内容更高维。
            // the same top distance with el-upload
            // 和el-upload一样的上边距
            top: @top-distance;
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
            // don't so close!
            // 让el-upload的上边距不要太小
            position: relative;
            top: @top-distance;
            height:97%;
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
                    .el-upload__text{
                        h3{
                            // set the animation for user-instruction
                            // 设置user-instruction动画效果
                            .user-instruction-enter-active, .user-instruction-leave-active{
                                transition: opacity .5s;
                            }
                            .user-instruction-enter, .user-instruction-leave-to{
                                opacity: 0;
                            }
                        }
                    }
                }
                // set the style of icon and text when hold the mouse
                // 设置悬浮鼠标时的图标和文字的样式
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
                user-select: none;
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
                // 设置样例图片的样式
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
