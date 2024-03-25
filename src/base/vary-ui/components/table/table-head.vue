<template>
  <thead :class="prefixCls">
    <tr>
      <th :class="thClasses" v-if="params.order || params.expandableRows">
        <div :class="`${prefixCls}-inner`">#</div>
      </th>
      <th :class="`${prefixCls}-head ${prefixCls}-selection`" v-if="params.selectionMode">
        <div :class="`${prefixCls}-inner`">
          <div :class="`${prefixCls}-text`" v-if="params.selectionMode === 'multiple'">
            <va-checkbox
              v-model="params.totalChecked"
              @click.native="params.rowClick"
            ></va-checkbox>
          </div>
          <div
            :class="`${prefixCls}-text`"
            v-if="params.selectionMode === 'single'"
          ></div>
        </div>
      </th>
      <template v-for="(col, i) in columns">
        <th :style="col.style" :class="columnsClasses">
          <div :class="`${prefixCls}-inner`" @click="params.onColumnSort(col, $event)">
            <div :class="`${prefixCls}-text`">
              <span v-if="!col.headerRender">{{ col.header }}</span>
              <va-table-template
                v-else
                :row-index="i"
                :row-data="col"
                :render="headerRender(col)"
              ></va-table-template>
              <span v-if="params.sort || col.sort" :class="`${prefixCls}-sort`">
                <i
                  class="va-icon"
                  :class="{
                    'va-icon-rotate-180': params.sortState && params.currentCol === col,
                  }"
                  >arrow_downward</i
                >
              </span>
            </div>
            <span
              :class="`${prefixCls}-resizer`"
              v-if="params.resizable && params.border"
              @mousedown="params.columnResizeStart"
            ></span>
          </div>
        </th>
      </template>
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent, computed, inject, ref } from "vue";
import vaTableTemplate from "./table-template";
import vaCheckbox from "../checkbox";
import vaRadio from "../radio";
import { tableInjectKey } from "./config";

const prefixCls = "va-table-head";

export default defineComponent({
  name: "va-table-head",
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
  },
  setup(props) {
    const params: any = inject(tableInjectKey, {});
    const columns = ref<any>(props.columns || []);
    function columnsClasses(sort: boolean) {
      return [
        prefixCls,
        {
          [`${prefixCls}-sort`]: sort,
        },
      ];
    }
    function headerRender(col: any) {
      let render = () => {
        return "";
      };
      if (col.type === "header" && col.headerRender) {
        render = col.headerRender;
      }
      return render;
    }
    return {
      prefixCls,
      params,
      columns,
      columnsClasses,
      headerRender,
      thClasses: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-expand`]: params.expandableRows,
            [`${prefixCls}-order`]: params.order,
          },
        ];
      }),
    };
  },
});
</script>
