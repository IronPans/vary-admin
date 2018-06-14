<template>
    <li :class="classes" @click="handleClick">
        <div :class="`${prefixCls}-content`">
            <slot/>
        </div>
    </li>
</template>

<script>
    const prefixCls = 'va-list-item';

    export default {
        name: 'va-list-item',
        props: {
            reveal: {
                default: false
            }
        },
        data() {
            return {
                prefixCls
            }
        },
        methods: {
            handleClick(event) {
                this.$emit('click', event);
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-reveal`]: this.reveal
                    }
                ]
            }
        }
    }
</script>