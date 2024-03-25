<template>
  <i :class="classes" @click="handleClick">
    <template v-if="!wi">
      {{ icon }}
    </template>
  </i>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: "",
    },
    wi: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const prefixCls = "va-icon";

    function handleClick(event) {
      emit("click", event);
    }

    return {
      handleClick,
      classes: computed(() => {
        const icon = props.wi ? "wi" : "material-icons";
        return [
          prefixCls,
          icon,
          {
            "va-wi": props.wi,
            [`${props.icon}`]: props.wi,
          },
        ];
      }),
      wi: props.wi,
      icon: props.icon,
    };
  },
});
</script>
