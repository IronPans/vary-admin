<template>
    <div :class="classes">
        <label v-if="label"> <span>{{label}}</span></label>
        <div :class="`${prefixCls}-wrapper`">
            <div v-if="startSlot" :class="`${prefixCls}-startSlot`">
                <slot name="startSlot"/>
            </div>
            <div :class="`${prefixCls}-inner`">
                <span :class="['va-icon', `${prefixCls}-clear`, `${prefixCls}-icon`]"
                      v-if="showClear" @click="handleClear">
                    <i class="va-icon">clear</i>
                </span>
                <i v-if="icon"
                   :class="['va-icon', `${prefixCls}-icon-${dir}`, `${prefixCls}-icon`]">{{icon}}</i>
                <template v-if="type !== 'textarea'">
                    <div :class="`${prefixCls}-label`">{{placeholder}}</div>
                    <input :type="type"
                           :id="id"
                           ref="input"
                           :value="currentValue"
                           :readonly="readonly"
                           :disabled="disabled"
                           :autofocus="autofocus"
                           @focus="handleFocus"
                           @blur="handleBlur"
                           @input="handleInput"
                           @change="handleChange"/>
                </template>
                <textarea v-else
                          ref="textarea"
                          :id="id"
                          :value="currentValue"
                          :readonly="readonly"
                          :disabled="disabled"
                          :autofocus="autofocus"
                          @focus="handleFocus"
                          @blur="handleBlur"
                          @input="handleInput"
                          @change="handleChange"></textarea>
                <hr v-if="!border"/>
            </div>
            <div v-if="endSlot" :class="`${prefixCls}-endSlot`">
                <slot name="endSlot"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {oneOf} from '../base/utils';

    const prefixCls = 'va-input';

    export default {
        name: 'va-input',
        props: {
            id: {
                type: String
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            animated: {
                type: Boolean
            },
            icon: {
                type: String
            },
            dir: {
                validator(value) {
                    return oneOf(value, ['left', 'right']);
                },
                default: 'left'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                default: ''
            },
            readonly: {
                type: Boolean,
                default: false
            },
            autocomplete: {
                validator (value) {
                    return oneOf(value, ['on', 'off']);
                },
                default: 'off'
            },
            placeholder: {
                type: String
            },
            type: {
                validator(value) {
                    return oneOf(value, ['text', 'password', 'textarea', 'url', 'email']);
                },
                default: 'text'
            },
            clear: {
                type: Boolean,
                default: false
            },
            label: {
                type: String
            },
            inline: {
                type: Boolean
            },
            border: {
                type: Boolean
            },
            block: {
                type: Boolean
            }
        },
        data() {
            return {
                currentValue: this.value,
                prefixCls,
                startSlot: false,
                endSlot: false,
                showClear: false,
                focus: false
            }
        },
        methods: {
            handleInput (event) {
                let value = event.target.value;
                this.$emit('input', value);
                this.setCurrentValue(value);
                this.$emit('on-change', event);
            },
            handleChange(event) {
                let value = event.target.value;
                this.$emit('on-input-change', {
                    value,
                    originEvent: event
                });
            },
            setCurrentValue(val) {
                if (val === this.currentValue) {
                    return;
                }
                this.currentValue = val;
            },
            handleFocus (event) {
                this.focus = true;
                let value = event.target.value;
                this.$emit('on-focus', {
                    value,
                    originEvent: event
                });
            },
            handleBlur(event) {
                this.focus = false;
                let value = event.target.value;
                this.$emit('on-blur', {
                    value,
                    originEvent: event
                });
            },
            handleClear () {
                this.$emit('input', '');
                this.setCurrentValue('');
                this.$emit('on-change');
            }
        },
        watch: {
            value(val) {
                this.setCurrentValue(val);
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-focus`]: this.focus,
                        [`${prefixCls}-inline`]: this.inline,
                        [`${prefixCls}-border`]: this.border,
                        [`${prefixCls}-animated`]: this.animated,
                        [`${prefixCls}-noEmpty`]: this.currentValue,
                        [`${prefixCls}-block`]: this.block
                    }
                ];
            }
        },
        mounted() {
            if (this.type !== 'textarea') {
                this.startSlot = this.$slots.startSlot !== undefined;
                this.endSlot = this.$slots.endSlot !== undefined;
            }
        }
    }
</script>

<style scoped></style>