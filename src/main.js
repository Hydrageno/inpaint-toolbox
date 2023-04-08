import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

// create Application instance
const app = createApp(App);
// use vuex
app.use(store);
// use vue-router to realize page-jump
app.use(router);
// use element-plus ui designer for vue3 project
app.use(ElementPlus);
// mount the Application
app.mount("#app");

