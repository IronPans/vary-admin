<template>
    <icon :class="classes">{{icon}}</icon>
</template>

<script>
    const prefixCls = 'v-icon';

    export default {
        name: "vIcon",
        props: {
            icon: {
                type: String,
                default: ''
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    'material-icons'
                ]
            }
        }
    }
</script>

<style scoped>

</style>