<template>
    <div class="va-scroll" ref="scroll" :style="userSelectStyle"
         @mouseover="onMouseEnter" @mouseleave="onMouseLeave">
        <div class="va-scroll-wrapper">
            <div class="va-scroll-inner">
                <slot></slot>
            </div>
        </div>
        <div class="va-scroll-scrollbar" ref="bar"
             @mouseover="onMouseEnter" @mouseleave="onMouseLeave">
            <div class="va-scroll-track" ref="track"></div>
            <div class="va-scroll-thumb" ref="thumb"></div>
        </div>
    </div>
</template>

<script>
    import {css, addClass, removeClass, setTransform} from '../base/dom';
    import {listen, getTouchEvent} from '../base/event';
    import {getRequestAnimationFrame, getBrowser} from '../base/utils';

    const prefixCls = 'va-scroll';

    export default {
        name: 'VaScroll',
        props: {
            options: {
                type: Object
            }
        },
        data() {
            return {
                prefixCls,
                defaults: {
                    width: 'auto',
                    height: '250px',
                    size: '7px',
                    position: 'right',
                    alwaysVisible: false,
                    wheelStep: 20,
                    distance: '2px',
                    thumbDraggable: true,
                    touchScrollStep: 200,
                    thumbBorderRadius: '2px',
                    trackBorderRadius: '2px',
                    thumbColor: 'rgba(0, 0, 0, 0.29804)',
                    trackColor: '#e0e0e0',
                    showBar: true
                },
                animationFrame: null,
                minBarHeight: 30,
                scrollTop: 0,
                params: {},
                WHEEL_EV: '',
                originparams: {},
                scrollElem: null,
                thumb: null,
                bar: null,
                track: null,
                wrapper: null,
                isOverBar: false
            }
        },
        computed: {
            userSelectStyle() {
                return {
                    'user-select': this.isOverBar ? 'none' : 'auto',
                    'cursor': this.isOverBar ? 'default' : 'auto'
                }
            }
        },
        methods: {
            setBarStyle() {
                css(this.scrollElem, {
                    overflow: 'hidden',
                    position: 'relative',
                    width: this.params.width,
                    height: this.params.height
                });
                css(this.bar, {
                    position: 'absolute',
                    opacity: .01,
                    width: this.params.size,
                    top: 0,
                    bottom: 0,
                    overflow: 'hidden',
                    zIndex: 101,
                    transition: 'all .2s'
                });
                css(this.track, {
                    position: 'absolute',
                    width: this.params.size,
                    top: 0,
                    bottom: 0,
                    MozBorderRadius: this.params.trackBorderRadius,
                    WebkitBorderRadius: this.params.trackBorderRadius,
                    borderRadius: this.params.trackBorderRadius,
                    background: this.params['trackColor']
                });
                if (this.params['trackClass']) {
                    addClass(this.track, this.params['trackClass']);
                }
                const dist = this.params.position === 'left' ?
                    {left: this.params.distance} : {right: this.params.distance};
                css(this.bar, dist);
                css(this.wrapper, {
                    position: 'relative',
                    zIndex: '10'
                });
                css(this.thumb, {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 100,
                    MozBorderRadius: this.params.thumbBorderRadius,
                    WebkitBorderRadius: this.params.thumbBorderRadius,
                    borderRadius: this.params.thumbBorderRadius,
                    background: this.params['thumbColor']
                });
                if (this.params['thumbClass']) {
                    addClass(this.thumb, this.params['thumbClass']);
                }
            },

            setUserSelect() {
                this.isOverBar = !this.isOverBar;
            },

            scrollContent(y, isWheel, isTo, event) {
                let delta = y;
                if (this.maxScrollTop > 0) {
                    if (isWheel) {
                        delta = this.scrollTop + y * this.defaults.wheelStep / 100 * this.barHeight;
                        delta = Math.min(Math.max(delta, 0), this.maxScrollTop);
                        delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
                        setTransform(this.thumb, 'translate3d(0, ' + delta + 'px, 0');
                        this.scrollTop = delta;
                    }
                    const percentScroll = this.scrollTop / (this.outerHeight - this.barHeight);
                    delta = percentScroll * (this.scrollHeight - this.outerHeight);
                    if (isTo) {
                        delta = y;
                        let offsetTop = y / this.scrollHeight * this.outerHeight;
                        offsetTop = Math.min(Math.max(offsetTop, 0), this.maxScrollTop);
                        setTransform(this.thumb, 'translate3d(0, ' + offsetTop + 'px, 0');
                    }
                    setTransform(this.wrapper, 'translate3d(0, -' + Math.ceil(delta) + 'px, 0');
                }
                if (this.initial) {
//                    this.onContentScroll.emit({
//                        event: event,
//                        scrollTop: this.scrollTop,
//                        end: this.maxScrollTop <= this.scrollTop
//                    });
                }
                this.showBar();
                this.hideBar();
            },

            refresh() {
                if (this.requestAnimationId) {
                    this.animationFrame.clearAnimationFrame(this.requestAnimationId);
                }
                if (this.scrollElem) {
                    this.scrollHeight = this.scrollElem.scrollHeight;
                    this.outerHeight = this.scrollElem.offsetHeight;
                    this.barHeight = Math.max((this.outerHeight / this.scrollHeight)
                        * this.outerHeight, this.minBarHeight);
                    this.maxScrollTop = this.outerHeight - this.barHeight;
                    this.thumb.style.height = (this.barHeight) + 'px';
                }
                this.updatePosition();
                if (this.barHeight === this.outerHeight) {
                    this.hideBar();
                }
//                this.requestAnimationId = this.animationFrame.setAnimationFrame(() => {
//                    this.refresh();
//                });
            },

            updatePosition() {
                let top = this.scrollTop || 0;
                top = Math.min(Math.max(top, 0), this.maxScrollTop);
                this.scrollTop = top;
                this.scrollTo(top, 0, true);
            },

            scrollTo(y, x, isTo) {
                const percentScroll = y / (this.outerHeight - this.barHeight);
                const delta = percentScroll * (this.scrollHeight - this.outerHeight);
                setTransform(this.thumb, 'translate3d(0, ' + y + 'px, 0');
                if (isTo) {
                    setTransform(this.wrapper, 'translate3d(0, -' + Math.ceil(delta) + 'px, 0');
                }
            },

            reset() {
                this.scrollTop = 0;
                setTransform(this.thumb, 'translate3d(0, 0px, 0');
                setTransform(this.wrapper, 'translate3d(0, ' + this.scrollTop + 'px, 0');
            },

            onWheel(e) {
                let wheelDeltaY;
                if ('wheelDelta' in e) {// down -120，up 120
                    wheelDeltaY = -e.wheelDelta / 120;
                } else if ('detail' in e) { // down 3，up -3
                    wheelDeltaY = e.detail * 3;
                } else {
                    return;
                }
                if (!this.isLoading) {
                    this.isRunning = true;
                    this.scrollContent(wheelDeltaY, true, false, e);
                }
                if (e.preventDefault) {
                    e.preventDefault();
                }
            },

            showBar() {
                clearTimeout(this.queueHide);
                if (!this.params['alwaysVisible'] && this.maxScrollTop > 0) {
                    css(this.bar, {
                        opacity: .9
                    });
                }
            },

            hideBar() {
                if (!this.params['alwaysVisible'] && this.maxScrollTop >= 0) {
                    this.queueHide = setTimeout(() => {
                        if (!this.isDragg) {
                            css(this.bar, {
                                opacity: .01
                            });
                        }
                    }, 500);
                }
            },

            onMouseEnter() {
                this.showBar();
            },

            onMouseLeave() {
                this.hideBar();
            },

            onTouch(event) {
                this.refresh();
                this.isDragg = true;
                let ev = event || window['event'];
                if (this.isMobile) {
                    ev = ev.changedTouches[0];
                    this.showBar();
                }
                let target = 'document';
                if (this.isOverContent) {
                    target = this.scrollElem;
                }
                let pageY = ev.pageY;
                let pageX = ev.pageX;
                this.documentTouchmoveListener = listen(target, this.TOUCH_EV.touchmove, (e) => {
                    let vm = e || window['event'];
                    if (this.isMobile) {
                        vm = vm.changedTouches[0];
                    }
                    if (this.isDragg) {
                        if (this.isMobile) {
                            const diff = (pageY - vm.pageY) / this.params.touchScrollStep;
                            this.scrollContent(diff, true, false, event);
                        } else {
                            const t = this.scrollTop + vm.pageY - pageY;
                            this.scrollTop = t;
                            setTransform(this.thumb, 'translate3d(0, ' + t + 'px, 0');
                            this.scrollContent(0, this.scrollTop, false, event);
                        }
                        pageY = vm.pageY;
                        pageX = vm.pageX;
                    }
                });
                this.documentTouchendListener = listen('document', this.TOUCH_EV.touchend, () => {
                    this.isDragg = false;
                    this.setUserSelect();
                    if (this.isMobile) {
                        this.hideBar();
                    }
                    this.unbindDocumentTouchListener();
                });
            },

            unbindDocumentTouchListener() {
                if (this.documentTouchmoveListener) {
                    this.documentTouchmoveListener();
                    this.documentTouchmoveListener = null;
                }
                if (this.documentTouchendListener) {
                    this.documentTouchendListener();
                    this.documentTouchendListener = null;
                }
            }
        },
        created() {
            this.animationFrame = getRequestAnimationFrame();
            this.isMoz = getBrowser() === 'FF';
            this.WHEEL_EV = this.isMoz ? 'DOMMouseScroll' : 'mousewheel';
            this.originparams = this.params;
            const params = {};
            Object.assign(params, this.defaults, this.options);
            this.params = params;
            this.TOUCH_EV = getTouchEvent();
            this.isMobile = this.TOUCH_EV.mobile;
        },
        mounted() {
            this.scrollElem = this.$refs.scroll;
            this.thumb = this.$refs.thumb;
            this.bar = this.$refs.bar;
            this.track = this.$refs.track;
            this.wrapper = this.scrollElem.querySelector('.va-scroll-wrapper');
            this.setBarStyle();
            if (this.isMobile) {
                this.documentTouchListener = listen(this.scrollElem,
                    this.TOUCH_EV.touchstart, (e) => {
                        this.onTouch(e);
                        this.isOverContent = true;
                    });
            }
            this.wheelListener = listen(this.scrollElem, this.WHEEL_EV, (e) => this.onWheel(e));
            this.thumbTouchstartListener = listen(this.thumb,
                this.TOUCH_EV.touchstart, (e) => {
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    this.setUserSelect();
                    this.onTouch(e);
                    this.isOverContent = false;
                });
            this.refresh();
            let offset = this.scrollTop;
            if ('scrollTo' in this.params) {
                offset = parseInt(this.params['scrollTo'], 10);
            }
            css(this.bar, {
                opacity: .9
            });
            this.scrollContent(offset, false, true);
            this.initial = true;
            if (!this.params['alwaysVisible']) {
                this.hideBar();
            }
        },
        beforeDestroy() {
            if (this.documentTouchListener) {
                this.documentTouchListener();
                this.documentTouchListener = null;
            }
            if (this.thumbTouchstartListener) {
                this.thumbTouchstartListener();
                this.thumbTouchstartListener = null;
            }
            if (this.requestAnimationId) {
                this.animationFrame.clearAnimationFrame(this.requestAnimationId);
            }
            if (this.wheelListener) {
                this.wheelListener();
                this.wheelListener = null;
            }
            this.unbindDocumentTouchListener();
            this.queueHide = null;
        }
    }
</script>