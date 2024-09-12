import HomePage from './views/HomePage.vue';
import ImageProcessor from './views/ImageProcessor.vue';
import { createMemoryHistory, createRouter } from 'vue-router'

const routes =[
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
]
const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;