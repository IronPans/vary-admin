<template>
  <div :class="classes">
    <ul>
      <va-pagination-item :disabled="isFirstPage" :index="currentValue - 1">
        <span :class="`${prefixCls}-backward`">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <path d="M30.83 32.67l-9.17-9.17 9.17-9.17L28 11.5l-12 12 12 12z" />
            <path d="M0-.5h48v48H0z" fill="none" />
          </svg>
        </span>
      </va-pagination-item>
      <va-pagination-item v-if="startEllipsis" :index="1">
        <span :class="`${prefixCls}-number`">1</span>
      </va-pagination-item>
      <va-pagination-item :disabled="true" :index="1" v-if="startEllipsis">
        <span :class="`${prefixCls}-number  ${prefixCls}-ellipsis`"></span>
      </va-pagination-item>
      <va-pagination-item
        v-for="(page, index) in pages"
        :key="page"
        :active="page === currentValue"
        :index="page"
      >
        <span :class="`${prefixCls}-number`">{{ page }}</span>
      </va-pagination-item>
      <va-pagination-item v-if="endEllipsis" :disabled="true">
        <span :class="`${prefixCls}-number ${prefixCls}-ellipsis`"></span>
      </va-pagination-item>
      <va-pagination-item
        v-if="pageCount > maxPage && !isLastPage && endEllipsis"
        :index="pageCount"
      >
        <span :class="`${prefixCls}-number`">{{ pageCount }}</span>
      </va-pagination-item>
      <va-pagination-item :disabled="isLastPage" :index="currentValue + 1">
        <span :class="`${prefixCls}-forward`">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <path d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z" />
            <path d="M0-.25h48v48H0z" fill="none" />
          </svg>
        </span>
      </va-pagination-item>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted, provide } from "vue";
import { oneOf } from "../base/utils";
import vaPaginationItem from "./pagination-item.vue";
import { paginationInjectKey } from "./config";

const prefixCls = "va-pagination";

export default defineComponent({
  name: "va-pagination",
  components: { vaPaginationItem },
  props: {
    maxPage: {
      type: Number,
      default: 5,
    },
    shape: {
      validator(value) {
        return oneOf(value, "circle");
      },
    },
    total: {
      type: Number,
    },
    value: {
      type: Number,
      default: 1,
    },
    row: {
      type: Number,
      default: 10,
    },
  },
  emits: ["on-page-change"],
  setup(props, { emit }) {
    const pages = ref<number[]>([]);
    const isFirstPage = ref(false);
    const isLastPage = ref(false);
    const startEllipsis = ref(false);
    const endEllipsis = ref(false);
    const pageCount = ref(0);
    let end = 0;
    let start = 0;
    const currentValue = ref(props.value > 1 ? props.value : 1);
    function countPage(end: number, start = 0) {
      pages.value = [];
      const min = Math.min(end, pageCount.value);
      for (let i = start; i < min; i++) {
        pages.value.push(i + 1);
      }
    }
    function changePage(index: number) {
      const { maxPage } = props;
      const middle = Math.ceil(maxPage / 2);
      if (index <= 1) {
        index = 1;
      } else if (index >= getPage()) {
        index = getPage();
      }
      start = index - middle;
      end = Math.min(index + maxPage - middle, pageCount.value);
      if (index < maxPage) {
        end = maxPage;
      }
      if (end - start <= maxPage) {
        start = end - maxPage;
      }
      if (start <= 0 || index < maxPage) {
        start = 0;
      }

      currentValue.value = index;
      countPage(end, start);
      checkStartOrEnd(index);
      emit("on-page-change", currentValue.value);
    }
    provide(paginationInjectKey, changePage);
    function checkStartOrEnd(index: number) {
      isFirstPage.value = false;
      isLastPage.value = false;
      startEllipsis.value = false;
      endEllipsis.value = false;
      if (index === 1) {
        isFirstPage.value = true;
      }
      if (index === pageCount.value) {
        isLastPage.value = true;
      }
      if (
        props.maxPage < pageCount.value &&
        !isLastPage.value &&
        end !== pageCount.value
      ) {
        endEllipsis.value = true;
      }
      if (
        props.maxPage < pageCount.value &&
        !isFirstPage.value &&
        currentValue.value >= props.maxPage
      ) {
        startEllipsis.value = true;
      }
    }
    function getPage() {
      return Math.max(props.maxPage, pageCount.value);
    }
    function count(total: number, value: number) {
      pageCount.value = Math.ceil(total / props.row);
      countPage(props.maxPage);
      checkStartOrEnd(value);
      changePage(value);
    }
    watch(
      () => props.total,
      (val = 0) => {
        if (val >= 0) {
          count(val, currentValue.value);
        }
      }
    );
    watch(
      () => props.value,
      (val) => {
        if (props.total) {
          count(props.total, val);
        }
      }
    );
    onMounted(() => {
      if (props.total) {
        count(props.total, currentValue.value);
      }
    });
    return {
      prefixCls,
      pageCount,
      pages,
      isFirstPage,
      isLastPage,
      startEllipsis,
      endEllipsis,
      currentValue,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-circle`]: props.shape === "circle",
          },
        ];
      }),
    };
  },
});
</script>
