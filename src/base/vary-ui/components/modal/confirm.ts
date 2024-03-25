import Vue from 'vue';
import VaConfirm from './confirm-dialog.vue';

export default class Confirm {
    static create(props) {
        const confirmInstance = new Vue({
            render(h) {
                return h(VaConfirm, {
                    props: {...props, visible: true, onClose: this.close}
                });
            },
            methods: {
                close() {
                    setTimeout(() => {
                        this.destroy();
                    }, 300);
                },
                destroy () {
                    this.$destroy();
                    document.body.removeChild(this.$el);
                }
            }
        });

        const component = confirmInstance.$mount();
        document.body.appendChild(component.$el);
        const confirm = confirmInstance.$children[0];

        return {

        }
    }
}