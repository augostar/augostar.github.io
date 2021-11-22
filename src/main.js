import { createApp } from 'vue';
import App from '/@/App.vue';
import router from '/@/router';
import axios from '/@/http/index';
import storage from '/@/utils/storage';
import secret from '/@/utils/secret';

import { createPinia } from 'pinia';


import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'



/* 环境变量 */

console.log(import.meta.env);
console.log(import.meta.env.VITE_BASE);
console.log(3,import.meta.env.AUGO_BASE);
console.log(import.meta.env.BASE_URL);
console.log(5,import.meta.env.VITE_SOME_KEY);
console.log(5,import.meta.env.VITE_SOME_KEY2);
console.log(5,import.meta.env.PROJECT_NAME);

let app = createApp(App);

// app.config.productionTip = false;

app.config.globalProperties.$axios =axios;
app.config.globalProperties.$storage =storage;
app.config.globalProperties.$secret =secret;
app.use(createPinia());

app.use(router);

app.mount('#app');


