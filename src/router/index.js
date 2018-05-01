import Vue from 'vue';
import VueRouter from 'vue-router';
import {routers} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

const router = new VueRouter(RouterConfig);

// 路由跳转前，可以在这里判断权限
router.beforeEach((to, from, next) => {
    next();
});

router.afterEach((to) => {
});

export default router;