
// createWebHashHistory
import { createRouter, createWebHistory } from 'vue-router';
import { title } from '/@/config/basic';

import slid from '/@/config/slide';
import storage from '/@/utils/storage';



const routes = [
  {
    path: '/',
    name: 'home',
    alias: '/index',
    component: () => import(/* webpackChunkName: "home" */ '/@/views/Index.vue'),
    children: [...slid]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "logo" */'/@/views/Login.vue')

  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '/@/views/404.vue')
  }

];


// 


// Todo
export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes// short for `routes: routes`
});



// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {

  const TITLE = to.meta.title;
  document.title = TITLE || title;
  let info = storage.getSessionStorage('info');
  if (to.name!=='login' && !info.token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;


