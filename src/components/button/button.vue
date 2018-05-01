<template>
    <button :class="classes">
        <slot></slot>
    </button>
</template>

<script>
    const prefixCls = 'v-btn';

    export default {
        name: 'vButton',
        props: {
            block: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            theme: {
                type: String,
                default: 'default'
            }
        },
        computed: {
            classes() {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-${this.theme}`,
                    {
                        [`${prefixCls}-block`]: this.block,
                        [`${prefixCls}-disabled`]: this.disabled
                    }
                ];
            }
        }
    }
</script>