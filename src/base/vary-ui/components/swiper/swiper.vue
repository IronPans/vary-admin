<template>
    <div :class="classes">
        <div :class="`${prefixCls}-wrapper`" ref="wrapper"
             :style="{height: params.horizontal ? '100%' : params.height}">
            <div :class="`${prefixCls}-list`" ref="slider" :style="listStyles" @transitionend="onTransitionEnd">
                <slot></slot>
            </div>
        </div>
        <div :class="`${prefixCls}-pagination`" v-if="params.pagination">
            <div :class="`${prefixCls}-pagination-bullets`">
                <div v-for="bullet in bullets" :class="bulletClasses(bullet)" @click="paginationClick(bullet)"></div>
            </div>
        </div>
        <template v-if="params.navigation">
            <div :class="prevClasses" @click.stop="handleNavigation(false)"></div>
            <div :class="nextClasses" @click.stop="handleNavigation(true)"></div>
        </template>
    </div>
</template>

<script>
    import {listen} from "../base/event";
    import {setTransitionDuration, parents} from '../base/dom';

    const prefixCls = 'va-swiper';

    const defaults = {
        activeIndex: 0,
        autoplay: false,
        autoplayDisableOnInteraction: false,
        centerMode: false,
        direction: 'horizontal',
        easing: 'ease',
        effect: 'slide',
        initialSlide: 0,
        loop: false,
        observe: false,
        observeParents: false,
        pagination: true,
        paginationClickable: false,
        slideWidth: 0,
        slideHeight: 0,
        spaceBetween: 0,
        speed: 300,
        delay: 3000,
        touch: false
    };

    export default {
        name: 'va-swiper',
        props: {
            options: {
                type: Object,
                default() {
                    return defaults;
                }
            }
        },
        data() {
            return {
                prefixCls,
                currentIndex: 0,
                opacity: 0,
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                bullets: [],
                wrapper: '',
                slider: null,
                observers: [],
                isRunning: false,
                dragging: false,
                isMobile: false,
                total: 0,
                touches: {},
                resizeListener: null,
                centerOffset: 0,
                params: {...defaults, ...this.options}
            }
        },
        methods: {
            isHorizontal() {
                return this.params.direction === 'horizontal';
            },

            getCurrentSlide(slide) {
                let index = slide;
                if (index < 0) {
                    index = 0;
                } else {
                    index = index % this.total;
                }
                return index;
            },

            slideTo(index, speed = this.params.speed) {
                this.isRunning = true;
                const {width, height} = this;
                const {effect, loop, spaceBetween} = this.params;
                if (!loop) {
                    index = this.getCurrentSlide(index);
                }
                setTransitionDuration(this.slider, speed);
                let activeIndex = index;
                if (effect === 'fade') {
                    if (activeIndex < 0) {
                        activeIndex = this.total - 1;
                    } else if (activeIndex >= this.total) {
                        activeIndex = 0;
                    }
                }
                if (this.isHorizontal()) {
                    this.x = -(width + spaceBetween) * activeIndex + this.centerOffset;
                } else {
                    this.y = -(height + spaceBetween) * activeIndex;
                }
                this.currentIndex = activeIndex;
                this.opacity = 1;
                this.$emit('on-transition-start', {
                    index,
                    ev: this
                });

                if (!speed) {
                    this.isRunning = false;
                }
            },

            slidePrev(disabled = true) {
                if (disabled) {
                    return
                }
                this.currentIndex--;
                this.slideTo(this.currentIndex);
            },

            slideNext(disabled = true) {
                if (disabled) {
                    return
                }
                this.currentIndex++;
                this.slideTo(this.currentIndex);
            },

            handleNavigation(next) {
                const {loop} = this.params;
                const toPrev = this.currentIndex <= 0 && !loop;
                const toNext = this.currentIndex >= this.total - 1 && !loop;
                let disabled = toPrev;
                if (next) {
                    disabled = toNext;
                }
                if (disabled) {
                    return;
                }
                if (next) {
                    this.slideNext(disabled);
                } else {
                    this.slidePrev(disabled);
                }
            },

            getPoint(e) {
                const touchEvent = this.isMobile ? e.changedTouches[0] : e;
                return {
                    x: touchEvent.pageX || touchEvent.clientX,
                    y: touchEvent.pageY || touchEvent.clientY
                };
            },

            swipeStart(event) {
                if (this.params.touch && !this.isRunning) {
                    event.stopPropagation();
                    const {x, y} = this.getPoint(event);
                    this.dragging = true;
                    setTransitionDuration(this.slider, 0);
                    if (this.params.autoplayDisableOnInteraction) {
                        this.clearAutoplay();
                    }
                    this.touches.startX = x;
                    this.touches.startY = y;
                }
            },

            swipeMove(event) {
                event.stopPropagation();
                if (this.dragging && !this.isRunning) {
                    let {x, y} = this.getPoint(event);
                    const diffX = x - this.touches.startX;
                    const diffY = y - this.touches.startY;
                    const {effect, spaceBetween} = this.params;
                    const {width, currentIndex: activeIndex, height} = this;
                    if (effect === 'slide') {
                        const maxTranslate = this.isHorizontal() ? (width / 2) : (height / 2);
                        const minTranslate = 20;
                        const diff = this.isHorizontal ? diffX : diffY;
                        const position = diff / width * (maxTranslate - minTranslate);
                        let translate = this.isHorizontal() ? (-(width + spaceBetween) * activeIndex + position) :
                            (-(height + spaceBetween) * activeIndex + position);
                        const setPosition = (size) => {
                            const collapseEnd = (size * (this.count - 1) + maxTranslate);
                            if (!this.params.loop) {
                                if (translate > maxTranslate) {
                                    translate = maxTranslate;
                                } else if (Math.abs(translate) > collapseEnd) {
                                    translate = -collapseEnd;
                                }
                            }
                        };
                        if (this.isHorizontal()) {
                            setPosition(width);
                            this.x = translate + this.centerOffset;
                        } else {
                            setPosition(height);
                            this.y = translate;
                        }
                    } else {
                        const opacity = this.isHorizontal() ?
                            (Math.abs(diffX) / width) : Math.abs(diffY) / height;
                        this.opacity = opacity;
                    }
                    this.touches.diffX = diffX;
                    this.touches.diffY = diffY;
                    this.touches.currentX = x;
                    this.touches.currentY = y;
                }
            },

            swipeEnd(event) {
                event.stopPropagation();
                if (this.dragging && !this.isRunning) {
                    let {currentIndex: activeIndex, width, height} = this;
                    const {loop} = this.params;
                    const {diffX, diffY} = this.touches;
                    const diffWidth = width / 5;
                    const diffHeight = height / 5;
                    const getActiveIndex = (diff, dist) => {
                        if (Math.abs(diff) > dist) {
                            if (diff < 0 && (loop || activeIndex !== this.count - 1)) {
                                activeIndex++;
                            } else if (diff > 0 && (loop || activeIndex !== 0)) {
                                activeIndex--;
                            }
                        }
                    };
                    if (this.isHorizontal()) {
                        getActiveIndex(diffX, diffWidth);
                    } else {
                        getActiveIndex(diffY, diffHeight);
                    }
                    this.$emit('on-slide-change', {
                        index: activeIndex,
                        ev: this
                    });
                    if (this.params.effect === 'fade') {
                        if (activeIndex < 0) {
                            activeIndex = this.count - 1;
                        } else if (activeIndex >= this.count) {
                            activeIndex = 0;
                        }
                    }
                    this.slideTo(activeIndex);
                }
                this.dragging = false;
            },

            bulletClasses(index) {
                return [
                    `${prefixCls}-pagination-bullet`,
                    {
                        [`${prefixCls}-pagination-bullet-active`]: this.currentIndex === index,
                        [`${prefixCls}-pagination-clickable`]: this.params.paginationClickable
                    }
                ]
            },

            paginationClick(index) {
                if (!this.params.paginationClickable) {
                    return;
                }
                if (this.params.autoplayDisableOnInteraction) {
                    this.clearAutoplay();
                }
                this.slideTo(index);
            },

            updateSize(size, slideSize) {
                if (size) {
                    if (isNaN(Number(size))) {
                        if (size.indexOf('%')) {
                            slideSize *= size / 100;
                        } else {
                            slideSize = parseFloat(size);
                        }
                    } else {
                        if (size < 1) {
                            slideSize *= size;
                        } else {
                            slideSize = size;
                        }
                    }
                }
                return slideSize;
            },

            reset(cb) {
                if (!this.slider.firstElementChild) {
                    return;
                }
                const height = this.slider.firstElementChild.offsetHeight;
                const slideWidth = this.params.slideWidth;
                const slideHeight = this.params.slideHeight;
                const width = this.wrapper.offsetWidth;
                if (this.params.centerMode) {
                    this.centerOffset = Math.round(width * (1 - slideWidth) / 2);
                }
                this.width = this.updateSize(slideWidth, width);
                this.height = this.updateSize(slideHeight, height);
                if (typeof cb === 'function') {
                    cb();
                }
            },

            startAutoplay() {
                if (this.autoPlayTimer) {
                    return false;
                }
                this.autoPlayTimer = setInterval(() => {
                    setTransitionDuration(this.slider, this.params.speed);
                    this.slideNext(false);
                }, this.params.delay);
            },

            clearAutoplay() {
                if (this.autoPlayTimer) {
                    clearInterval(this.autoPlayTimer);
                    this.autoPlayTimer = null;
                }
            },

            onWindowResized() {
                this.reset(() => {
                    this.slideTo(this.getCurrentSlide(this.currentIndex), 0);
                });
            },

            onTransitionEnd() {
                let {currentIndex: activeIndex} = this;
                if (activeIndex < 0) {
                    activeIndex = this.count - 1;
                } else if (activeIndex >= this.count) {
                    activeIndex = 0;
                }
                this.$emit('on-transition-end', {
                    index: activeIndex,
                    ev: this
                });
                this.slideTo(activeIndex, 0);
                if (this.params.autoplay && !this.params.autoplayDisableOnInteraction) {
                    this.startAutoplay();
                }
                this.isRunning = false;
            },

            attach(target) {
                const MutationObserver = window['MutationObserver'] || window['WebKitMutationObserver'] || window['MozMutationObserver'];

                const observer = new MutationObserver((mutations) => {
                    mutations.forEach(() => {
                        this.reset();
                    });
                });

                // 配置观察选项:
                const config = {attributes: true, childList: true, characterData: true};

                // 传入目标节点和观察选项
                observer.observe(target, config);
                return observer;
            },

            observer() {
                if (this.params.observe) {
                    // 创建观察者对象
                    this.observers.push(this.attach(this.wrapper.parentNode));
                }

                if (this.params.observeParents) {
                    const containerParents = parents(this.wrapper);
                    for (let i = 0; i < containerParents.length; i += 1) {
                        this.observers.push(this.attach(containerParents[i]));
                    }
                }
            },
            getSize() {
                return this.$children.length;
            },
            getSlideStyles(index) {
                const {
                    easing, effect, loop, spaceBetween, speed
                } = this.params;
                const horizontal = this.isHorizontal();
                let {currentIndex: activeIndex, width, height, x, y} = this;
                const isFade = effect === 'fade';
                let opacity = 0;
                let left = horizontal ? index * width : 0,
                    top = !horizontal ? index * height : 0;
                const {diffX, diffY} = this.touches, styles = {};
                if (!isFade) {
                    if (loop && this.total > 2) {
                        if (this.total <= activeIndex + 1 && index === 0) {
                            horizontal ? (left = (width + spaceBetween) * this.total) : top = height * this.total;
                            styles['transform'] = `translate3d(${left}px, ${top}px, 0)`;
                        } else if (activeIndex <= 0 && this.total === index + 1) {
                            horizontal ? left = -(width + spaceBetween) * this.total : top = -height * this.total;
                            styles['transform'] = `translate3d(${left}px, ${top}px, 0)`;
                        }
                    }
                    opacity = 1;
                } else {
                    styles['transform'] = `translate3d(-${left}px, -${top}px, 0)`;
                    if (this.dragging) {
                        const diff = horizontal ? diffX : diffY;
                        if (loop && ((activeIndex <= 0 && diff > 0 && this.count === index + 1) ||
                            (this.count >= activeIndex + 1 && diff < 0 && index === 0))) {
                            opacity = this.opacity;
                        }
                        if (diff > 0 && activeIndex > 0 && activeIndex < this.count &&
                            activeIndex - 1 === index) {
                            opacity = this.opacity;
                        }
                        if (diff < 0 && activeIndex >= 0 && activeIndex < this.count - 1 &&
                            activeIndex + 1 === index) {
                            opacity = this.opacity;
                        }
                    }
                    if (index === activeIndex) {
                        opacity = 1;
                    }
                }
                if (isFade) {
                    let duration = speed;
                    if (this.dragging) {
                        duration = 0;
                    }
                    styles['transition'] = 'opacity ' + duration + 'ms ' + easing;
                    styles['WebkitTransition'] = 'opacity ' + duration + 'ms ' + easing;
                }
                if (!isFade && spaceBetween > 0) {
                    styles['marginRight'] = spaceBetween;
                }
                styles['width'] = width;
                styles['opacity'] = opacity;
                return styles;
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    `${prefixCls}-${this.params.direction}`
                ]
            },
            listStyles() {
                const {effect, speed, easing} = this.params;
                const horizontal = this.isHorizontal();
                const isFade = effect === 'fade';
                return isFade ? {} : {
                    transform: horizontal ? `translate3d(${this.x}px, 0, 0)` : `translate3d(0, ${this.y}px, 0)`,
                    transition: 'transform ' + speed + 'ms ' + easing
                }
            },
            prevClasses() {
                const {loop} = this.params;
                const toPrev = this.currentIndex <= 0 && !loop;
                return [
                    `${prefixCls}-prev`,
                    {
                        [`${prefixCls}-disabled`]: toPrev
                    }
                ]
            },
            nextClasses() {
                const {loop} = this.params;
                const toNext = this.currentIndex >= this.total - 1 && !loop;
                return [
                    `${prefixCls}-next`,
                    {
                        [`${prefixCls}-disabled`]: toNext
                    }
                ]
            }
        },
        mounted() {
            this.wrapper = this.$refs.wrapper;
            this.slider = this.$refs.slider;
            this.total = this.getSize();

            this.reset(() => {
                this.slideTo(this.getCurrentSlide(this.params.initialSlide), 0);
            });
            this.$children.forEach((child, index) => {
                child.index = index;
                child.isActive = index === this.currentIndex;
                child.styles = this.getSlideStyles(index);
                this.bullets.push(index);
            });
            this.isMobile = 'ontouchstart' in document;
            if (this.params.autoplay) {
                this.observer();
            }

            this.resizeListener = listen(window, 'resize', this.onWindowResized);
        },
        beforeDestroy() {
            this.wrapper = null;
            this.slider = null;
            this.touches = null;
            this.clearAutoplay();
            if (this.observers.length) {
                for (const observer of this.observers) {
                    observer.disconnect();
                }
            }
            this.resizeListener();
            this.resizeListener = null;
        }
    }
</script>