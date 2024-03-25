<template>
  <transition name="vFadeIn">
    <div
      :class="[
        prefixCls,
        {
          [`${prefixCls}-with-icon`]: alertIcon,
          [`${prefixCls}-with-desc`]: $slots.desc || desc,
          [`${prefixCls}-with-close`]: closable,
        },
        `${prefixCls}-${type}`,
      ]"
      v-if="!closed"
    >
      <span v-if="showIcon && alertIcon">
        <i class="va-icon va-alert-icon">{{ alertIcon }}</i>
      </span>
      <div :class="`${prefixCls}-body`">
        <span :class="`${prefixCls}-title`">
          {{ title }}
          <slot></slot>
        </span>
        <span :class="`${prefixCls}-desc`" v-if="$slots.desc || desc">
          {{ desc }}
          <slot name="desc"></slot>
        </span>
      </div>
      <span :class="`${prefixCls}-close`" v-if="closable" @click="handleClose">
        <i class="va-icon">clear</i>
      </span>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeMount } from "vue";
import { oneOf } from "../base/utils";

export default defineComponent({
  props: {
    banner: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    closable: {
      type: Boolean,
    },
    type: {
      validator(value) {
        return oneOf(value, ["success", "info", "warning", "error"]);
      },
      default: "info",
    },
    showIcon: {
      type: Boolean,
    },
    icon: {
      type: String,
    },
  },
  emits: ["on-close"],
  setup(props, { emit }) {
    // const slots = useSlots();

    const prefixCls = "va-alert";

    // const emit = defineEmits(["on-close"]);

    const closed = ref(false);

    const alertIcon = ref(props.icon || "");

    function handleClose() {
      closed.value = true;
      emit("on-close");
    }

    if (!props.icon && props.type) {
      switch (props.type) {
        case "info":
          alertIcon.value = "error_outline";
          break;
        case "success":
          alertIcon.value = "check_circle_outline";
          break;
        case "warning":
          alertIcon.value = "error_outline";
          break;
        case "error":
          alertIcon.value = "highlight_off";
          break;
      }
    }
    if (props.banner) {
      alertIcon.value = "error_outline";
    }

    return {
      ...props,
      closed,
      alertIcon,
      prefixCls,
      handleClose,
      showIcon: props.showIcon,
    };
  },
});
</script>
