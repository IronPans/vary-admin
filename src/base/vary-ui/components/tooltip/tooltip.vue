<template>
    <div :class="classes">
        <div :class="`${prefixCls}-inner`" @mouseenter="handleShow" @mouseleave="handleClose">
            <slot></slot>
        </div>
        <transition name="vFadeIn">
            <div :class="`${prefixCls}-tip`" v-show="active">{{content}}</div>
        </transition>
    </div>
</template>

<script>
    import {oneOf} from '../base/utils';

    const prefixCls = 'va-tooltip';

    export default {
        name: 'VaTooltip',
        props: {
            content: {
                type: String
            },
            dir: {
                validator(value) {
                    return oneOf(value, ['top-left', 'top', 'top-right',
                        'left-top', 'left', 'left-bottom',
                    'right-top', 'right', 'right-bottom',
                    'bottom-left', 'bottom', 'bottom-right']);
                },
                default: 'bottom'
            }
        },
        data() {
            return {
                prefixCls,
                active: false,
                position: {
                    left: 0,
                    top: 0
                }
            }
        },
        methods: {
            handleShow() {
                this.active = true;
            },
            handleClose() {
                this.active = false;
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        active: this.active
                    },
                    `${prefixCls}-${this.dir}`
                ]
            }
        }
    }
</script>