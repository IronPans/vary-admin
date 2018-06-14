<template>
    <i :class="classes" @click="handleClick">
        <template v-if="!wi">
            {{icon}}
        </template>
    </i>
</template>

<script>
    const prefixCls = 'va-icon';

    export default {
        name: "va-icon",
        props: {
            icon: {
                type: String,
                default: ''
            },
            wi: {
                type: false
            }
        },
        methods: {
            handleClick(event) {
                this.$emit('click', event);
            }
        },
        computed: {
            classes() {
                const icon = this.wi ? 'wi' : 'material-icons';
                return [
                    prefixCls,
                    icon,
                    {
                        'va-wi': this.wi,
                        [`${this.icon}`]: this.wi
                    }
                ]
            }
        }
    }
</script>