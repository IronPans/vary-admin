<template>
    <transition :name="transitionName">
        <div :class="classes" v-if="true">
            <div :class="`${prefixCls}-inner`" v-html="message"></div>
            <i :class="`va-icon ${prefixCls}-close`" v-if="closable" @click="close">clear</i>
        </div>
    </transition>
</template>

<script>
    const prefixCls = 'va-message-item';

    export default {
        name: 'va-message-item',
        props: {
            delay: {
                type: Number,
                default: 2500
            },
            message: {
                type: String
            },
            className: {
                type: String
            },
            closable: {
                default: false
            },
            transitionName: {
                type: String,
                default: 'scaleInTop'
            }
        },
        data() {
            return {
                prefixCls,
                timer: ''
            }
        },
        methods: {
            show() {
                if (this.timer) {
                    return;
                }
                if (this.delay > 0) {
                    this.timer = setTimeout(() => {
                        this.close();
                    }, this.delay);
                }
            },
            close() {
                this.clearTimer();
                this.$emit('on-close', this.key);
            },
            clearTimer() {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    this.className
                ]
            }
        },
        mounted() {
            this.show();
        },
        destroyed() {
            this.clearTimer();
        }
    }
</script>