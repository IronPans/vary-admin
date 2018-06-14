<template>
    <div :class="`${prefixCls}`"><slot/></div>
</template>

<script>
    const prefixCls = 'va-collapse';

    export default {
        name: "va-collapse",
        props: {
            accordion: {
                type: Boolean,
                default: false
            },
            value: {
                type: [Array, String]
            }
        },
        data() {
            return {
                prefixCls,
                currentValue: this.value
            }
        },
        mounted() {
            this.setActive();
        },
        methods: {
            setActive() {
                const currentValue = this.getCurrentValue();

                this.$children.forEach((child, index) => {
                    child.isActive = currentValue.indexOf(child.name || index) > -1;
                    child.index = index;
                });
            },
            getCurrentValue() {
                let currentValue = this.currentValue || [];
                const accordion = this.accordion;

                if (!Array.isArray(currentValue)) {
                    currentValue = [currentValue];
                }

                if (accordion && currentValue.length > 1) {
                    currentValue = [currentValue[currentValue.length - 1]];
                }
                return currentValue;
            },
            toggle({index, isActive}) {
                const accordion = this.accordion;
                let currentValue = this.currentValue || [];

                if (accordion) {
                    currentValue = isActive ? [] : [index];
                } else if (isActive) {
                    currentValue = currentValue.filter((value) => {
                        return index !== value;
                    });
                } else {
                    currentValue.push(index);
                }
                this.currentValue = currentValue;
                this.$emit('input', this.currentValue);
                this.$emit('on-change', this.currentValue);
            }
        },
        watch: {
            value(val) {
                this.currentValue = val;
            },
            currentValue() {
                this.setActive();
            }
        }
    }
</script>