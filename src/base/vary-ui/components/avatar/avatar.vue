<template>
    <span :class="classes" :style="styles">
        <img v-if="src" :src="src" :alt="alt">
        <va-icon v-if="icon" :icon="icon"/>
    </span>
</template>

<script>
    import {oneOf, getSize} from '../base/utils';

    const prefixCls = 'va-avatar';

    export default {
        name: 'va-avatar',
        props: {
            alt: {
                type: String
            },
            icon: {
                type: String
            },
            src: {
                type: String
            },
            width: {
                type: String | Number
            },
            height: {
                type: String | Number
            },
            theme: {
                validator(value) {
                    return oneOf(value, ['primary', 'info', 'success', 'info', 'error']);
                }
            }
        },
        computed: {
            classes() {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.theme}`]: this.theme
                    }
                ];
            },
            styles() {
                return {
                    width: getSize(this.width),
                    height: getSize(this.height)
                }
            }
        }
    }
</script>

<style scoped></style>