<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-input`" @click="onClick">
      <label v-if="currentValue">{{ currentValue }}</label>
      <label v-if="!currentValue">{{ placeholder }}</label>
    </div>
    <div :class="`${prefixCls}-menu`" v-if="visible" @click="onMenuClick">
      <div :class="`${prefixCls}-filter`" v-if="filter">
        <va-checkbox v-if="multiple" v-model="multipleTotal" @on-change="onMultipleTotal">
        </va-checkbox>
        <div :class="`${prefixCls}-inner`">
          <i class="va-icon">search</i>
          <input type="text" v-model="filterValue" @input="onFilterChange" />
        </div>
      </div>
      <div :class="`${prefixCls}-wrapper va-iscroll`">
        <ul v-if="!multiple">
          <va-select-item
            v-for="(option, i) in filterValueBy(options, 'label')"
            :key="i.toString()"
            @on-click="onItemClick"
            :option="option"
            :index="i"
          ></va-select-item>
        </ul>
        <ul v-if="multiple">
          <li v-for="(option, i) in filterValueBy(options, 'label')" :key="i.toString()">
            <va-checkbox
              @on-change="onCheckboxSelect($event, option)"
              v-model="option.checked"
              >{{ option.label }}</va-checkbox
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted, ref, provide } from "vue";
import { listen } from "../base/event";
import { equals } from "../base/utils";
import vaSelectItem from "./select-item.vue";
import vaCheckbox from "../checkbox";
import { selectInjectKey } from "./confit";

const prefixCls = "va-select";

export default defineComponent({
  name: "va-select",
  components: {
    vaCheckbox,
    vaSelectItem,
  },
  props: {
    value: {
      type: [Array, String, Object],
    },
    placeholder: {
      type: String,
    },
    filter: {
      default: false,
    },
    multiple: {
      default: false,
    },
    editable: {
      default: false,
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  emits: ["input"],
  setup(props, { emit }) {
    let bindDocumentClickListener: any;
    const multipleTotal = ref(false);
    let selected: any = [];
    const filterValue = ref("");
    const options = ref(props.options || []);
    let selfClick = false;
    const currentValue = ref("");
    const visible = ref(false);
    let itemClick = false;
    function onMultipleTotal(checked: boolean) {
      multipleTotal.value = checked;
      if (multipleTotal.value) {
        selected = Array.from(options.value);
      } else {
        selected = [];
      }
      for (const option of options.value) {
        options.value["checked"] = checked;
      }
      getSelectedValue();
    }

    function onCheckboxSelect(checked: boolean, option) {
      if (checked) {
        option.checked = true;
        selected.push(option);
        if (filterValueBy(props.options, "label").length === selected.length) {
          multipleTotal.value = true;
        }
      } else {
        multipleTotal.value = false;
        // const selected = selected;
        let i = selected.length;
        while (i) {
          if (selected[i - 1].value === option["value"]) {
            selected.splice(i - 1, 1);
            options.value[i - 1].checked = false;
          }
          i--;
        }
      }
      getSelectedValue();
    }

    function compareWith(value) {
      let isEqual = false;
      if (value && selected) {
        if (Array.isArray(selected)) {
          for (const o of selected) {
            isEqual = equals(value, o["value"]);
            break;
          }
        } else {
          isEqual = equals(value, selected.value);
        }
      }
      return isEqual;
    }

    function onItemClick($event) {
      itemClick = !!$event;
      selected = $event;
      currentValue.value = $event.label;
      getSelectedValue();
      close();
    }

    function getValue() {
      currentValue.value = "";
      const selectedValue = [];
      if (Array.isArray(selected)) {
        for (const s of selected) {
          selectedValue.push(s.label);
        }
        currentValue.value = selectedValue.join(",");
      } else if (selected) {
        currentValue.value = selected.label;
      }
    }

    function getSelectedValue() {
      getValue();
      emit("input", selected);
    }

    function onFilterChange(event) {}

    // function addGroup(value) {
    //   items.push(value);
    // }

    function onMenuClick() {
      itemClick = true;
    }

    function onDocumentClickListener() {
      if (!bindDocumentClickListener) {
        bindDocumentClickListener = listen(document, "click", () => {
          if (!selfClick && !itemClick) {
            close();
          }
          itemClick = false;
          selfClick = false;
        });
      }
    }

    function offDocumentClickListener() {
      if (bindDocumentClickListener) {
        bindDocumentClickListener();
        bindDocumentClickListener = null;
      }
    }

    function onClick() {
      if (!props.editable) {
        if (!visible.value) {
          open();
        } else {
          close();
        }
      }
    }

    function filterValueBy(options, value) {
      if (props.filter && options && Array.isArray(options)) {
        return options.filter((v, k, arr) => {
          const regexp = new RegExp(filterValue.value, "ig");
          if (regexp.test(v[value])) {
            return true;
          }
        });
      }
      return options;
    }

    function open() {
      selfClick = true;
      visible.value = true;
    }

    function close() {
      visible.value = false;
      selfClick = false;
    }

    // 提供方法给子组件
    provide(selectInjectKey, compareWith);

    onMounted(() => {
      onDocumentClickListener();
    });

    onUnmounted(() => {
      offDocumentClickListener();
    });

    return {
      prefixCls,
      visible,
      options,
      multipleTotal,
      currentValue,
      filterValue,
      onClick,
      onMenuClick,
      onItemClick,
      onMultipleTotal,
      onCheckboxSelect,
      placeholder: props.placeholder,
      filter: props.filter,
      onFilterChange,
      multiple: props.multiple,
      filterValueBy,
    };
  },
});
</script>
