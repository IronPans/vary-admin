<template>
  <div :class="prefixCls">
    <canvas :width="width" :height="height" ref="canvas" @click="onCanvasClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted, ref, watch } from "vue";
import Chart from "chart.js/auto";

const prefixCls = "va-chart";

export default defineComponent({
  name: "chart",
  props: {
    data: {
      type: Object,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    type: {
      type: String,
    },
    options: {
      type: Object,
    },
  },
  setup(props) {
    let chart = null;
    const canvas = ref();
    function initChart() {
      chart = new Chart(canvas.value, {
        type: props.type,
        data: props.data,
        options: props.options,
      });
    }

    function getCanvas() {
      return canvas.value;
    }

    function getBase64Image() {
      return chart.toBase64Image();
    }

    function generateLegend() {
      if (chart) {
        chart.generateLegend();
      }
    }

    function reInit() {
      if (chart) {
        chart.destroy();
        initChart();
      }
    }

    function refresh() {
      if (chart) {
        chart.update();
      }
    }

    function onCanvasClick(event) {
      if (chart) {
        const element = chart.getElementAtEvent(event);
        const dataset = chart.getDatasetAtEvent(event);
        if (element && element[0] && dataset) {
          //this.$emit({originalEvent: event, element: element[0], dataset: dataset});
        }
      }
    }

    onMounted(() => {
      initChart();
    });

    onUnmounted(() => {
      if (chart) {
        chart.destroy();
        chart = null;
      }
    });

    watch(props.data, (val) => {
      reInit();
    });

    return {
      canvas,
      onCanvasClick,
      prefixCls,
      width: props.width,
      height: props.height,
    };
  },
});
</script>

<style scoped></style>
