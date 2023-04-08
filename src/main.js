import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import 'element-plus/dist/index.css'
import {ElSwitch} from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import zh from '@/components/language/zh'
import en from '@/components/language/en'

// create Application instance
const app = createApp(App);
// use vuex
app.use(store);
// use vue-router to realize page-jump
app.use(router);
// use vue-i18n
const i18n = createI18n({
    locale: 'zh',
    messages:{
        'zh': zh.projectText,
        'en': en.projectText
    },
    silentTranslationWar: true
})
app.use(i18n);
app.component(ElSwitch.name, ElSwitch);
// mount the Application
app.mount("#app");

