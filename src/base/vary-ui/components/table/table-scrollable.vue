<template>
    <div :class="prefixCls">
        <div :class="`${prefixCls}-scrollable-head`">
            <div :class="`${prefixCls}-head-wrapper`" ref="tableHead">
                <table>
                    <colgroup :class="`${prefixCls}-scrollable-colgroup`">
                        <col v-for="col in columns" :style="col.style"/>
                    </colgroup>
                        <va-table-head :columns="columns" :data="data"></va-table-head>
                </table>
            </div>
        </div>
        <div :class="`${prefixCls}-body va-iscroll`" :style="{'max-height': maxHeight}">
            <div :class="`${prefixCls}-body-wrapper`">
                <table>
                    <colgroup :class="`${prefixCls}-scrollable-colgroup`">
                        <col  v-for="col in columns" :style="col.style"/>
                    </colgroup>
                    <va-table-body :expanded-rows="expandedRows" :columns="columns" :data="data"></va-table-body>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import vaTableHead from './table-head.vue';
    import vaTableBody from './table-body.vue';
    import {getScrollbarWidth} from '../base/dom';
    import {getSize} from '../base/utils';

    const prefixCls = 'va-table';

    export default {
        name: 'VaTableScrollable',
        components: {
            vaTableHead,
            vaTableBody
        },
        props: {
            columns: {
                type: Array,
                default: () => {
                    return []
                }
            },
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            expandedRows: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                prefixCls,
                dt: {},
                maxHeight: 0
            }
        },
        methods: {
            initScrolling() {
                this.$refs.tableHead.style.marginRight = getScrollbarWidth() + 'px';
            }
        },
        mounted() {
            this.initScrolling();
            this.dt = this.$parent;
            this.maxHeight = getSize(this.dt.maxHeight);
        }
    }
</script>