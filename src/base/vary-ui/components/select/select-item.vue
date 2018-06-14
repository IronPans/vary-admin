<template>
    <li :class="classes" @click="handleClick">
        <div class="free-select-item-content">
            <span v-if="option.label">{{option.label}}</span>
        </div>
    </li>
</template>

<script>
    const prefixCls = 'va-select-item';

    export default {
        name: 'va-select-item',
        props: {
            option: {
                type: Object
            },
            index: {
                type: Number
            }
        },
        data() {
            return {
                prefixCls
            }
        },
        methods: {
            handleClick() {
                this.$emit('on-click', this.option);
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-active`]: this.$parent.compareWith(this.option.value)
                    }
                ]
            }
        },
        created() {
            this.$parent.addGroup(this);
        }
    }
</script>