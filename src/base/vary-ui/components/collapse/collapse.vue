<template>
  <div :class="`${prefixCls}`">
    <div
      :class="[
        `${itemPrefixCls}`,
        {
          [`${itemPrefixCls}-active`]:
            selectedValues.selected.indexOf(item?.name || index) > -1,
        },
      ]"
      v-for="(item, key, index) in items"
    >
      <div
        :class="`${itemPrefixCls}-header`"
        @click="
          () =>
            toggle({
              index: item?.name || index || 0,
              isActive: selectedValues.selected.indexOf(item?.name || index) > -1,
            })
        "
      >
        <template v-if="!$slots.header">{{ item.header }}</template>
        <slot name="header" :item="item" :index="index"></slot>
      </div>
      <va-collapse-transition>
        <div
          :class="`${itemPrefixCls}-content`"
          :index="selectedValues.selected.indexOf(item?.name || index)"
          v-show="selectedValues.selected.indexOf(item?.name || index) > -1"
        >
          <div :class="`${itemPrefixCls}-wrapper`">
            <slot name="content" :item="item" :index="index"></slot>
            <slot></slot>
          </div>
        </div>
      </va-collapse-transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch, computed } from "vue";
const prefixCls = "va-collapse";
const itemPrefixCls = "va-collapse-item";

const emit = defineEmits(["update:modelValue", "on-change"]);

const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
  accordion: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Array,
  },
});

const selectedValues = reactive({
  selected: props.modelValue || [],
});

function setActive() {
  selectedValues.selected = getCurrentValue();

  //   $children.forEach((child: any, index: number) => {
  //     child.isActive = currentValue.indexOf(child.name || index) > -1;
  //     child.index = index;
  //   });
}
function getCurrentValue() {
  let cValue = selectedValues.selected || [];
  const accordion = props.accordion;

  if (!Array.isArray(cValue)) {
    cValue = [cValue];
  }

  if (accordion && cValue.length > 1) {
    cValue = [cValue[cValue.length - 1]];
  }
  return cValue;
}

function toggle({ index, isActive }: any) {
  const accordion = props.accordion;
  let cValue: any = selectedValues.selected || [];

  if (accordion) {
    cValue = isActive ? [] : [index];
  } else if (isActive) {
    cValue = cValue.filter((value: number) => {
      return index !== value;
    });
  } else {
    cValue.push(index);
  }
  selectedValues.selected = [...cValue];
  emit("update:modelValue", cValue);
  emit("on-change", cValue);
}

onMounted(() => {
  setActive();
});

watch(
  () => props.modelValue,
  (val) => {
    selectedValues.selected = val || [];
  }
);

watch(selectedValues.selected, (val) => {
  setActive();
});

defineExpose({
  toggle,
});
</script>
