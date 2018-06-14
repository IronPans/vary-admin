<template>
    <div :class="classes"><slot/></div>
</template>

<script>
    const prefixCls = 'va-list-item-text';

    export default {
        name: 'va-list-item-text',
        computed: {
            classes() {
                return prefixCls;
            }
        }
    }
</script>