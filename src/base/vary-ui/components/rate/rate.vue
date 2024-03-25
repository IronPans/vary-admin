<template>
  <div :class="prefixCls" @mouseleave="handleMouseLeave">
    <template v-for="(item, index) in getRange()">
      <div :class="`${prefixCls}-item`">
        <div
          :class="halfClasses(item)"
          v-if="allowHalf"
          @mousemove.stop="handleMouseMove(item, true)"
          :style="{ opacity: isIn(v) ? 1 : 0 }"
          @click.stop="handleClick(item, true)"
        >
          <va-icon icon="star" v-if="!$slots.default" />
          <slot />
        </div>
        <div
          :class="iconClasses(item)"
          @mousemove.stop="handleMouseMove(item, false)"
          @click.stop="handleClick(item, false)"
        >
          <va-icon icon="star" v-if="!$slots.default" />
          <slot />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import vIcon from "../icon";
const prefixCls = "va-rate";

export default defineComponent({
  name: "vaRate",
  components: { vIcon },
  props: {
    allowHalf: {
      default: false,
    },
    count: {
      type: Number,
      default: 5,
    },
    readonly: {
      default: false,
    },
    value: {
      type: Number,
    },
    half: {
      type: Boolean,
    },
    modelValue: {
      type: Number,
    },
    hover: {
      default: false,
    },
  },
  emits: ["update:modelValue", "on-change"],
  setup(props, { emit }) {
    const activeValue = ref(props.modelValue || props.value || 0);
    let oldValue = 0;
    function getRange(len = props.count, start = 0, step = 1) {
      const range = [];
      for (let i = start; i < len; i += step) {
        range.push(i);
      }
      return range;
    }
    function isIn(value) {
      const ex = props.value || 0 - value;
      return ex > 0 && ex < 1;
    }
    function handleClick(value, half) {
      if (props.readonly) {
        return false;
      }
      let _value = 0;
      _value = value + 1;
      if (half && props.allowHalf) {
        _value -= 0.5;
      }
      activeValue.value = _value;
      oldValue = _value;
      emit("update:modelValue", _value);

      emit("on-change", _value);
    }
    function halfClasses(v: number) {
      return [
        `${prefixCls}-inner`,
        {
          [`${prefixCls}-active`]: v < activeValue.value,
        },
        `${prefixCls}-half`,
      ];
    }
    function iconClasses(v: number) {
      const isActive = v < activeValue.value;
      return [
        `${prefixCls}-inner`,
        {
          [`${prefixCls}-active`]: props.allowHalf ? !isIn(v) && isActive : isActive,
        },
      ];
    }
    function handleMouseMove(value, half) {
      if (props.hover && !props.readonly) {
        activeValue.value = value + 1;
        if (half && props.half) {
          activeValue.value -= 0.5;
        }
      }
    }
    function handleMouseLeave() {
      activeValue.value = oldValue;
    }
    return {
      activeValue,
      prefixCls,
      getRange,
      handleMouseLeave,
      handleMouseMove,
      iconClasses,
      halfClasses,
      handleClick,
    };
  },
});
</script>
