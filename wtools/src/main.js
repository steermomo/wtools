// import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { createApp } from 'vue';

// Vue.config.productionTip = false;

createApp(App)
  .use(router)
  .mount('#app');
