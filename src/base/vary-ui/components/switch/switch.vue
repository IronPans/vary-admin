<template>
    <label :class="classes">
        <input type="checkbox" :disabled="disabled" :checked="shouldBeChecked"
               @change="handleInputChange"/>
        <div :class="`${prefixCls}-media`">
            <span :class="`${prefixCls}-label`"></span>
        </div>
        <div :class="`${prefixCls}-inner`"><slot>{{label}}</slot></div>
    </label>
</template>

<script>
    const prefixCls = 'va-switch';

    export default {
        name: "va-switch",
        props: {
            value: {
                default: false
            },
            inputValue: {
                type: [String, Number, Boolean]
            },
            disabled: {
                type: Boolean
            },
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            },
            type: {
                type: Number,
                default: 2
            },
            label: {
                type: String
            }
        },
        data() {
            return {
                prefixCls
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-disabled`]: this.disabled,
                        [`${prefixCls}-${this.type}`]: this.type
                    }
                ]
            },
            shouldBeChecked() {
                return this.value === this.trueValue;
            }
        },
        methods: {
            handleInputChange(event) {
                const {checked} = event.target;
                let newValue = false;
                newValue = checked ? this.trueValue : this.falseValue;
                this.$emit('input', newValue);

                this.$emit('on-change', newValue);
            }
        }
    }
</script>