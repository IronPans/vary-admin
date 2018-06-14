<template>
    <div class="va-picker">
        <div class="va-color-picker-block" @click="onBlockClick" v-if="!inline && !showInput"
             :style="{'background-color': colorValue}"></div>
        <div class="va-color-input" v-if="!inline && showInput" @click.stop="onBlockClick">
            <input type="text" readonly v-model="colorValue" :style="{color: colorValue}">
            <div class="va-color-block" :style="{'background-color': colorValue}"></div>
        </div>
        <transition name="scaleInTop">
            <div :class="prefixCls" ref="picker" @click="areaClick" data-mode='HSL' v-show="inline || display">
                <div class="va-picking-area" ref="pickerArea" style="background-color: rgb(255, 0, 0);">
                    <div class="picker" ref="colorPicker" style="left: 94px; top: 94px;"></div>
                </div>
                <div class="va-hue-area" ref="hueArea">
                    <div class="slider-picker" ref="huePicker" style="left: -1px;"></div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Color from './color';
    import {getRect, getHiddenElementClient, css} from "../base/dom";
    import {listen, getTouchEvent} from "../base/event";

    const prefixCls = 'va-color-picker';

    export default {
        name: "VaColorPicker",
        props: {
            visible: {
                default: false
            },
            value: {
                type: String
            },
            clickable: {
                default: false
            },
            showInput: {
                default: false
            },
            inline: {
                default: false
            }
        },
        data() {
            return {
                prefixCls,
                touch: null,
                color: new Color(),
                colorValue: '#000',
                pickerMode: 'HSL',
                topic: 'picker',
                pickerDragging: false,
                isDragging: false,
                selfClick: false,
                hueDragging: false,
                pickerArea: '',
                hueArea: '',
                huePicker: false,
                colorPicker: '',
                picker: null,
                documentTouchmoveListener: '',
                documentTouchendListener: '',
                documentClickListener: '',
                pickerClickListener: '',
                hueClickListener: '',
                display: this.visible
            }
        },
        methods: {
            onBlockClick(event) {
                event.stopPropagation();
                this.display = !this.display;
            },

            areaClick() {
                this.selfClick = true;
            },

            update(event) {
                if (this.hueDragging) {
                    this.updateHueSlider(event);
                } else {
                    this.updateColor(event);
                }
            },

            createPickingArea() {
                this.pickerClickListener = listen(this.pickerArea, this.touch.touchstart, (e) => {
                    this.isDown = true;
                    this.pickerDragging = true;
                    this.update(e);
                    if (this.clickable) {
                        this.onClick.emit(true);
                    } else {
                        this.bindDocumentTouchmoveListener();
                    }
                    this.bindDocumentTouchendListener();
                });
            },

            createHueArea() {
                this.hueClickListener = listen(this.hueArea, this.touch.touchstart, (e) => {
                    this.isDown = true;
                    this.hueDragging = true;
                    this.update(e);
                    this.bindDocumentTouchmoveListener();
                    this.bindDocumentTouchendListener();
                });
            },

            updateColor(e) {
                const rect = getRect(this.pickerArea);
                let x = e.pageX - document.body.scrollLeft - rect.left;
                let y = e.pageY - document.body.scrollTop - rect.top;
                const picker_offset = 5;

                const size = this.pickerArea.clientWidth;

                if (x > size) {
                    x = size;
                }
                if (y > size) {
                    y = size;
                }
                if (x < 0) {
                    x = 0;
                }
                if (y < 0) {
                    y = 0;
                }

                const value = 100 - (y * 100 / size) | 0;
                const saturation = x * 100 / size | 0;

                if (this.pickerMode === 'HSV') {
                    this.color.setHSV(this.color.hue, saturation, value);
                }

                if (this.pickerMode === 'HSL') {
                    this.color.setHSL(this.color.hue, saturation, value);
                }
                console.log(x, picker_offset, y);
                this.colorPicker.style.left = x - picker_offset + 'px';
                this.colorPicker.style.top = y - picker_offset + 'px';

                this.updatePreviewColor();
            },

            updateHueSlider(e) {
                const rect = getRect(this.hueArea);
                let x = e.pageX - document.body.scrollLeft - rect.left;
                const width = this.hueArea.clientWidth;

                if (x < 0) {
                    x = 0;
                }
                if (x > width) {
                    x = width;
                }

                const hue = ((359 * x) / width) | 0;

                this.updateSliderPosition(this.huePicker, x);
                this.setHue(hue);
            },

            setColor(color) {
                if (color instanceof Color !== true) {
                    console.log('Typeof parameter not Color');
                    return;
                }

                if (color.format !== this.pickerMode) {
                    color.setFormat(this.pickerMode);
                    color.updateHSX();
                }

                this.color.copy(color);
                this.updateHuePicker();
                this.updatePickerPosition();
                this.updatePickerBackground();
                this.updatePreviewColor();
            },

            updateHuePicker() {
                const size = getHiddenElementClient(this.picker, this.hueArea, 'clientWidth');
                const offset = 1;
                const pos = (this.color.hue * size / 360) | 0;
                this.huePicker.style.left = pos - offset + 'px';
            },

            updatePickerPosition() {
                const size = getHiddenElementClient(this.picker, this.pickerArea, 'clientWidth');
                let value = 0;
                const offset = 5;

                if (this.pickerMode === 'HSV') {
                    value = this.color.value;
                }
                if (this.pickerMode === 'HSL') {
                    value = this.color.lightness;
                }

                const x = (this.color.saturation * size / 100) | 0;
                const y = size - (value * size / 100) | 0;
                this.colorPicker.style.left = x - offset + 'px';
                this.colorPicker.style.top = y - offset + 'px';
            },

            updatePickerBackground() {
                const nc = new Color(this.color);
                nc.setHSV(nc.hue, 100, 100);
                this.pickerArea.style.backgroundColor = nc.getHexa();
            },

            setHue(value) {
                this.color.setHue(value);

                this.updatePickerBackground();
                this.updatePreviewColor();
            },

            updateSliderPosition(elem, pos) {
                elem.style.left = Math.max(pos - 3, -2) + 'px';
            },

            updatePreviewColor() {
                this.colorValue = this.color.getColor();
            },

            HEXToRGBA(value) {
                let canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 1;
                canvas.height = 1;
                ctx.fillStyle = value;
                ctx.fillRect(0, 0, 1, 1);
                const data = ctx.getImageData(0, 0, 1, 1).data;
                this.color.setRGBA(data[0], data[1], data[2], data[3]);
                canvas = null;
            },

            changeHexa(value) {
                this.HEXToRGBA(value);
                const hex = this.color.getHexa();
                this.color.setHexa(hex);
                this.setColor(this.color);
            },

            bindDocumentTouchmoveListener() {
                if (!this.documentTouchmoveListener) {
                    this.documentTouchmoveListener = listen(document, this.touch.touchmove, (event) => {
                        if (this.isDown && !this.inline) {
                            this.update(event);
                        }
                    });
                }
            },

            bindDocumentTouchendListener() {
                if (!this.documentTouchendListener) {
                    this.documentTouchendListener = listen(document, this.touch.touchend, () => {
                        this.isDown = false;
                        this.hueDragging = false;
                        this.pickerDragging = false;
                        this.$emit('input', this.colorValue);
                        this.$emit('on-change', {
                            value: this.color.getHexa(),
                            rgb: this.color.getRGBA(),
                            hsl: this.color.getHSLA()
                        });
                        this.unbindDocumentTouchmoveListener();
                        this.unbindDocumentTouchendListener();
                    })
                }
            },

            unbindDocumentTouchmoveListener() {
                if (this.documentTouchmoveListener) {
                    this.documentTouchmoveListener();
                    this.documentTouchmoveListener = null;
                }
            },

            unbindDocumentTouchendListener() {
                if (this.documentTouchendListener) {
                    this.documentTouchendListener();
                    this.documentTouchendListener = null;
                }
            }
        },
        created() {
            this.color.setFormat(this.pickerMode);
            this.color.setHSL(0, 51, 51);
            this.color.a = 1;
            this.touch = getTouchEvent();
        },
        mounted() {
            this.pickerArea = this.$refs.pickerArea;
            this.colorPicker = this.$refs.colorPicker;
            this.hueArea = this.$refs.hueArea;
            this.huePicker = this.$refs.huePicker;
            this.picker = this.$refs.picker;

            this.createPickingArea();
            this.createHueArea();
            this.changeHexa(this.colorValue);

            this.documentClickListener = listen(document, 'click', () => {
                if (!this.selfClick && !this.inline) {
                    this.display = false;
                }
                this.selfClick = false;
            });

            if (this.inline) {
                css(this.picker, {
                    position: 'relative',
                    top: '0',
                    left: '0',
                    display: 'block'
                })
            }
        },
        beforeDestroy() {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
            if (this.pickerClickListener) {
                this.pickerClickListener();
                this.pickerClickListener = null;
            }
            if (this.hueClickListener) {
                this.hueClickListener();
                this.hueClickListener = null;
            }
            this.unbindDocumentTouchmoveListener();
            this.unbindDocumentTouchendListener();
        }
    }
</script>

<style scoped>

</style>