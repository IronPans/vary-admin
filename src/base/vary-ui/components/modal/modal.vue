<template>
    <div :class="classes" v-if="visibility.modal">
        <transition name="vFadeIn">
            <div :class="`${prefixCls}-backdrop`"
                 v-show="visibility.inner" @click="close"></div>
        </transition>
        <transition name="vFadeInDown">
            <div :class="`${prefixCls}-container`" :style="modalStyle"
                 ref="modal" v-show="visibility.inner">
                <div v-if="hasHeader" :class="`${prefixCls}-header`">
                    {{header}}
                    <slot name="header"></slot>
                    <button :class="`${prefixCls}-close`" @click="close"><span/></button>
                </div>
                <div :class="`${prefixCls}-body`">
                    <slot></slot>
                </div>
                <div :class="`${prefixCls}-footer`">
                    <slot name="footer"></slot>
                    <div class="text-right" v-if="!$slots.footer">
                        <va-button size="sm" @click="onCancel">{{cancelText}}</va-button>
                        <va-button :disabled="confirmLoading" size="sm" theme="primary" @click="onOk">
                            <va-spin :width="50" :height="50" color="#fff" v-if="confirmLoading"></va-spin>
                            {{okText}}
                        </va-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    const prefixCls = 'va-modal';

    export default {
        name: "VaModal",
        model: {
            prop: 'visible',
            event: 'change'
        },
        props: {
            confirmLoading: {
                type: Boolean,
                default :false
            },
            header: {
                type: String
            },
            hideBackdrop: {
                default: true
            },
            visible: {
                default: false
            },
            maxHeight: {
                type: [Number, String]
            },
            width: {
                type: [Number, String],
                default: 500
            },
            height: {
                type: [Number, String],
                default: 0
            },
            okText: {
                type: String,
                default: 'Confirm'
            },
            cancelText: {
                type: String,
                default: 'Cancel'
            }
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
                delay: 250
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
            onOk() {
                this.$emit('on-ok');
            },
            onCancel() {
                this.$emit('on-cancel');
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-max`]: this.maxHeight,
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
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onWindowResize);
        },
        watch: {
            visible(val) {
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
        }
    }
</script>

<style scoped>

</style>