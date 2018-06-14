<template>
    <span :class="classes">
        <slot></slot>
        <span :class="supClasses">
            <template v-if="text">{{text}}</template>
            <span v-if="!text" :class="`${prefixCls}-count-inner`">
                <template v-if="!dot && count !== 0">
                    {{currentCount}}
                </template>
            </span>
        </span>
    </span>
</template>

<script>
    import {oneOf} from '../base/utils';

    const prefixCls = 'va-badge';

    export default {
        name: 'va-badge',
        props: {
            count: {
                type: Number,
                default: 0
            },
            dot: {
                default: false
            },
            fixed: {
                default: true
            },
            notify: {
                default: false
            },
            max: {
                type: Number,
                default: 99
            },
            shape: {
                validator(value) {
                    return oneOf(value, ['circle'])
                }
            },
            status: {
                validator(value) {
                    return oneOf(value, ['error', 'primary', 'info', 'success', 'warning'])
                },
                default: 'error'
            },
            text: {
                type: [String]
            }
        },
        data() {
            return {
                prefixCls,
                children: ''
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-sr-only`]: !this.children,
                        [`${prefixCls}-fixed`]: this.fixed
                    }
                ]
            },
            supClasses() {
                return [
                    `${prefixCls}-count`,
                    {
                        [`${prefixCls}-dot`]: this.dot,
                        [`${prefixCls}-notify`]: this.notify,
                        [`${prefixCls}-circle`]: this.shape === 'circle'
                    },
                    `${prefixCls}-${this.status}`
                ]
            },
            currentCount() {
                return this.count > this.max ? (this.max + '+') : this.count
            }
        },
        mounted() {
            this.children = this.$slots.default;
        }
    }
</script>