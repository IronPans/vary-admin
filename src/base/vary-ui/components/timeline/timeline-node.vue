<template>
    <div :class="`${prefixCls}`">
        <slot></slot>
    </div>
</template>

<script>
    const prefixCls = 'va-timeline-node';

    export default {
        name: 'VaTimelineNode',
        data() {
            return {
                prefixCls
            }
        }
    }
</script>