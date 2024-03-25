<template>
  <div :class="classes">
    <va-chip
      v-for="(node, index) in chipData"
      :data="node"
      :key="index.toString()"
      @on-delete="handleDelete(node)"
      @click="handleClick(node)"
    ></va-chip>
    <input
      v-if="placeholder"
      v-model="value"
      :spellCheck="false"
      type="text"
      placeholder="placeholder"
      @keyup.enter="handleKeyUp"
      @change="handleChange"
      @focus="handleFocus"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import vaChip from "./chip.vue";

const prefixCls = "va-chip";

export default defineComponent({
  name: "va-chip-group",
  components: {
    vaChip,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholder: {
      type: String,
    },
  },
  emits: ["on-delete", "click"],
  setup(props, { emit }) {
    const focus = ref(false);
    const value = ref("");
    const chipData = ref([]);

    function handleDelete(data) {
      const cData = [...chipData.value];
      const chipToDelete = cData.indexOf(data);
      cData.splice(chipToDelete, 1);
      chipData.value = cData;
      emit("on-delete", {
        label: data.label,
        value: data.value,
      });
    }

    function handleClick(data) {
      emit("click", {
        label: data.label,
        value: data.value,
      });
    }

    function handleFocus() {
      focus.value = true;
    }

    function handleChange(event) {
      value.value = event.target.value;
    }

    function handleKeyUp(event) {
      let value = event.target.value;
      const data = [...chipData.value];
      let isExited = false;
      for (const d of data) {
        if (d.label === value) {
          isExited = true;
          break;
        }
      }
      if (!isExited) {
        data.push({
          label: value,
          value: value,
        });
        value = "";
        chipData.value = data;
        value.value = "";
      }
    }
    return {
      focus,
      chipData,
      placeholder: props.placeholder,
      value,
      handleDelete,
      handleClick,
      handleFocus,
      handleChange,
      handleKeyUp,
      classes: computed(() => {
        return [
          `${prefixCls}-group`,
          {
            [`${prefixCls}-input`]: props.placeholder,
            [`${prefixCls}-focus`]: focus.value,
          },
        ];
      }),
    };
  },
});
</script>

<style scoped></style>
