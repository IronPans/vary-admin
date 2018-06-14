<template>
    <label :class="classes" :for="id">
        <input type="checkbox" :id="id" :disabled="disabled" :checked="shouldBeChecked"
               :value="inputValue" @change="handleInputChange"/>
        <div :class="`${prefixCls}-wrapper`">
            <svg focusable="false" viewBox="0 0 24 24" :class="`${prefixCls}-noChecked`">
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            </svg>
            <svg focusable="false" viewBox="0 0 24 24" :class="`${prefixCls}-checked`">
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
        </div>
        <div :class="`${prefixCls}-inner`">
            <slot/>
        </div>
    </label>
</template>

<script>
    const prefixCls = 'va-checkbox';

    export default {
        name: "va-checkbox",
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
            id: {
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
                        [`${prefixCls}-disabled`]: this.disabled
                    }
                ]
            },
            shouldBeChecked() {
                if (Array.isArray(this.value)) {
                    return this.value.includes(this.inputValue)
                }
                return this.value === this.trueValue;
            }
        },
        methods: {
            handleInputChange(event) {
                const {checked} = event.target;
                let newValue = false;
                if (Array.isArray(this.value)) {
                    newValue = [...this.value];
                    if (checked) {
                        newValue.push(this.inputValue)
                    } else {
                        newValue.splice(newValue.indexOf(this.inputValue), 1)
                    }
                } else {
                    newValue = checked ? this.trueValue : this.falseValue;
                }
                this.$emit('input', newValue);

                this.$emit('on-change', newValue);
            }
        }
    }
</script>