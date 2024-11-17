// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuex from './vuex';
import axios from 'axios';

const app = createApp(App);

axios.defaults.baseURL = 'http://127.0.0.1:5004';
axios.defaults.timeout = 5000;

app.config.globalProperties.$http = axios;

app.use(router);
app.use(vuex);

app.mount('#app');

