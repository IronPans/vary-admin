<template>
  <div :class="prefixCls">
    <va-input
      :id="id"
      v-model="inputValue"
      @on-change="handleChange"
      :placeholder="placeholder"
      @on-focus="handleFocus"
      @on-blur="handleBlur"
    ></va-input>
    <transition name="scaleInTop">
      <div v-if="visible" :class="menuClasses" :style="menuStyles">
        <va-list :items="filterValue">
          <template #item="{ menu }">
            <va-list-item-text @click.native="handleItemClick(menu)">{{
              menu.label
            }}</va-list-item-text>
          </template>
        </va-list>
        <div :class="prefixCls + '-empty'" v-if="filterValue && filterValue.length <= 0">
          {{ emptyMessage }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { onMounted, onUnmounted, defineComponent, computed, ref, watch } from "vue";
import { getSize } from "../base/utils";
import { clickOutside } from "../base/dom";
import { listen } from "../base/event";
import vaList, { vaListItemText } from "../list";

const prefixCls = "va-autocomplete";

export default defineComponent({
  name: "va-autocomplete",
  components: {
    vaList,
    vaListItemText,
  },
  props: {
    count: {
      type: Number,
      count: 5,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    maxHeight: {
      type: [Number, String],
    },
    emptyMessage: {
      type: String,
      default: "没有数据",
    },
    placeholder: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  emits: ["on-change", "on-focus", "on-blur", "on-select"],
  setup(props, { emit }) {
    const filterData = ref(props.data || []);
    let documentClickListener: any;
    let selfClick = false;
    const visible = ref(false);
    const inputValue = ref("");

    function handleDomClick(event) {
      if (visible.value) {
        clickOutside(
          event.target,
          prefixCls,
          () => {
            selfClick = true;
          },
          () => {
            selfClick = false;
            visible.value = false;
          }
        );
      }
    }

    function handleChange() {
      visible.value = true;
      console.log(inputValue.value);
      emit("on-change", inputValue.value);
    }

    function handleFocus() {
      if (inputValue.value) {
        visible.value = true;
      }
      emit("on-focus");
    }

    function handleBlur(event) {
      emit("on-blur", event.value);
    }

    function handleItemClick(item) {
      visible.value = false;
      inputValue.value = item.label;
      emit("on-select", {
        item,
        originEvent: event,
      });
    }

    onMounted(() => {
      documentClickListener = listen(document, "click", handleDomClick);
    });

    onUnmounted(() => {
      if (documentClickListener) {
        documentClickListener();
        documentClickListener = null;
      }
    });

    watch(
      () => props.data,
      (val) => {
        if (val) {
          filterData.value = val;
        }
      }
    );

    return {
      prefixCls,
      visible,
      filterData,
      inputValue,
      handleBlur,
      handleItemClick,
      handleFocus,
      handleChange,
      menuClasses: computed(() => {
        return [
          `${prefixCls}-menus`,
          {
            [`${prefixCls}-scroll`]: props.maxHeight,
          },
        ];
      }),
      menuStyles: computed(() => {
        return {
          maxHeight: getSize(props.maxHeight),
        };
      }),
      filterValue: computed(() => {
        let count = 0;
        const { count: countProps = 0 } = props;
        const total = filterData.value.length;
        return filterData.value.filter((value: any) => {
          const keep =
            (!inputValue.value ||
              value.label.toLowerCase().includes(inputValue.value.toLowerCase())) &&
            count <
              ((countProps && countProps !== -1) || (countProps === -1 && total) || 5);

          if (keep) {
            count += 1;
          }
          return keep;
        });
      }),
    };
  },
});
</script>
