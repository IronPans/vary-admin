<template>
  <li :class="classes" @click="handleClick">
    <div :class="`${prefixCls}-content`">
      <slot />
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
const prefixCls = "va-list-item";

export default defineComponent({
  name: "va-list-item",
  props: {
    reveal: {
      default: false,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    function handleClick(event) {
      emit("click", event);
    }
    return {
      prefixCls,
      handleClick,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-reveal`]: props.reveal,
          },
        ];
      }),
    };
  },
});
</script>
