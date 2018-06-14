<template>
    <div :class="classes" @click="handleClick">
        <span v-if="$slots.avatar" :class="`${prefixCls}-avatar`">
            <slot name="avatar"></slot>
        </span>
        <span :class="`${prefixCls}-inner`">{{data.label}}</span>
        <i :class="`${prefixCls}-close`" v-if="close" @click="handleDelete">clear</i>
    </div>
</template>

<script>
    const prefixCls = 'va-chip';

    export default {
        name: 'va-chip',
        props: {
            active: {
                default: false
            },
            close: {
                default: false
            },
            data: {
                type: Object
            }
        },
        data() {
            return {
                prefixCls
            }
        },
        methods: {
            handleDelete() {
                this.$emit('on-delete', {
                    label: this.data.label,
                    value: this.data.value
                });
            },
            handleClick() {
                this.$emit('click', {
                    label: this.data.label,
                    value: this.data.value
                });
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-active`]: this.active
                    }
                ]
            }
        }
    }
</script>