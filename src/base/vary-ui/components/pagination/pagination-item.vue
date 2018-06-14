<template>
    <li :class="classes" @click="handleClick">
        <span :class="`${prefixCls}-btn`">
            <slot></slot>
        </span>
    </li>
</template>

<script>
    const prefixCls = 'va-pagination-item';

    export default {
        name: 'va-pagination-item',
        props: {
            index: {
                type: Number
            },
            active: {
                default: false
            },
            disabled: {
                default: false
            }
        },
        data() {
            return {
                prefixCls
            }
        },
        methods: {
            handleClick() {
                if (!this.disabled) {
                    this.$parent.changePage(this.index);
                }
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-active`]: this.index && this.active,
                        [`${prefixCls}-disabled`]: this.disabled
                    }
                ]
            }
        }
    }
</script>