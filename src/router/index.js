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
    if (to.meta.title) {
        window.document.title = to.meta.title + ' - Vary Admin';
    }
    const locking = localStorage.getItem('locking');
    const isLogin = localStorage.getItem('user');

    if (locking === '1' && to.name !== 'lockscreen') {
        next({
            name: 'lockscreen'
        })
    } else if (!isLogin && to.name !== 'login' && to.name !== 'register') {
        next({
            name: 'login'
        })
    } else if(isLogin && (to.name === 'login' || to.name === 'register')) {
        next({
            name: 'home_index'
        });
    } else {
        next();
    }
});

// 跳转后
router.afterEach((to) => {
    window.scrollTo(0, 0);
});

export default router;