import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/HomePage.vue';
import ImageProcessor from './views/ImageProcessor.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // 使用 history 模式以去掉 URL 中的 # 号
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/image-processor',
      name: 'ImageProcessor',
      component: ImageProcessor,
    },
  ],
});
