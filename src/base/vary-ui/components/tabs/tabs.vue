<template>
    <div :class="classes">
        <div :class="navClass" ref="nav">
            <div :class="`${prefixCls}-nav-wrapper`" ref="wrapper" :style="navStyle"
                 @mousedown="handleMousedown" @touchstart="handleTouchstart">
                <div :class="tabClasses(index)" v-for="(tab, index) in tabList"
                     @click="tabClick(index)" :key="index.toString()">
                    {{tab.label}}
                </div>
                <div :class="`${prefixCls}-indicator`" :style="lineStyle"></div>
            </div>
        </div>
        <div :class="contentClass">
            <div :class="`${prefixCls}-wrapper`" :style="wrapperStyle">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import {oneOf} from '../base/utils';
    import {setTransitionDuration} from '../base/dom';

    const prefixCls = 'va-tabs';

    export default {
        name: "va-tabs",
        props: {
            activekey: {
                type: Number,
                default: 0
            },
            animated: {
                type: Boolean,
                default: true
            },
            centermode: {
                type: Boolean,
                default: false
            },
            position: {
                validator(value) {
                    return oneOf(value, ['top', 'left', 'bottom', 'right']);
                },
                default: 'top'
            },
            scrollable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                activeIndex: this.activeKey,
                tabList: [],
                prefixCls,
                lineSize: 0,
                lineOffset: 0,
                wrapperWidth: 0,
                wrapperHeight: 0,
                navOffsetX: 0,
                navOffsetY: 0,
                touches: {},
                dragging: false,
                isMobile: false
            }
        },
        computed: {
            classes() {
                return `${prefixCls}`;
            },
            navClass() {
                return `${prefixCls}-nav`;
            },
            contentClass() {
                return `${prefixCls}-content`;
            },
            lineStyle() {
                let style = {
                    width: `${this.lineSize}px`
                };
                style.left = `${this.lineOffset}px`;
                return style;
            },
            wrapperStyle() {
                const percent = this.activeIndex;
                const horizontal = this.position === 'left' || this.position === 'right';
                return {
                    transform: !horizontal ? `translate3d(-${percent}00%, 0, 0)` : `translate3d(0, -${percent}00%, 0)`,
                    WebkitTransform: !horizontal ? `translate3d(-${percent}00%, 0, 0)` : `translate3d(0, -${percent}00%, 0)`,
                    msTransform: !horizontal ? `translate3d(-${percent}00%, 0, 0)` : `translate3d(0, -${percent}00%, 0)`,
                    WebkitTransition: this.animated ? '-webkit-transform .3s cubic-bezier(0.35, 0, 0.25, 1)' : '',
                    transition: this.animated ? 'transform .3s cubic-bezier(0.35, 0, 0.25, 1)' : ''
                };
            },
            navStyle() {
                return {
                    transform: `translate3d(${this.navOffsetX}px, 0, 0)`
                }
            }
        },
        methods: {
            refresh() {
                const tabs = this.$children;
                tabs.forEach((tab, index) => {
                    this.tabList.push({
                        label: tab.label || '',
                        index
                    })
                });
            },
            getLineOffset() {
                const index = this.activeIndex || 0;
                let width = 0, height = 0, left = 0, top = 0;
                const navNode = this.$refs.nav;
                if (navNode) {
                    const tabs = navNode.querySelectorAll('.va-tabs-tab');
                    for (let i = 0; i < tabs.length; i++) {
                        if (i < index) {
                            left += tabs[i].offsetWidth;
                            top += tabs[i].offsetHeight;
                        }
                        if (i === index) {
                            width = tabs[i].offsetWidth;
                            height = tabs[i].offsetHeight;
                        }
                    }
                }
                return {
                    width, left, height, top
                }
            },
            updateIndicator() {
                this.$nextTick(() => {
                    const lineRect = this.getLineOffset();
                    if (this.position === 'left' || this.position === 'right') {
                        this.lineOffset = lineRect.top;
                        this.lineSize = lineRect.height;
                    } else {
                        this.lineOffset = lineRect.left;
                        this.lineSize = lineRect.width;
                    }
                })
            },
            updateNav() {
                const {width, height, left, top} = this.getLineOffset();
                const wrapperNode = this.$refs.wrapper;
                const tabNode = this.$refs.nav;
                if (this.centermode) {
                    setTransitionDuration(wrapperNode, 300);
                    if (this.position === 'left' || this.position === 'right') {
                        const navHeight = tabNode.offsetHeight;
                        const wrapperHeight = wrapperNode.offsetHeight;
                        const offsetY = top + height / 2;
                        let diffHeight = offsetY - navHeight / 2;
                        if (diffHeight > 0) {
                            if ((wrapperHeight - top - height) <= navHeight / 2) {
                                diffHeight = wrapperHeight - navHeight;
                            }
                            this.wrapperHeight = wrapperNode.offsetHeight;
                            this.navOffsetY = -diffHeight;
                        }
                    } else {
                        const navWidth = tabNode.offsetWidth;
                        const wrapperWidth = wrapperNode.offsetWidth;
                        const offsetX = left + width / 2;
                        let diffWidth = offsetX - navWidth / 2;
                        if (diffWidth > 0) {
                            if ((wrapperWidth - left - width) <= navWidth / 2) {
                                diffWidth = wrapperWidth - navWidth;
                            }
                        } else {
                            diffWidth = 0;
                        }
                        this.wrapperWidth = wrapperNode.offsetWidth;
                        this.navOffsetX = -diffWidth;
                    }
                }
            },
            tabClasses(index) {
                return [
                    `${prefixCls}-tab`,
                    {
                        [`${prefixCls}-tab-active`]: index === this.activeIndex
                    }
                ];
            },
            tabClick(index) {
                this.activeIndex = index;
            },
            getPoint(e) {
                const touchEvent = this.isMobile ? e.changedTouches[0] : e;
                return {
                    x: touchEvent.pageX || touchEvent.clientX,
                    y: touchEvent.pageY || touchEvent.clientY
                };
            },
            handleMousedown(event) {
                if (!this.isMobile) {
                    this.swipeStart(event);
                }
            },
            handleTouchstart(event) {
                if (this.isMobile) {
                    this.swipeStart(event);
                }
            },
            swipeStart(event) {
                const wrapperNode = this.$refs.wrapper;
                const tabNode = this.$refs.nav;
                this.touches.moveWith = wrapperNode.offsetWidth - tabNode.offsetWidth;
                this.touches.moveHeight = wrapperNode.offsetHeight - tabNode.offsetHeight;
                if (this.scrollable && this.touches.moveWith > 0) {
                    setTransitionDuration(wrapperNode, 0);
                    event.stopPropagation();
                    const {x, y} = this.getPoint(event);
                    this.dragging = true;
                    this.touches.startX = x;
                    this.touches.startY = y;
                    document.addEventListener(this.isMobile ? 'touchmove' : 'mousemove', this.swipeMove);
                    document.addEventListener(this.isMobile ? 'touchend' : 'mouseup', this.swipeEnd);
                }
            },
            swipeMove(event) {
                event.stopPropagation();
                if (this.dragging) {
                    let {x, y} = this.getPoint(event);
                    let diffX = x - this.touches.startX + this.navOffsetX;
                    let diffY = y - this.touches.startY + this.navOffsetY;
                    this.navOffsetX = Math.max(Math.min(0, diffX), -this.touches.moveWith);
                    this.navOffsetY = Math.max(Math.min(0, diffY), -this.touches.moveHeight);
                    this.touches.startX = x;
                    this.touches.startY = y;
                }
            },
            swipeEnd(event) {
                event.stopPropagation();
                this.dragging = false;
                document.removeEventListener(this.isMobile ? 'touchmove' : 'mousemove', this.swipeMove);
                document.removeEventListener(this.isMobile ? 'touchend' : 'mouseup', this.swipeEnd);
            }
        },
        mounted() {
            this.isMobile = 'ontouchstart' in document;
            this.refresh();
            this.updateIndicator();
            this.updateNav();
        },
        watch: {
            activeKey(val) {
                this.activeIndex = val;
            },
            activeIndex() {
                this.updateIndicator();
                this.updateNav();
            }
        }
    }
</script>