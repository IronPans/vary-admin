import Vue from 'vue';
import App from '@/app.vue';
import router from "@/router";

new Vue({
    el: '#root',
    router,
    render: h => {
        return h(App)
    }
});