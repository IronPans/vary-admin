<template>
    <div :class="classes">
        <div :class="`${prefixCls}-overlay`" @click="close"></div>
        <transition :name="transitionName">
            <div :class="`${prefixCls}-inner`" v-if="reveal">
                <slot/>
            </div>
        </transition>
    </div>
</template>

<script>
    import {oneOf} from '../base/utils';

    const prefixCls = 'va-sidebar';

    export default {
        name: 'va-sidebar',
        model: {
            prop: 'open',
            event: 'change'
        },
        props: {
            dir: {
                validator(value) {
                    return oneOf(value, ['left', 'right'])
                },
                default: 'left'
            },
            drawer: {
                default: true
            },
            open: {
                default: false
            }
        },
        data() {
            return {
                prefixCls,
                reveal: this.open,
                transitionName: 'moveInLeft'
            }
        },
        methods: {
            close() {
                this.reveal = false;
                this.$emit('change', this.reveal);
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-open`]: this.reveal,
                        [`${prefixCls}-drawer`]: this.drawer
                    },
                    `${prefixCls}-${this.dir}-reveal`
                ]
            }
        },
        watch: {
            open(val) {
                this.reveal = val;
            }
        },
        mounted() {
            this.transitionName = `moveIn${this.dir.charAt(0).toUpperCase() + this.dir.slice(1)}`;
        }
    }
</script>