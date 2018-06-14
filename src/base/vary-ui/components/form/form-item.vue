<template>
    <div :class="classes">
        <label :for="labelFor" v-if="label || $slots.label" :style="labelStyle">
            <slot name="label">{{label}}</slot>
        </label>
        <div :class="`${prefixCls}-wrapper`">
            <slot></slot>
            <transition name="vFadeIn">
                <div :class="`${prefixCls}-error-msg`" v-if="errorMessage">
                    {{errorMessage}}
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import {validate} from '../base/validator';
    import {getSize} from '../base/utils';

    const prefixCls = 'va-form-item';

    export default {
        name: 'VaFormItem',
        props: {
            labelWidth: {
                type: [Number, String]
            },
            label: {
              type: String
            },
            labelFor: {
                type: String
            },
            name: {
                type: String
            }
        },
        inject: ['form'],
        data() {
            return {
                prefixCls,
                errorMessage: ''
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-error`]: this.errorMessage
                    }
                ]
            },
            labelStyle() {
                return {
                    width: getSize(this.labelWidth)
                }
            }
        },
        methods: {
            async validate(callback) {
                this.errorMessage = '';
                const error = await validate({[this.name]: this.form.getValue(this.name)},
                    {[this.name]: this.form.getRules(this.name)});
                return new Promise((resolve, reject) => {
                    if (error) {
                        this.errorMessage = error;
                    } else {
                        resolve()
                    }
                    callback(error);
                })
            }
        }
    }
</script>