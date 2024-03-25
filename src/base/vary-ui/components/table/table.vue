<template>
  <div :class="classes" ref="container">
    <div :class="`${prefixCls}-body`" v-if="!scrollable">
      <table>
        <va-table-head :columns="simpleColumns"></va-table-head>
        <va-table-body
          :expanded-rows="expandedRows"
          :columns="simpleColumns"
          :data="filterData"
        ></va-table-body>
      </table>
    </div>
    <template v-else>
      <va-table-scrollable
        :expanded-rows="expandedRows"
        :columns="simpleColumns"
        :data="filterData"
      ></va-table-scrollable>
    </template>
    <div :class="`${prefixCls}-footer`" v-if="pagination">
      <va-pagination
        :total="total"
        :row="row"
        @on-page-change="onPageChange"
      ></va-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import vaTableHead from "./table-head.vue";
import vaTableBody from "./table-body.vue";
import vaTableScrollable from "./table-scrollable.vue";
import vaPagination from "../pagination";
import { listen } from "../base/event";
import { oneOf } from "../base/utils";
import { tableInjectKey, tableInjectFnKey } from "./config";

const prefixCls = "va-table";

export default defineComponent({
  name: "vaTable",
  components: {
    vaTableHead,
    vaTableBody,
    vaTableScrollable,
    vaPagination,
  },
  props: {
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    scrollable: {
      type: Boolean,
    },
    maxHeight: {
      type: [Number, String],
    },
    pagination: {
      type: Boolean,
    },
    selectionMode: {
      validator(val) {
        return oneOf(val, ["multiple", "single"]);
      },
    },
    striped: {
      default: false,
    },
    border: {
      default: false,
    },
    hover: {
      default: false,
    },
    row: {
      type: Number,
      default: 10,
    },
    sort: {
      type: Boolean,
    },
    resizable: {
      default: false,
    },
    order: {
      type: Boolean,
    },
    emptyMessage: {
      type: String,
      default: "暂无数据",
    },
    expandableRows: {
      default: false,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ["on-select"],
  setup(props, { emit }) {
    let documentMousemoveListener: any;
    let documentMouseupListener: any;
    let resizeDown = false;
    let columnResizeMoveX = 0;
    let columnResizeStartX = 0;
    let sortState = false;
    let currentResizeCell: any;
    const total = ref(0);
    const filterData = ref([]);
    const expandedRows = ref<any>([]);
    const simpleColumns = ref<any>(filterColumns(props.columns || []));
    let radioSelection: any = [];
    const row = ref(props.row);
    const radios = ref<any>([]);
    let checkboxSelection = ref<any>([]);
    const data = ref<any>(props.data || []);
    const totalChecked = ref(false);
    let page = 1;
    function shouldBeChecked(rowData: any) {
      return checkboxSelection.value.indexOf(rowData) !== -1;
    }

    provide(tableInjectKey, props);
    provide(tableInjectFnKey, {
      shouldBeChecked,
    });

    function initColumnResize() {
      documentMousemoveListener = listen(document, "mousemove", (e) => {
        if (resizeDown) {
          const nextSibling = currentResizeCell.nextElementSibling;
          currentResizeCell.style.width =
            currentResizeCell.offsetWidth + columnResizeMoveX + "px";
          nextSibling.style.width = nextSibling.offsetWidth - columnResizeMoveX + "px";
          columnResizeMoveX = e.pageX - columnResizeStartX;
          columnResizeStartX = e.pageX;
        }
      });
      documentMouseupListener = listen(document, "mouseup", () => {
        if (resizeDown) {
          resizeDown = false;
        }
      });
    }

    function columnResizeStart(event: any) {
      resizeDown = true;
      currentResizeCell = event.target.parentNode.parentNode;
      columnResizeStartX = event.pageX;
      columnResizeMoveX = 0;
    }

    function getColumnLength() {
      let length = props.columns.length;
      if (props.order) {
        length += 1;
      }
      if (expandedRows.value) {
        length += 1;
      }
      if (props.selectionMode) {
        length += 1;
      }
      return length;
    }

    function onColumnSort(column: any) {
      sortState = !sortState;
      const desc = sortState ? -1 : 1;
      column.desc = sortState;
      const field = column.field;
      const vx = desc;
      filterData.value.sort((a, b) => {
        const v1 = a[field];
        const v2 = b[field];
        if (v1 > v2) {
          return vx;
        } else if (v1 < v2) {
          return -vx;
        } else {
          return 0;
        }
      });
    }

    function toggleRow(row: number) {
      if (!expandedRows.value) {
        expandedRows.value = [];
      }

      const rowIndex = findRowExpand(row);

      if (rowIndex !== -1) {
        expandedRows.value.splice(rowIndex, 1);
      } else {
        expandedRows.value.push(row);
      }
    }

    function findRowExpand(row: number) {
      let index = -1;
      if (expandedRows.value) {
        for (let i = 0; i < expandedRows.value.length; i++) {
          if (row === expandedRows.value[i]) {
            index = i;
            break;
          }
        }
      }
      return index;
    }

    function isRowExpand(row: number) {
      return findRowExpand(row) !== -1;
    }

    function findCell(elem: any, tagName: string) {
      let cell = elem;
      while (cell && cell.tagName !== tagName) {
        cell = elem.parentNode;
      }
      return cell;
    }

    function filterValue(data = [], page: number) {
      if (props.pagination) {
        const first = row.value * (page - 1);
        filterData.value = data.filter((item, index) => {
          return index >= first && index < row.value * page;
        });
      } else {
        filterData.value = [...data];
      }
    }

    function onPageChange(index: number) {
      filterValue(data.value || [], index);
      checkboxSelection.value = [];
      totalChecked.value = false;
    }

    function rowClick() {
      checkboxSelection.value = [];
      if (props.selectionMode) {
        if (!totalChecked.value) {
          for (const v of filterData.value) {
            checkboxSelection.value.push(v);
          }
        } else {
          checkboxSelection.value = [];
        }
        onSelectChange();
      }
    }

    function onCheckboxItemClick(checked: boolean, rowData: any) {
      if (props.selectionMode) {
        if (checked && !totalChecked.value) {
          checkboxSelection.value.push(rowData);
        }
        let length = checkboxSelection.value.length;
        if (!checked) {
          while (length) {
            length--;
            if (checkboxSelection.value[length] === rowData) {
              checkboxSelection.value.splice(length, 1);
            }
          }
        }
        totalChecked.value = checkOfSelect();
        onSelectChange();
      }
    }

    function onRadioItemClick(event: any, rowData: any, i: number) {
      if (props.selectionMode) {
        if (event.checked) {
          for (const r of radios.value) {
            r.checked = false;
          }
          radios.value[i].checked = true;
          radioSelection = [rowData];
        } else if (!event.checked) {
          radios.value[i].checked = false;
        }
        onSelectChange();
      }
    }

    function onSelectChange() {
      if (props.selectionMode === "multiple") {
        emit("on-select", {
          total: totalChecked.value,
          value: checkboxSelection.value,
        });
      } else if (props.selectionMode === "single") {
        emit("on-select", {
          value: radioSelection,
        });
      }
    }

    function checkOfSelect() {
      return checkboxSelection.value.length === data.value.length;
    }

    function filterColumns(columns: any) {
      return [...columns];
      //                    .filter((col) => {
      //                    return col.type !== 'expand'
      //                });
    }

    function unbindDocumentMouseListener() {
      if (documentMousemoveListener) {
        documentMousemoveListener();
        documentMousemoveListener = null;
      }
      if (documentMouseupListener) {
        documentMouseupListener();
        documentMouseupListener = null;
      }
    }

    onMounted(() => {
      total.value = data.value.length;
      filterValue(data.value, page);
      //   simpleColumns.value = filterColumns(props.columns);
      initColumnResize();
    });

    onUnmounted(() => {
      unbindDocumentMouseListener();
    });

    watch(
      () => props.data,
      (val = []) => {
        radioSelection = [];
        checkboxSelection.value = [];
        totalChecked.value = false;
        page = 1;
        total.value = val.length;
        filterValue(val, page);
      }
    );

    return {
      prefixCls,
      pagination: props.pagination,
      data,
      row,
      simpleColumns,
      expandedRows,
      filterData,
      total,
      onPageChange,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-sort`]: props.sort,
            [`${prefixCls}-striped`]: props.striped,
            [`${prefixCls}-bordered`]: props.border,
            [`${prefixCls}-hover`]: props.hover,
          },
        ];
      }),
    };
  },
});
</script>
