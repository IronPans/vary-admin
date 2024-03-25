<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-scrollable-head`">
      <div :class="`${prefixCls}-head-wrapper`" ref="tableHead">
        <table>
          <colgroup :class="`${prefixCls}-scrollable-colgroup`">
            <col v-for="col in columns" :style="col.style" />
          </colgroup>
          <va-table-head :columns="columns" :data="data"></va-table-head>
        </table>
      </div>
    </div>
    <div :class="`${prefixCls}-body va-iscroll`" :style="{ 'max-height': maxHeight }">
      <div :class="`${prefixCls}-body-wrapper`">
        <table>
          <colgroup :class="`${prefixCls}-scrollable-colgroup`">
            <col v-for="col in columns" :style="col.style" />
          </colgroup>
          <va-table-body
            :expanded-rows="expandedRows"
            :columns="columns"
            :data="data"
          ></va-table-body>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, inject } from "vue";
import vaTableHead from "./table-head.vue";
import vaTableBody from "./table-body.vue";
import { getScrollbarWidth } from "../base/dom";
import { getSize } from "../base/utils";
import { tableInjectKey } from "./config";

const prefixCls = "va-table";

export default defineComponent({
  name: "VaTableScrollable",
  components: {
    vaTableHead,
    vaTableBody,
  },
  props: {
    columns: {
      type: Array,
      default: () => {
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
    const params: any = ref(inject(tableInjectKey, {}));
    function initScrolling() {
      // this.$refs.tableHead.style.marginRight = getScrollbarWidth() + "px";
    }
    onMounted(() => {
      initScrolling();
    });
    return {
      prefixCls,
      columns: props.columns || [],
      expandedRows: props.expandedRows || [],
      maxHeight: getSize(params.value.maxHeight) || 0,
    };
  },
});
</script>
