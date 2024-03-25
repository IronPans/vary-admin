<template>
  <tbody>
    <template v-for="(rowData, i) in data">
      <tr :class="`${prefixCls}-row ${rowData.selected ? 'va-selected' : ''}`">
        <td v-if="params.expandableRows" :class="`${prefixCls}-cell`">
          <div :class="`${prefixCls}-cell-inner`">
            <i
              class="va-icon va-expand-arrow"
              @click="params.toggleRow(rowData)"
              :class="{ 'va-icon-rotate-180': isRowExpand(rowData) }"
              >keyboard_arrow_right</i
            >
          </div>
        </td>
        <td v-if="params.order" :class="`${prefixCls}-cell`">
          <div :class="`${prefixCls}-cell-inner`">{{ i + 1 + params.first }}</div>
        </td>
        <td v-if="params.selectionMode" :class="`${prefixCls}-cell`">
          <div
            :class="`${prefixCls}-cell-inner`"
            v-if="params.selectionMode === 'multiple'"
          >
            <va-checkbox
              :value="shouldBeChecked(rowData)"
              @on-change="params.onCheckboxItemClick($event, rowData, i)"
            ></va-checkbox>
          </div>
          <div
            :class="`${prefixCls}-cell-inner`"
            v-if="params.selectionMode === 'single'"
          >
            <va-radio @on-change="params.onRadioItemClick($event, rowData, i)"></va-radio>
          </div>
        </td>
        <template v-for="(col, colIndex) in columns">
          <td
            v-if="isExited(rowData[col.field])"
            :class="`${prefixCls}-cell ${col.cellClassName ? col.cellClassName : ''}`"
            :colspan="rowData[col.field] && rowData[col.field].colspan"
            :rowspan="rowData[col.field] && rowData[col.field].rowspan"
          >
            <div :class="`${prefixCls}-cell-inner`">
              <span v-if="!col.render">{{ getValue(rowData[col.field]) }}</span>
              <va-table-template
                v-else-if="!col.type"
                :row-index="i"
                :row-data="rowData"
                :render="col.render"
              ></va-table-template>
              <div class="va-cell-editor" v-if="col.editable">
                <input type="text" :value="getValue(rowData[col.field])" />
              </div>
            </div>
          </td>
        </template>
      </tr>
      <tr
        :class="`${prefixCls}-row`"
        v-if="params.expandableRows && isRowExpand(rowData)"
      >
        <td :class="`${prefixCls}-cell`" :colspan="params.getColumnLength()">
          <div :class="`${prefixCls}-cell-inner`">
            <va-table-template
              :row-index="i"
              :row-data="rowData"
              :render="expandRender()"
            ></va-table-template>
          </div>
        </td>
      </tr>
    </template>
    <tr v-if="params.isEmpty">
      <td :colspan="columns.length">{{ params.emptyMessage }}</td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineComponent, ref, inject, watch } from "vue";
import vaCheckbox from "../checkbox";
import vaRadio from "../radio";
import vaTableTemplate from "./table-template";
import { tableInjectKey, tableInjectFnKey } from "./config";

const prefixCls = "va-table";

export default defineComponent({
  name: "va-table-body",
  components: {
    vaCheckbox,
    vaRadio,
    vaTableTemplate,
  },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    expandedRows: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props) {
    const params: any = inject(tableInjectKey, {});
    const methods: any = inject(tableInjectFnKey);
    const data = ref<any>(props.data || []);
    const columns = ref<any>(props.columns || []);
    function shouldBeChecked(rowData: any) {
      return methods.shouldBeChecked(rowData);
    }
    function getValue(obj: any) {
      if (typeof obj !== "object" || !obj) {
        return obj;
      }
      return obj.value;
    }
    function isExited(obj: any) {
      return typeof obj !== "undefined";
    }
    function findRowExpand(row: any) {
      let index = -1;
      if (props.expandedRows) {
        for (let i = 0; i < props.expandedRows.length; i++) {
          if (row === props.expandedRows[i]) {
            index = i;
            break;
          }
        }
      }
      return index;
    }

    function isRowExpand(row: any) {
      return findRowExpand(row) !== -1;
    }

    function expandRender() {
      let render = function () {
        return "";
      };
      for (const col of props.columns) {
        if (col.type && col.type === "expand") {
          if (col.expandRender) {
            render = col.expandRender;
            break;
          }
        }
      }
      return render;
    }
    watch(
      () => props.data,
      (val) => {
        if (Array.isArray(val)) {
          data.value = val;
        }
      }
    );
    return {
      prefixCls,
      params,
      isExited,
      isRowExpand,
      shouldBeChecked,
      getValue,
      data,
      expandRender,
      columns,
    };
  },
});
</script>
