<template>
  <div :class="classes" @click="handleClick">
    <span v-if="$slots.avatar" :class="`${prefixCls}-avatar`">
      <slot name="avatar"></slot>
    </span>
    <span :class="`${prefixCls}-inner`">{{ data.label }}</span>
    <i :class="`${prefixCls}-close`" v-if="close" @click="handleDelete">clear</i>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
const prefixCls = "va-chip";

export default defineComponent({
  name: "va-chip",
  props: {
    active: {
      default: false,
    },
    close: {
      default: false,
    },
    data: {
      type: Object,
    },
  },
  emits: ['on-delete', 'click'],
  setup(props, { emit }) {
    function handleDelete() {
      emit("on-delete", {
        label: props.data.label,
        value: props.data.value,
      });
    }
    function handleClick() {
      emit("click", {
        label: props.data.label,
        value: props.data.value,
      });
    }
    return {
      prefixCls,
      handleDelete,
      handleClick,
      data: props.data,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-active`]: props.active,
          },
        ];
      }),
    };
  },
});
</script>
