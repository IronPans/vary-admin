<template>
    <transition name="vFadeIn">
        <div :class="classes" v-if="!closed">
        <span v-if="showIcon && alertIcon">
            <i class="va-icon va-alert-icon">{{alertIcon}}</i>
        </span>
            <div :class="`${prefixCls}-body`">
            <span :class="`${prefixCls}-title`">
                {{title}}
                <slot></slot>
            </span>
                <span :class="`${prefixCls}-desc`" v-if="hasDesc">
                {{desc}}
                <slot name="desc"></slot>
            </span>
            </div>
            <span :class="`${prefixCls}-close`" v-if="closable" @click="close">
            <i class="va-icon">clear</i>
        </span>
        </div>
    </transition>
</template>

<script>
    import {oneOf} from '../base/utils';

    const prefixCls = 'va-alert';

    export default {
        name: 'VaAlert',
        props: {
            banner: {
                type: Boolean
            },
            title: {
                type: String
            },
            desc: {
                type: String
            },
            closable: {
                type: Boolean
            },
            type: {
                validator(value) {
                    return oneOf(value, ['success', 'info', 'warning', 'error'])
                },
                default: 'info'
            },
            showIcon: {
                type: Boolean
            },
            icon: {
                type: String
            }
        },
        data() {
            return {
                prefixCls,
                alertIcon: this.icon,
                hasDesc: false,
                closed: false
            }
        },
        methods: {
            close() {
                this.closed = true;
                this.$emit('on-close');
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-with-icon`]: this.alertIcon,
                        [`${prefixCls}-with-desc`]: this.hasDesc,
                        [`${prefixCls}-with-close`]: this.closable
                    },
                    `${prefixCls}-${this.type}`
                ]
            }
        },
        created() {
            if (!this.icon && this.type) {
                switch (this.type) {
                    case 'info':
                        this.alertIcon = 'error_outline';
                        break;
                    case 'success':
                        this.alertIcon = 'check_circle_outline';
                        break;
                    case 'warning':
                        this.alertIcon = 'error_outline';
                        break;
                    case 'error':
                        this.alertIcon = 'highlight_off';
                        break;
                }
            }
            if (this.banner) {
                this.alertIcon = 'error_outline';
            }
        },
        mounted() {
            this.hasDesc = this.$slots.desc || this.desc;
        }
    }
</script>