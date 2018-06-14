<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script>

    const prefixCls = 'va-timeline';

    export default {
        name: 'VaTimeline',
        computed: {
            classes() {
                return [
                    prefixCls
                ];
            }
        }
    }
</script>