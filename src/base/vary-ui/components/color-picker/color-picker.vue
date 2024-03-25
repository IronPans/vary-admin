<template>
  <div class="va-picker">
    <div
      class="va-color-picker-block"
      @click="onBlockClick"
      v-if="!inline && !showInput"
      :style="{ 'background-color': colorValue }"
    ></div>
    <div class="va-color-input" v-if="!inline && showInput" @click.stop="onBlockClick">
      <input type="text" readonly v-model="colorValue" :style="{ color: colorValue }" />
      <div class="va-color-block" :style="{ 'background-color': colorValue }"></div>
    </div>
    <transition name="scaleInTop">
      <div
        :class="prefixCls"
        ref="picker"
        @click="areaClick"
        data-mode="HSL"
        v-show="inline || display"
      >
        <div
          class="va-picking-area"
          ref="pickerArea"
          style="background-color: rgb(255, 0, 0)"
        >
          <div class="picker" ref="colorPicker" style="left: 94px; top: 94px"></div>
        </div>
        <div class="va-hue-area" ref="hueArea">
          <div class="slider-picker" ref="huePicker" style="left: -1px"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted, onUnmounted } from "vue";
import Color from "./color";
import { getRect, getHiddenElementClient, css } from "../base/dom";
import { listen, getTouchEvent } from "../base/event";

const prefixCls = "va-color-picker";

export default defineComponent({
  name: "VaColorPicker",
  props: {
    visible: {
      default: false,
    },
    modelValue: {
      type: String,
    },
    clickable: {
      default: false,
    },
    showInput: {
      default: false,
    },
    inline: {
      default: false,
    },
  },
  emits: ["update:modelValue", "on-change", 'on-click'],
  setup(props, { emit }) {
    const display = ref(props.visible);
    let pickerMode = "HSL";
    const color: Color = new Color();
    color.setFormat(pickerMode);
    color.setHSL(0, 51, 51);
    let pickerClickListener: any;
    let selfClick = false;
    let hueDragging = false;
    let pickerDragging = false;
    let isDown = false;
    const colorValue = ref(props.modelValue || "#000");
    const pickerArea = ref();
    const colorPicker = ref();
    const huePicker = ref();
    const hueArea = ref();
    let picker = ref();
    let hueClickListener: any;
    let documentClickListener: any;
    let documentTouchendListener: any;
    let documentTouchmoveListener: any;
    // color.a = 1;
    const touch = getTouchEvent();
    function onBlockClick(event: any) {
      event.stopPropagation();
      display.value = !display.value;
    }

    function areaClick() {
      selfClick = true;
    }

    function update(event: any) {
      if (hueDragging) {
        updateHueSlider(event);
      } else {
        updateColor(event);
      }
    }

    function createPickingArea() {
      pickerClickListener = listen(pickerArea.value, touch.touchstart, (e) => {
        isDown = true;
        pickerDragging = true;
        update(e);
        if (props.clickable) {
          emit('on-click', true);
        } else {
          bindDocumentTouchmoveListener();
        }
        bindDocumentTouchendListener();
      });
    }

    function createHueArea() {
      hueClickListener = listen(hueArea.value, touch.touchstart, (e) => {
        isDown = true;
        hueDragging = true;
        update(e);
        bindDocumentTouchmoveListener();
        bindDocumentTouchendListener();
      });
    }

    function updateColor(e: any) {
      const rect = getRect(pickerArea.value);
      let x = e.pageX - document.body.scrollLeft - rect.left;
      let y = e.pageY - document.body.scrollTop - rect.top;
      const picker_offset = 5;

      const size = pickerArea.value.clientWidth;

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

      const value = (100 - (y * 100) / size) | 0;
      const saturation = ((x * 100) / size) | 0;

      if (pickerMode === "HSV") {
        color.setHSV(color.hue, saturation, value);
      }

      if (pickerMode === "HSL") {
        color.setHSL(color.hue, saturation, value);
      }
      colorPicker.value.style.left = x - picker_offset + "px";
      colorPicker.value.style.top = y - picker_offset + "px";

      updatePreviewColor();
    }

    function updateHueSlider(e: any) {
      const rect = getRect(hueArea.value);
      let x = e.pageX - document.body.scrollLeft - rect.left;
      const width = hueArea.value.clientWidth;

      if (x < 0) {
        x = 0;
      }
      if (x > width) {
        x = width;
      }

      const hue = ((359 * x) / width) | 0;

      updateSliderPosition(huePicker.value, x);
      setHue(hue);
    }

    function setColor(color: any) {
      if (color instanceof Color !== true) {
        console.log("Typeof parameter not Color");
        return;
      }

      if (color.format !== pickerMode) {
        color.setFormat(pickerMode);
        color.updateHSX();
      }

      color.copy(color);
      updateHuePicker();
      updatePickerPosition();
      updatePickerBackground();
      updatePreviewColor();
    }

    function updateHuePicker() {
      const size = getHiddenElementClient(picker.value, hueArea.value, "clientWidth");
      const offset = 1;
      const pos = ((color.hue * size) / 360) | 0;
      huePicker.value.style.left = pos - offset + "px";
    }

    function updatePickerPosition() {
      const size = getHiddenElementClient(picker.value, pickerArea.value, "clientWidth");
      let value = 0;
      const offset = 5;

      if (pickerMode === "HSV") {
        value = color.value;
      }
      if (pickerMode === "HSL") {
        value = color.lightness;
      }

      const x = ((color.saturation * size) / 100) | 0;
      const y = (size - (value * size) / 100) | 0;
      colorPicker.value.style.left = x - offset + "px";
      colorPicker.value.style.top = y - offset + "px";
    }

    function updatePickerBackground() {
      const nc = new Color(color);
      nc.setHSV(nc.hue, 100, 100);
      pickerArea.value.style.backgroundColor = nc.getHexa();
    }

    function setHue(value: any) {
      color.setHue(value);

      updatePickerBackground();
      updatePreviewColor();
    }

    function updateSliderPosition(elem: any, pos: number) {
      elem.style.left = Math.max(pos - 3, -2) + "px";
    }

    function updatePreviewColor() {
      colorValue.value = color.getColor();
    }

    function HEXToRGBA(value: any) {
      let canvas: any = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx && canvas) {
        canvas.width = 1;
        canvas.height = 1;
        ctx.fillStyle = value;
        ctx.fillRect(0, 0, 1, 1);
        const data = ctx.getImageData(0, 0, 1, 1).data;
        color.setRGBA(data[0], data[1], data[2], data[3]);
        canvas = null;
      }
    }

    function changeHexa(value: any) {
      HEXToRGBA(value);
      const hex = color.getHexa();
      color.setHexa(hex);
      setColor(color);
    }

    function bindDocumentTouchmoveListener() {
      if (!documentTouchmoveListener) {
        documentTouchmoveListener = listen(document, touch.touchmove, (event: any) => {
          if (isDown && !props.inline) {
            update(event);
          }
        });
      }
    }

    function bindDocumentTouchendListener() {
      if (!documentTouchendListener) {
        documentTouchendListener = listen(document, touch.touchend, () => {
          isDown = false;
          hueDragging = false;
          pickerDragging = false;
          emit("update:modelValue", colorValue.value);
          emit("on-change", {
            value: color.getHexa(),
            rgb: color.getRGBA(),
            hsl: color.getHSLA(),
          });
          unbindDocumentTouchmoveListener();
          unbindDocumentTouchendListener();
        });
      }
    }

    function unbindDocumentTouchmoveListener() {
      if (documentTouchmoveListener) {
        documentTouchmoveListener();
        documentTouchmoveListener = null;
      }
    }

    function unbindDocumentTouchendListener() {
      if (documentTouchendListener) {
        documentTouchendListener();
        documentTouchendListener = null;
      }
    }

    onMounted(() => {
      createPickingArea();
      createHueArea();
      changeHexa(colorValue.value);

      documentClickListener = listen(document, "click", () => {
        if (!selfClick && !props.inline) {
          display.value = false;
        }
        selfClick = false;
      });

      if (props.inline) {
        css(picker.value, {
          position: "relative",
          top: "0",
          left: "0",
          display: "block",
        });
      }
    });

    onUnmounted(() => {
      if (documentClickListener) {
        documentClickListener();
        documentClickListener = null;
      }
      if (pickerClickListener) {
        pickerClickListener();
        pickerClickListener = null;
      }
      if (hueClickListener) {
        hueClickListener();
        hueClickListener = null;
      }
      unbindDocumentTouchmoveListener();
      unbindDocumentTouchendListener();
    });

    return {
      prefixCls,
      display,
      pickerArea,
      colorPicker,
      hueArea,
      huePicker,
      picker,
      colorValue,
      inline: props.inline,
      onBlockClick,
      areaClick,
    };
  },
});
</script>

<style scoped></style>
