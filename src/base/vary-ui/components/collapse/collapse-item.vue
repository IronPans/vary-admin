<template>
    <div :class="classes">
        <div :class="`${prefixCls}-header`" @click="toggle">
            <template v-if="!$slots.header">{{header}}</template>
            <slot name="header"></slot>
        </div>
        <collapse-transition>
            <div :class="`${prefixCls}-content`" v-show="isActive">
                <div :class="`${prefixCls}-wrapper`">
                    <slot name="content"></slot>
                    <slot></slot>
                </div>
            </div>
        </collapse-transition>
    </div>
</template>

<script>
    import CollapseTransition from '../transitions/collapse-transition';

    const prefixCls = 'va-collapse-item';

    export default {
        name: "va-collapse-item",
        components: {
            CollapseTransition
        },
        props: {
            header: {
                type: String,
                default: ''
            },
            name: {
                type: [Number, String]
            }
        },
        data() {
            return {
                prefixCls,
                index: 0,
                isActive: false
            }
        },
        computed: {
            classes() {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-active`]: this.isActive
                    }
                ];
            }
        },
        methods: {
            toggle() {
                this.$parent.toggle({
                    index: this.name || this.index,
                    isActive: this.isActive
                });
            }
        }
    }
</script>