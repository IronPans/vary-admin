<template>
    <div :class="classes">
        <button :class="minusStyleClass" @click="spin(-1)"></button>
        <input :id="id" type="text" v-model="currentValue" @keydown="handleKeyDown"
               @keypress="handleKeyPress" @change="handleChange"/>
        <button :class="addStyleClass" @click="spin(1)"></button>
    </div>
</template>

<script>
    const prefixCls = 'va-input-number';

    export default {
        name: 'va-input-number',
        props: {
            value: {
                type: Number,
                default: 0
            },
            disabled: {
                default: false
            },
            min: {
                type: Number
            },
            max: {
                type: Number
            },
            step: {
                type: Number,
                default: 1
            },
            id: {
                type: String
            }
        },
        data() {
            return {
                currentValue: this.value,
                count: 0
            }
        },
        computed: {
            classes() {
                return [prefixCls]
            },
            minusStyleClass() {
                return [
                    `${prefixCls}-minus`,
                    {
                        'is-disabled': this.min <= this.currentValue
                    }
                ]
            },
            addStyleClass() {
                return [
                    `${prefixCls}-add`,
                    {
                        'is-disabled': this.max >= this.currentValue
                    }
                ]
            }
        },
        methods: {
            setValue(add = 0, value) {
                const {min, max, step} = this;
                let currentValue = value + add * step;
                if (currentValue < min) {
                    currentValue = min;
                } else if (currentValue > max) {
                    currentValue = max;
                }
                currentValue = Number(currentValue.toFixed(this.count));
                this.currentValue = currentValue;
                return currentValue;
            },

            spin(add) {
                const currentValue = this.setValue(add, this.currentValue);
                this.$emit('on-change', currentValue);
                this.$emit('input', currentValue);
            },

            handleKeyDown() {
                if (event.which === 38) {
                    this.spin(1);
                    event.preventDefault();
                } else if (event.which === 40) {
                    this.spin(-1);
                    event.preventDefault();
                }
            },

            handleKeyPress(event) {
                const keyPattern = /[0-9\+\-]/;
                if (!keyPattern.test(String.fromCharCode(event.charCode)) &&
                    event.keyCode !== 9 && event.keyCode !== 8 && event.keyCode !== 37 &&
                    event.keyCode !== 39 && event.keyCode !== 46) {
                    event.preventDefault();
                }
            },

            handleChange(event) {
                const inputElem = event.target;
                this.currentValue = Number(inputElem.value);
                this.$emit('on-change', this.currentValue);
                this.$emit('input', this.currentValue);
            }
        },
        created() {
            const step = this.step ? this.step.toString().split(".") : [];
            this.count = step[1] ? step[1].length : 0;
        },
        watch: {
            value(val) {
                this.setValue(0, val);
            }
        }
    }
</script>