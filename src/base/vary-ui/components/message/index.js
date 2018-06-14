import vaMessage from './message.vue';
import Vue from 'vue';

export default class Message {
    static create(props = {}) {
        const messageInstance = new Vue({
            render (h) {
                return h(vaMessage, {
                    props
                });
            }
        });

        const component = messageInstance.$mount();
        document.body.appendChild(component.$el);
        const message = messageInstance.$children[0];

        return {
            create(props) {
                return message.add(props);
            },
            remove(key) {
                message.remove(key);
            },
            clearAll() {
            },
            component: message
        }
    };
}