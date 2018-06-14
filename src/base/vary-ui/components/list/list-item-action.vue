<template>
    <div :class="classes">
        <slot/>
    </div>
</template>

<script>
    const prefixCls = 'va-list-item-action';

    export default {
        name: 'va-list-item-action',
        computed: {
            classes() {
                return prefixCls;
            }
        }
    }
</script>