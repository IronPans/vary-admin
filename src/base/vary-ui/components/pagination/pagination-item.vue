<template>
  <li :class="classes" @click="handleClick">
    <span :class="`${prefixCls}-btn`">
      <slot></slot>
    </span>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from "vue";
import { paginationInjectKey } from "./config";

const prefixCls = "va-pagination-item";

export default defineComponent({
  name: "va-pagination-item",
  props: {
    index: {
      type: Number,
    },
    active: {
      default: false,
    },
    disabled: {
      default: false,
    },
  },
  setup(props) {
    const changePage = inject(paginationInjectKey, (page: number) => {});
    return {
      prefixCls,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-active`]: props.index && props.active,
            [`${prefixCls}-disabled`]: props.disabled,
          },
        ];
      }),
      handleClick() {
        if (!props.disabled) {
          changePage?.(props.index || 0);
        }
      },
    };
  },
});
</script>
