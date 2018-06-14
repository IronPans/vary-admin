<template>
    <div :class="classes">
        <div :class="`${prefixCls}-badge`" v-if="badge">
            <slot name="badge"></slot>
        </div>
        <div :class="`${prefixCls}-panel`">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    const prefixCls = 'va-timeline-item';

    export default {
        name: 'VaTimelineItem',
        props: {
            inverted: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                prefixCls,
                badge: ''
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-inverted`]: this.inverted
                    }
                ]
            }
        },
        mounted() {
            this.badge = this.$slots.badge;
        }
    }
</script>