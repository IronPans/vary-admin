<template>
    <div :class="classes" v-show="!closed">
        <div :class="`${prefixCls}-header`" v-if="header || $slots.header">
            <h3 :class="`${prefixCls}-title`" v-if="header">{{header}}</h3>
            <slot name="header"></slot>
            <div :class="`${prefixCls}-toolbar`" v-if="!$slots.toolbar && toolbar">
                <i class="va-icon" @click="maximized = !maximized">fullscreen</i>
                <i class="va-icon" @click="onExpand()">
                    {{expanded ? 'remove' : 'add'}}
                </i>
                <i class="va-icon" @click="closed = !closed">clear</i>
            </div>
            <div :class="`${prefixCls}-toolbar`" v-if="$slots.toolbar">
                <slot name="toolbar"></slot>
            </div>
        </div>
        <collapse-transition>
            <div :class="`${prefixCls}-body`" v-show="expanded">
                <div :class="`${prefixCls}-wrapper`">
                    <slot></slot>
                </div>
                <div :class="`${prefixCls}-footer`" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </collapse-transition>
    </div>
</template>

<script>
    import {oneOf} from '../base/utils';
    import CollapseTransition from '../transitions/collapse-transition';
    const prefixCls = 'va-panel';

    export default {
        name: 'va-panel',
        components: {
            CollapseTransition
        },
        props: {
            header: {
                type: String
            },
            toolbar: {
                type: Boolean
            },
            theme: {
                validator(value) {
                    return oneOf(value, ['default', 'primary', 'info', 'success', 'warning', 'danger'])
                },
                default: 'default'
            }
        },
        data() {
            return {
                prefixCls,
                maximized: false,
                expanded: true,
                state: 'expand',
                closed: false
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    `${prefixCls}-${this.theme}`,
                    {
                        [`${prefixCls}-maximized`]: this.maximized
                    }
                ]
            }
        },
        methods: {
            onExpand() {
                this.expanded = !this.expanded;
                this.state = this.expanded ? 'expand' : 'compress';
            }
        }
    }
</script>