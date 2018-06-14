<template>
    <div :class="classes" @mouseleave="handleMouseLeave">
        <template v-for="(item, index) in getRange()">
            <div :class="`${prefixCls}-item`">
                <div :class="halfClasses(item)" v-if="allowHalf" @mousemove.stop="handleMouseMove(item, true)"
                     :style="{opacity: isIn(v) ? 1 : 0}" @click.stop="handleClick(item, true)">
                    <va-icon icon="star" v-if="!defaultSlot"/>
                    <slot/>
                </div>
                <div :class="iconClasses(item)" @mousemove.stop="handleMouseMove(item,false)"
                     @click.stop="handleClick(item, false)">
                    <va-icon icon="star" v-if="!defaultSlot"/>
                    <slot/>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import vIcon from '../icon';
    const prefixCls = 'va-rate';

    export default {
        name: 'va-rate',
        components: {vIcon},
        props: {
            allowHalf: {
                default: false
            },
            count: {
                type: Number,
                default: 5
            },
            readonly: {
                default: false
            },
            value: {
                type: Number
            },
            hover: {
                default: false
            }
        },
        data() {
            return {
                activeValue: this.value,
                prefixCls,
                defaultSlot: '',
                oldValue: 0
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls
                ]
            }
        },
        methods: {
            getRange(len = this.count, start = 0, step = 1) {
                const range = [];
                for (let i = start; i < len; i += step) {
                    range.push(i);
                }
                return range;
            },
            isIn(value) {
                const ex = this.value - value;
                return ex > 0 && ex < 1;
            },
            handleClick(value, half) {
                if (this.readonly) {
                    return false;
                }
                let _value = 0;
                _value = value + 1;
                if (half && this.allowHalf) {
                    _value -= 0.5;
                }
                this.activeValue = _value;
                this.oldValue = _value;
                this.$emit('input', _value);

                this.$emit('on-change', _value)

            },
            halfClasses(v) {
                return [
                    `${prefixCls}-inner`,
                    {
                        [`${prefixCls}-active`]: v < this.activeValue
                    },
                    `${prefixCls}-half`
                ]
            },
            iconClasses(v) {
                const isActive = v < this.activeValue;
                return [
                    `${prefixCls}-inner`,
                    {
                        [`${prefixCls}-active`]: this.allowHalf ? (!this.isIn(v) && isActive) : isActive
                    }
                ];
            },
            handleMouseMove(value, half) {
                if (this.hover && !this.readonly) {
                    this.activeValue = value + 1;
                    if (half && this.half) {
                        this.activeValue -= 0.5;
                    }
                }
            },
            handleMouseLeave() {
                this.activeValue = this.oldValue;
            }
        },
        mounted() {
            this.defaultSlot = this.$slots.default;
        }
    }
</script>