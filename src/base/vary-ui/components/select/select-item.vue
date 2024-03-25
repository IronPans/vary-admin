<template>
  <li :class="classes" @click="handleClick">
    <div class="free-select-item-content">
      <span v-if="option.label">{{ option.label }}</span>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from "vue";
import { selectInjectKey } from "./confit";
const prefixCls = "va-select-item";

const noop = () => {};

export default defineComponent({
  name: "va-select-item",
  props: {
    option: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  emits: ["on-click"],
  setup(props, { emit }) {
    function handleClick() {
      emit("on-click", props.option);
    }
    const compareWith: Function = inject(selectInjectKey) || noop;
    return {
      prefixCls,
      option: props.option || {},
      handleClick,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-active`]: compareWith?.(props.option?.value),
          },
        ];
      }),
    };
  },
  //   created() {
  //     this.$parent.addGroup(this);
  //   },
});
</script>
