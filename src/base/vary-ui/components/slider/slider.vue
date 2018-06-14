<template>
    <div :class="classes">
        <div :class="`${prefixCls}-start`" v-if="start">
            <slot name="start"></slot>
        </div>
        <div :class="`${prefixCls}-wrapper`"ref="slider">
            <div :class="`${prefixCls}-bar`"></div>
            <div :class="activeBarClasses" ref="track"></div>
            <div :class="`${prefixCls}-knob-handle`"
                 @mousedown="onMousedown" @touchstart="onTouchStart" ref="thumb">
                <div :class="knobClass"></div>
            </div>
        </div>
        <div :class="`${prefixCls}-end`" v-if="end">
            <slot name="end"></slot>
        </div>
    </div>
</template>

<script>
    import {getTouchEvent} from '../base/event';

    const prefixCls = 'va-slider';

    export default {
        name: 'VaSlider',
        props: {
            value: {
                type: [Number, String],
                default: 0
            },
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            step: {
                type: Number,
                default: 1
            },
            vertical: {
                default: false
            },
            disabled: {
                default: false
            }
        },
        data() {
            return {
                prefixCls,
                currentValue: this.value,
                slider: '',
                track: '',
                thumb: '',
                touch: {},
                isDragging: false,
                isMobile: false,
                start: '',
                end: '',
                startOffset: 0,
                currentOffset: 0,
                maxPercent: 100
            }
        },
        methods: {
            pageInit() {
                const {min, max, currentValue} = this;
                const percent = (currentValue - min) / (max - min);
                const current = Math.floor(percent * this.slider.offsetWidth);
                this.currentOffset = {
                    x: 0,
                    y: this.slider.offsetHeight - this.thumb.offsetHeight
                };
                if (!isNaN(current)) {
                    this.setValue(current);
                }
            },

            getPoint(event) {
                event = event || window.event;
                const touchEvent = this.touch.mobile ? event.changedTouches[0] : event;
                return {
                    pageX: touchEvent.pageX,
                    pageY: touchEvent.pageY
                };
            },

            setValue(value) {
                const {max, min, step, vertical} = this;
                const size = vertical ?
                    (this.slider.offsetHeight - this.thumb.offsetHeight / 2) : this.slider.offsetWidth - this.thumb.offsetWidth / 2;
                let offset = vertical ? (this.currentOffset.y + value * step) : (this.currentOffset.x + value * step);
                if (offset >= size) {
                    offset = size;
                } else if (offset < 0) {
                    offset = 0;
                }
                let percent = offset / size * 100;
                const currentValue = Math.ceil((max - min) * percent / 100) + min;
                if (vertical) {
                    this.thumb['style'].top = offset + 'px';
                    this.track['style'].top = percent + '%';
                } else {
                    this.thumb['style'].left = offset + 'px';
                    this.track['style'].right = (this.maxPercent - percent) + '%';
                }
                this.currentOffset = {
                    x: offset,
                    y: offset
                };
                this.currentValue = currentValue;
                this.$emit('input', currentValue);
            },

            getValue(event) {
                const point = this.getPoint(event);
                this.setValue(this.vertical ?
                    (point.pageY - this.startOffset.pageY) : (point.pageX - this.startOffset.pageX));
            },

            touchstart(event) {
                if (event.button || this.disabled) {
                    return;
                }
                const point = this.getPoint(event);
                this.startOffset = {
                    pageX: point.pageX,
                    pageY: point.pageY
                };
                this.isDragging = true;
                document.addEventListener(this.touch.touchmove, this.onTouchMove);
                document.addEventListener(this.touch.touchend, this.onTouchEnd);
            },

            onTouchStart(event) {
                if (this.isMobile) {
                    this.touchstart(event);
                }
            },

            onMousedown(event) {
                if (!this.isMobile) {
                    this.touchstart(event);
                }
            },

            onTouchMove(event) {
                if (this.isDragging) {
                    const point = this.getPoint(event);
                    this.getValue(event);
                    this.startOffset = {
                        pageX: point.pageX,
                        pageY: point.pageY
                    };
                }
            },

            onTouchEnd() {
                document.removeEventListener(this.touch.touchmove, this.onTouchMove);
                document.removeEventListener(this.touch.touchend, this.onTouchEnd);
                this.isDragging = false;
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-vertical`]: this.vertical,
                        [`${prefixCls}-disabled`]: this.disabled
                    },
                ]
            },
            activeBarClasses() {
                return [
                    `${prefixCls}-bar`, `${prefixCls}-bar-active`
                ]
            },
            knobClass() {
                return {
                    [`${prefixCls}-knob`]: true,
                    'active': this.isDragging
                }
            }
        },
        mounted() {
            this.isMobile = 'ontouchstart' in document;
            this.start = this.$slots.start;
            this.end = this.$slots.end;
            this.slider = this.$refs.slider;
            this.thumb = this.$refs.thumb;
            this.track = this.$refs.track;
            this.touch = getTouchEvent();
            this.pageInit();
        }
    }
</script>