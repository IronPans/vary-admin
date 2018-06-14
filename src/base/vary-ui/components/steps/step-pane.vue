<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    const prefixCls = 'va-step-pane';

    export default {
        name: 'va-step-pane',
        props: {
          label: {
              type: String
          }
        },
        data() {
            return {
                prefixCls,
                isActive: false
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-active`]: this.isActive
                    }
                ]
            }
        }
    }
</script>