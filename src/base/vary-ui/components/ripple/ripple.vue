<template>
    <div :class="classes" ref="node">
        <div v-for="(child, index) in children" :key="index.toString()" :class="prefixCls"
        :style="{backgroundColor: color}" @animationend="handleAnimationEnd(child)"></div>
    </div>
</template>

<script>
    import {listen} from '../base/event';
    import {getRect, addClass, css} from '../base/dom';

    const prefixCls = 'va-ripple';

    export default {
        name: 'va-ripple',
        props: {
            centerMode: {
                type: Boolean
            },
            color: {
                type: String
            },
            hidden: {
                type: Boolean,
                default: true
            },
            size: {
                type: String
            }
        },
        data() {
            return {
                prefixCls,
                children: [],
                now: new Date(),
                seed: 0,
                rippleNode: null,
                isMobile: false,
                clickListener: null
            }
        },
        computed: {
          classes() {
              return [
                  prefixCls + '-group',
                  {
                      [`${prefixCls}-hidden`]: this.hidden
                  }
              ]
          }
        },
        methods: {
            getUuid() {
                return `Ripple-${this.now}_${this.seed++}`;
            },
            getPoint(event) {
                event = event || window.event;
                return this.isMobile ? event.changedTouches[0] : event;
            },

            ripple(event, element) {
                const touchEvent = this.getPoint(event);
                const {centerMode, size: sizeProps} = this;
                let x = touchEvent.pageX ||
                    document.documentElement.scrollLeft + document.body.scrollLeft + touchEvent.clientX;
                let y = touchEvent.pageY ||
                    document.documentElement.scrollTop + document.body.scrollTop + touchEvent.clientY;
                const parentNode = this.rippleNode.parentNode;
                const {offsetWidth, offsetHeight} = parentNode;
                const scale = sizeProps === 'sm' ? 2 : 1;
                let size = Math.max(offsetWidth, offsetHeight) * 2;
                const rect = getRect(parentNode);
                if (!centerMode) {
                    x = x - rect.left - size / 2;
                    y = y - rect.top - size / 2;
                } else {
                    x = y = -size / 4;
                }
                if (sizeProps === 'sm') {
                    x = y = 0;
                }
                css(element, {
                    width: size / scale + 'px',
                    height: size / scale + 'px',
                    top: y + 'px',
                    left: x + 'px'
                });
                addClass(element, `${prefixCls}-Effect`);
            },

            handleTouchStart(event) {
                const children = [...this.children];
                children.push(this.getUuid());
                this.children = children;
                setTimeout(() => {
                    const activeIndex = children.length - 1;
                    const rippleChild = this.rippleNode.querySelectorAll(`.${prefixCls}`);
                    if (rippleChild[activeIndex]) {
                        this.ripple(event, rippleChild[activeIndex]);
                    }
                }, 0);
            },

            handleAnimationEnd(key) {
                this.children = this.children.filter((child) => {
                    return key !== child;
                });
            }
        },
        beforeCreate() {
            this.isMobile = 'ontouchstart' in document;
        },
        mounted() {
            this.rippleNode = this.$refs.node;
            const touchstart = this.isMobile ? 'touchstart' : 'mousedown';
            this.clickListener = listen(this.rippleNode.parentNode, touchstart, this.handleTouchStart);
        },
        beforeDestroy() {
            if (this.clickListener) {
                this.clickListener();
                this.clickListener = null;
            }
        }
    }
</script>