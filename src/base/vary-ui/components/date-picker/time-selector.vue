<template>
    <div :class="prefixCls" @click="onSelector">
        <span class="va-icon" @click="count(1)">keyboard_arrow_up</span>
        <span :class="`${prefixCls}-wrapper`">{{getFormatValue(currentValue)}}</span>
        <span class="va-icon" @click="count(-1)">keyboard_arrow_down</span>
    </div>
</template>

<script>
    const prefixCls = 'va-time-selector';

    export default {
        name: 'va-time-selector',
        props: {
            min: {
                type: Number
            },
            max: {
                type: Number
            },
            type: {
                type: String
            },
            value: {
                type: [String, Number]
            }
        },
        data() {
            return {
                prefixCls,
                currentValue: this.value
            }
        },
        methods: {
            count(add) {
                this.currentValue += add;
                if (this.currentValue < this.min) {
                    this.currentValue = this.max;
                }
                if (this.currentValue > this.max) {
                    this.currentValue = this.min;
                }
                this.$emit('input', this.currentValue);
                this.$emit('on-change', {
                    type: this.type,
                    value: this.currentValue
                })
            },

            setCurrentValue() {
                const date = new Date();
                const picker = this.$parent;
                switch (this.type) {
                    case 'h':
                        picker.currentHour = this.currentValue = date.getHours();
                        break;
                    case 'm':
                        picker.currentMinute = this.currentValue = date.getMinutes();
                        break;
                    case 's':
                        picker.currentSecond = this.currentValue = date.getSeconds();
                }
            },

            getFormatValue(value) {
                if (value < 10) {
                    return '0' + value;
                }
                return value;
            },

            onSelector(event) {
                event.stopPropagation();
            }
        },
        watch: {
            value(val) {
                if (typeof val !== 'undefined') {
                    this.currentValue = val;
                } else {
                    this.setCurrentValue();
                }
            }
        },
        mounted() {
            this.setCurrentValue();
        }
    }
</script>