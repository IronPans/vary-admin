import Vue from 'vue';

const prefixCls = 'va-portal';

export default {
    name: 'va-portal',
    data() {
        return {
            portalInstance: ''
        }
    },
    mounted() {
        this.portalInstance = new Vue({
            render(h) {
                return h('transition', {
                    props: {
                        name: 'modeInDown'
                    }
                }, this.$slots.default)
            }
        });

        const component = this.portalInstance.$mount();
        document.body.appendChild(component.$el);
    },
    beforeDestory() {
        this.portalInstance.$destroy();
    }
}