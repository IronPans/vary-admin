<template>
    <div :class="classes">
        <canvas :width="width" :height="height" ref="canvas" @click="onCanvasClick"/>
    </div>
</template>

<script>
    import Chart from 'chart.js';

    const prefixCls = 'va-chart';

    export default {
        name: "chart",
        props: {
            data: {
                type: Object
            },
            width: {
                type: Number
            },
            height: {
                type: Number
            },
            type: {
                type: String
            },
            options: {
                type: Object
            }
        },
        data() {
            return {
                canvas: '',
                chart: ''
            }
        },
        computed: {
          classes() {
              return [
                  `${prefixCls}`
              ]
          }
        },
        methods: {
            initChart() {
                this.chart = new Chart(this.canvas, {
                    type: this.type,
                    data: this.data,
                    options: this.options
                });
            },

            getCanvas() {
                return this.canvas;
            },

            getBase64Image() {
                return this.chart.toBase64Image();
            },

            generateLegend() {
                if (this.chart) {
                    this.chart.generateLegend();
                }
            },

            reInit() {
                if (this.chart) {
                    this.chart.destroy();
                    this.initChart();
                }
            },

            refresh() {
                if (this.chart) {
                    this.chart.update();
                }
            },

            onCanvasClick(event) {
                if (this.chart) {
                    const element = this.chart.getElementAtEvent(event);
                    const dataset = this.chart.getDatasetAtEvent(event);
                    if (element && element[0] && dataset) {
                        //this.$emit({originalEvent: event, element: element[0], dataset: dataset});
                    }
                }
            }
        },
        watch: {
            data(val) {
                this.data = val;
                this.reInit();
            }
        },
        mounted() {
            this.canvas = this.$refs.canvas;
            this.initChart();
        },
        destroyed() {
            if (this.chart) {
                this.chart.destroy();
                this.chart = null;
            }
        }
    }
</script>

<style scoped>

</style>