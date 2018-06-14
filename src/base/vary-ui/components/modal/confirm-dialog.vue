<template>
    <div :class="classes" v-if="visibility.modal">
        <transition name="vFadeIn">
            <div :class="`${prefixCls}-backdrop`"
                 v-show="visibility.inner" @click="close"></div>
        </transition>
        <transition name="vFadeInDown">
            <div :class="`${prefixCls}-container`" :style="modalStyle"
                 ref="modal" v-show="visibility.inner">
                <template v-if="!template">
                    <div :class="`${prefixCls}-body`">
                        <h5>{{title}}</h5>
                        <div>{{content}}</div>
                    </div>
                    <div :class="`${prefixCls}-footer`">
                        <div class="text-right">
                            <va-button size="sm" @click="handleCancel">{{cancelText}}</va-button>
                            <va-button size="sm" theme="primary" @click="handleOk">{{okText}}</va-button>
                        </div>
                    </div>
                </template>
                <va-template v-else :render="template"></va-template>
            </div>
        </transition>
    </div>
</template>

<script>
    const prefixCls = 'va-modal';

    export default {
        name: "VaConfirm",
        model: {
            prop: 'visible',
            event: 'change'
        },
        props: {
            title: {
                type: String
            },
            content: {
                type: String
            },
            hideBackdrop: {
                default: true
            },
            visible: {
                default: false
            },
            width: {
                type: [Number, String],
                default: 500
            },
            height: {
                type: [Number, String],
                default: 0
            },
            render: Function,
            okText: {
                type: String,
                default: 'Confirm'
            },
            cancelText: {
                type: String,
                default: 'Cancel'
            },
            onOk: Function,
            onCancel: Function,
            onClose: Function
        },
        data() {
            return {
                prefixCls,
                hasHeader: false,
                visibility: {
                    modal: this.visible,
                    inner: false
                },
                modal: {
                    width: 0,
                    height: 0
                },
                window: {
                    width: 0,
                    height: 0
                },
                delay: 250,
                template: this.render,
                display: this.visible
            }
        },
        methods: {
            close() {
                this.$emit('change', false);
                this.$emit('on-close', false);
            },
            onWindowResize () {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },
            position() {
                let width = 0, height = 0;
                const wWidth = this.window.width, wHeight = this.window.height;
                width = /%$/.test(this.width) ? wWidth * this.width : this.getSize(this.width);
                height = /%$/.test(this.height) ? wHeight * this.height : this.getSize(this.height);
                const left = (wWidth - width) / 2, top = 80;
                return {
                    width, height, left, top
                }
            },
            getSize(val) {
                return typeof val !== 'number' ? parseInt(val, 10) : val;
            },
            handleOk() {
                if (this.onOk) {
                    this.onOk();
                }
                this.display = false;
                this.$emit('on-ok');
                this.onClose();
            },
            handleCancel() {
                if (this.onCancel) {
                    this.onCancel();
                }
                this.display = false;
                this.$emit('on-cancel');
                this.onClose();
            },
            toggle(val) {
                if (val) {
                    this.visibility.modal = true;

                    setTimeout(() => {
                        this.visibility.inner = true;
                    }, 0)
                } else {
                    this.visibility.inner = false;

                    setTimeout(() => {
                        this.visibility.modal = false;
                    }, this.delay)
                }
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    'va-confirm',
                    {
                        [`${prefixCls}-open`]: this.visibility.modal
                    }
                ]
            },
            modalStyle() {
                this.modal = {...this.position()};
                const {width, height, top, left} = this.modal;
                return {
                    width: width + 'px',
                    height: height ? height + 'px' : null,
                    top: top + 'px',
                    left: left + 'px'
                };
            }
        },
        beforeMount() {
            window.addEventListener('resize', this.onWindowResize);
            this.onWindowResize()
        },
        mounted() {
            this.hasHeader = this.header || this.$slots.header;
            if (this.display) {
                this.toggle(this.display);
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onWindowResize);
        },
        watch: {
            visible(val) {
                this.display = val;
            },
            display(val) {
                this.toggle(val);
            }
        }
    }
</script>