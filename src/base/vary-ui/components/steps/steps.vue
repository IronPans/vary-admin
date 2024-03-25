<template>
  <div :class="classes">
    <div :class="`${prefixCls}-nav`">
      <ul>
        <li
          v-for="(step, i) in steps"
          :class="itemClasses(i)"
          :key="i.toString()"
          @click="handleClick(i)"
        >
          <span :class="statusClasses(i)">{{ i + 1 }}</span>
          <span :class="`${prefixCls}-title`">{{ step.label }}</span>
          <span :class="`${prefixCls}-chevron`"></span>
        </li>
      </ul>
    </div>
    <div :class="`${prefixCls}-content`">
      <div :class="itemPrefixCls">
        <slot name="content" :index="activeIndex" :item="activeItem"></slot>
      </div>
    </div>
    <!-- <div :class="`${prefixCls}-content`" v-if="$slots.default">
      <slot name="content" :index="activeIndex" :item="activeItem"></slot>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted, ref } from "vue";

export default defineComponent({
  name: "va-steps",
  props: {
    items: {
      type: Array,
      default: [],
    },
    readonly: {
      default: false,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    wired: {
      default: true,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    orientation: {
      type: String,
    },
  },
  emits: ["on-finish", "update:modelValue", "on-change"],
  setup(props, { emit }) {
    const prefixCls = "va-steps";
    const itemPrefixCls = "va-step-pane";
    const index = props.modelValue || 0;
    const activeIndex = ref(index);
    const steps = ref(props.items);
    const activeItem: any = ref(props.items[index] || {});
    let count = props.items?.length;
    function itemClasses(index: number) {
      return {
        [`${prefixCls}-item`]: true,
        active: index === activeIndex.value,
        [`${prefixCls}-complete`]: index < activeIndex.value,
      };
    }
    function statusClasses(index: number) {
      return [
        `${prefixCls}-number`,
        {
          "va-icon": index < activeIndex.value,
        },
      ];
    }
    function handleClick(index: number) {
      if (!props.readonly && props.clickable && index > activeIndex.value) {
        activeIndex.value = index;
        activeItem.value = props.items[index];
        if (count <= activeIndex.value) {
          emit("on-finish");
        }
        emit("update:modelValue", index);
        emit("on-change", index);
      }
    }

    watch(
      () => props.modelValue,
      (val) => {
        activeIndex.value = val;
        activeItem.value = props.items[index];
      }
    );

    watch(
      () => activeIndex,
      (val) => {
        // updateContent();
        if (count <= activeIndex.value) {
          emit("on-finish");
        }
      }
    );

    onMounted(() => {
      // 解决获取不到$children的问题
      //   setTimeout(() => {
      //     updateNav();
      //     updateContent();
      //   }, 0);
    });

    return {
      prefixCls,
      itemPrefixCls,
      activeIndex,
      activeItem,
      steps,
      itemClasses,
      handleClick,
      statusClasses,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-wired`]: props.wired,
          },
        ];
      }),
    };
  },
});
</script>
