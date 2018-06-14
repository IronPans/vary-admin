<template>
    <ul :class="classes">
        <slot/>
    </ul>
</template>

<script>
    const prefixCls = 'va-list';

    export default {
        name: 'va-list',
        props: {
            reveal: {
                default: false
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