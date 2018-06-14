<template>
    <div :class="classes" :style="progressStyle">
        <div :class="`${prefixCls}-bar`" :style="barStyle">
            <template v-if="showValue">{{currentValue + '%'}}</template>
        </div>
    </div>
</template>

<script>
    import {getSize} from '../base/utils';

    const prefixCls = 'va-progress';

    export default {
        name: 'va-progress',
        props: {
            value: {
                type: Number | String,
                default: 0
            },
            completeColor: {
                type: String,
                default: '#28a745'
            },
            animated: {
                type: Boolean,
                defualt: false
            },
            showValue: {
                type: Boolean,
                default: false
            },
            striped: {
                type: Boolean,
                default: false
            },
            width: {
                type: Number | String,
                default: '100%'
            },
            height: {
                type: Number | String,
                default: '8px'
            },
            trackColor: {
                type: String
            },
            barColor: {
                type: String
            }
        },
        data() {
            return {
                currentValue: this.formatValue(this.value),
                prefixCls
            }
        },
        methods: {
            formatValue(val) {
                const value = typeof val !== 'number' ? parseInt(val, 10) : val;
                return Math.min(value, 100);
            }
        },
        computed: {
            classes() {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-active`]: this.animated,
                        [`${prefixCls}-striped`]: this.striped
                    }
                ]
            },
            progressStyle() {
                return {
                    width: getSize(this.width),
                    height: getSize(this.height),
                    backgroundColor: this.trackColor
                }
            },
            barStyle() {
                return {
                    width: this.currentValue + '%',
                    backgroundColor: this.currentValue >= 100 ? this.completeColor : this.barColor
                }
            }
        },
        watch: {
            value(val) {
                this.currentValue = this.formatValue(val);
            }
        }
    }
</script>
