import Vue from 'vue';
import App from './app.vue';
import router from "./router";
import store from './store';

import Vary from './base/vary-ui/components';

Vue.use(Vary);

// 开启debug模式
Vue.config.debug = process.env.NODE_ENV === 'development';

new Vue({
    el: '#root',
    store,
    router,
    render: h => {
        return h(App)
    }
});