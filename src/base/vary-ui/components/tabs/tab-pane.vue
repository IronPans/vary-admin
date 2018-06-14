<template>
    <div :class="classes">
        <slot/>
    </div>
</template>

<script>
    const prefixCls = 'va-tab-pane';

    export default {
        name: "vaTabPane",
        props: {
            label: {
                type: String
            },
            index: {
                type: Number
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls
                ]
            }
        }
    }
</script>

<style scoped>

</style>