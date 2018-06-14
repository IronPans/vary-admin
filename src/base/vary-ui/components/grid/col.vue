<template>
    <div :class="classes" :style="style">
        <slot/>
    </div>
</template>

<script>

    export default {
        name: "VaCol",
        props: {
            lg: {
                type: Number
            },
            md: {
                type: Number
            },
            offset: {
                type: Number
            },
            order: {
                type: Number
            },
            sm: {
                type: Number
            },
            span: {
                type: Number
            },
            xs: {
                type: Number
            }
        },
        data() {
            return {
                style: {}
            }
        },
        computed: {
            classes() {
                let colClass = [];
                const sizes = ['lg', 'md', 'sm', 'xs'];
                const {offset, order, span} = this;
                for (const col of sizes) {
                    let sizeProps = {};
                    const colProps = this[col];
                    if (!colProps) {
                        continue;
                    }
                    if (typeof colProps === 'number') {
                        sizeProps.span = colProps;
                    } else if (typeof colProps === 'object') {
                        sizeProps = colProps || {};
                    }
                    colClass.push({
                        [`col-${col}-${sizeProps.span}`]: sizeProps.span >= 0,
                        [`col-${col}-offset-${sizeProps.offset}`]: sizeProps.offset,
                        [`col-order-${sizeProps.order}`]: sizeProps.order
                    });
                }
                return [{
                    [`col-${span}`]: span >= 0,
                    [`col-offset-${offset}`]: !!offset,
                    [`col-order-${order}`]: !!order
                }, ...colClass];
            }
        }
    }
</script>

<style scoped>

</style>