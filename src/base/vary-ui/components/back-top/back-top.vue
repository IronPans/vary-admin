<template>
    <div :class="prefixCls" :style="styles" v-show="visible" @click="handleClick" ref="node">
        <slot></slot>
    </div>
</template>

<script>
    import EASINGS from '../base/easing';
    import {getScrollParent} from '../base/dom';
    import {listen} from '../base/event';
    import {getSize} from '../base/utils';

    const prefixCls = 'va-back-top';

    export default {
        name: 'va-back-top',
        props: {
            destination: {
                type: Number,
                default: 0
            },
            duration: {
                type: Number,
                default: 200
            },
            easing: {
                type: String,
                default: 'linear'
            },
            target: {
                type: Object
            },
            bottom: {
                type: [Number, String],
                default: 30
            },
            right: {
                type: [Number, String],
                default: 30
            },
            height: {
                type: Number,
                default: 10
            }
        },
        data() {
            return {
                prefixCls,
                visible: false,
                startTime: 0,
                startY: 0,
                scrollNode: null,
                scrollListener: null
            }
        },
        computed: {
            styles() {
                return {
                    bottom: getSize(this.bottom),
                    right: getSize(this.right)
                }
            }
        },
        methods: {
            scroll() {
                if (!this.scrollNode) {
                    return;
                }
                const {destination, duration, easing} = this;
                let now = Date.now();
                let time = Math.min(1, (now - this.startTime) / duration);
                let timeFunction = EASINGS[easing](time);
                this.scrollNode.scrollTop = timeFunction * (destination - this.startY) + this.startY;
                if (this.scrollNode.scrollTop === destination) {
                    this.$emit('on-scroll-end');
                    return;
                }
                window.requestAnimationFrame(this.scroll);
            },

            handleClick() {
                this.startTime = Date.now();
                this.startY = this.scrollNode.scrollTop;
                this.scroll();
            }
        },
        mounted() {
            let scrollNode = this.target;
            if (!scrollNode) {
                scrollNode = getScrollParent(this.$refs.node);
            }
            this.scrollNode = scrollNode;
            this.scrollListener = listen(this.scrollNode, 'scroll', (e) => {
                const scrollTop = e.target.scrollTop;
                if (scrollTop > parseFloat(this.height, 10)) {
                    this.visible = true;
                } else if (scrollTop <= this.destination) {
                    this.visible = false;
                }
            })
        },
        beforeDestroy() {
            if (this.scrollListener) {
                this.scrollListener();
                this.scrollListener = null;
            }
        }
    }
</script>