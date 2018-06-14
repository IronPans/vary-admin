<template>
    <form :class="classes" :novalidate="novalidate"><slot></slot></form>
</template>

<script>
    const prefixCls = 'va-form';

    export default {
        name: 'VaForm',
        props: {
            group: {
                type: Object
            },
            rules: {
                type: Object,
                default() {
                    return {}
                }
            },
            novalidate: {
                type: Boolean
            },
            inline: {
                type: Boolean
            }
        },
        provide() {
            return {form: this};
        },
        data() {
            return {
                prefixCls,
                fields: []
            }
        },
        methods: {
            validate(callback) {
                return new Promise((resolve, reject) => {
                    let count = 0, valid = true;
                    this.fields.forEach((child) => {
                        child.validate(errors => {
                            if (errors) {
                                valid = false;
                            }
                            if (count === this.fields.length - 1) {
                                resolve(valid);
                                if (typeof callback === 'function') {
                                    callback(valid);
                                }
                            }
                            count++;
                        });
                    })
                })
            },
            getRules(name) {
                return this.rules[name];
            },
            getValue(name) {
                return this.group[name];
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-inline`]: this.inline
                    }
                ]
            }
        },
        mounted() {
            this.fields = this.$children.filter((child) => {
                return child.name;
            })
        }
    }
</script>