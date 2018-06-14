<template>
    <tbody>
    <template v-for="(rowData, i) in data">
        <tr :class="`${prefixCls}-row ${rowData.selected ? 'va-selected' : ''}`">
            <td v-if="dt.expandableRows" :class="`${prefixCls}-cell`">
                <div :class="`${prefixCls}-cell-inner`">
                    <i class="va-icon va-expand-arrow" @click="dt.toggleRow(rowData)"
                       :class="{'va-icon-rotate-180': isRowExpand(rowData)}">keyboard_arrow_right</i>
                </div>
            </td>
            <td v-if="dt.order" :class="`${prefixCls}-cell`">
                <div :class="`${prefixCls}-cell-inner`">{{i + 1 + dt.first}}</div>
            </td>
            <td v-if="dt.selectionMode" :class="`${prefixCls}-cell`">
                <div :class="`${prefixCls}-cell-inner`" v-if="dt.selectionMode === 'multiple'">
                    <va-checkbox :value="shouldBeChecked(rowData)"
                                @on-change="dt.onCheckboxItemClick($event, rowData, i)"></va-checkbox>
                </div>
                <div :class="`${prefixCls}-cell-inner`" v-if="dt.selectionMode === 'single'">
                    <va-radio @on-change="dt.onRadioItemClick($event, rowData, i)"></va-radio>
                </div>
            </td>
            <template v-for="(col, colIndex) in columns">
                <td v-if="isExited(rowData[col.field])" :class="`${prefixCls}-cell ${col.cellClassName ? col.cellClassName : ''}`"
                    :colspan="rowData[col.field] && rowData[col.field].colspan"
                    :rowspan="rowData[col.field] && rowData[col.field].rowspan">
                    <div :class="`${prefixCls}-cell-inner`">
                        <span v-if="!col.render">{{getValue(rowData[col.field])}}</span>
                        <va-table-template v-else-if="!col.type" :row-index="i" :row-data="rowData" :render="col.render"></va-table-template>
                        <div class="va-cell-editor" v-if="col.editable">
                            <input type="text" :value="getValue(rowData[col.field])"/>
                        </div>
                    </div>
                </td>
            </template>
        </tr>
        <tr :class="`${prefixCls}-row`" v-if="dt.expandableRows && isRowExpand(rowData)">
            <td :class="`${prefixCls}-cell`" :colspan="dt.getColumnLength()">
                <div :class="`${prefixCls}-cell-inner`">
                    <va-table-template :row-index="i" :row-data="rowData" :render="expandRender()"></va-table-template>
                </div>
            </td>
        </tr>
    </template>
    <tr v-if="dt.isEmpty">
        <td :colspan="columns.length">{{dt.emptyMessage}}</td>
    </tr>
    </tbody>
</template>

<script>
    import vaCheckbox from '../checkbox';
    import vaRadio from '../radio';
    import vaTableTemplate from './table-template';

    const prefixCls = 'va-table';

    export default {
        name: 'va-table-body',
        components: {
            vaCheckbox,
            vaRadio,
            vaTableTemplate
        },
        props: {
            columns: {
                type: Array,
                default() {
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
                dt: {}
            }
        },
        methods: {
            shouldBeChecked(rowData) {
                return this.dt.checkboxSelection.indexOf(rowData) !== -1;
            },
            getValue(obj) {
                if (typeof obj !== 'object' || !obj) {
                    return obj;
                }
                return obj.value;
            },
            isExited(obj) {
                return typeof obj !== 'undefined';
            },
            isRowExpand(rowData) {
                return this.isRowExpand(rowData)
            },
            findRowExpand(row) {
                let index = -1;
                if (this.expandedRows) {
                    for (let i = 0; i < this.expandedRows.length; i++) {
                        if (row === this.expandedRows[i]) {
                            index = i;
                            break;
                        }
                    }
                }
                return index;
            },

            isRowExpand(row) {
                return this.findRowExpand(row) !== -1;
            },

            expandRender() {
                let render = function () {
                    return '';
                };
                for (const col of this.columns) {
                    if (col.type && col.type === 'expand') {
                        if (col.expandRender) {
                            render = col.expandRender;
                            break;
                        }
                    }
                }
                return render;
            }
        },
        mounted() {
            this.dt = this.$parent;
        }
    }
</script>