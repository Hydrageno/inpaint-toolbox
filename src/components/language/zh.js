export default {
    name: 'zh',
    projectText: {
        homeview: {
            navigatorText: {
                traditionInpaintNavigatorText: "图像修复",
                superResolutionNavigatorText: "超分辨率",
                removalInpaintNavigatorText: "去除水印",
                saliencyEdgeInpaintNavigatorText: "边缘修复"
            },
            traditionInpaint: {
                descriptionText: {
                    front: "修复图片中",
                    object: "  物 品  ",
                    people: "  人 物  ",
                    scenery: "  背 景  ",
                    animation: "动漫人物",
                    later: "在即刻间。",
                    helpful: "可能会有帮助~"
                },
                useCase: "—— 示 - 例 ——",
            },
            superResolution: {
                descriptionText:{
                    superResolve: "超分辨率",
                    withWantedPic: "上传待操作的图片",
                    customScale: "体验不同尺寸：",
                    scaleSequence: "X2、X3以及X4"
                },
                useCase: "—— 教 - 程 ——"
            },
            removalInpaint: {
                descriptionText:{
                    picHave: "照片有",
                    waterMark: "水印",
                    stains: "污渍",
                    questionMark: "？",
                    tryTool: "快来试试",
                    deWaterMarkStains: "去水印、去污渍",
                    endTool: "工具"
                },
                useCase: "—— 范 - 例 ——"
            },
            saliencyEdgeInpaint:{
                descriptionText:{
                    saliencyObject: "显著性目标？",
                    saliencyEdge: "显著目标边缘",
                    damage: "有破损？肉眼难以察觉？",
                    or: "或者想要",
                    get: "获得",
                    tryTool: "快来试试这个工具"
                },
                useCase: "—— 典 - 范 ——"
            }
        },
        uploadImage: {
            customUpload:{
                uploadImageGuide: "上传图片",
                uploadImageDescription: "拖拽图片或点击上传",
                typeLimit: "虽然但是文件类型限制: .jpeg .jpg .png"
            },
            providedUpload: "或者尝试一下图片↓",
            
        },
        traditionInpaintView: {
            navigatorText:{
                backHome: "返回主页"
            },
            toolBar:{
                penThickness: "调整笔粗细：",
                eraseText: "橡皮擦模式",
                penText: "绘画模式",
                selectMode: "选择模式",
                celehq: "人脸",
                places: "背景",
                imageNet: "其它",
                animation: "动漫人物",
                submit: "提交",
                download: "下载"
            }
        },
        superResolutionView: {
            navigatorText: {
                backHome: "返回主页"
            },
            toolBar:{
                realWorld: "现实",
                animation: "动漫",
                submit: "提交",
                download: "下载"
            }
        },
        removalInpaintView: {
            navigatorText:{
                backHome: "返回主页"
            },
            toolBar:{
                penThickness: "调整笔粗细：",
                eraseText: "橡皮擦模式",
                penText: "绘画模式",
                selectMode: "选择模式",
                realWorld: "现实世界",
                animation: "动漫人物",
                submit: "提交",
                download: "下载"
            },
        },
        saliencyEdgeInpaintView: {
            navigatorText:{
                backHome: "返回主页"
            },
            toolBar:{
                penThickness: "调整笔粗细：",
                eraseText: "橡皮擦模式",
                penText: "绘画模式",
                selectMode: "选择模式",
                celehq: "人脸",
                places: "背景",
                imageNet: "其它",
                request: "显著边缘检测",
                downloadSO: "下载显著目标",
                submit: "提交",
                download: "下载"
            },
        },
    }
}