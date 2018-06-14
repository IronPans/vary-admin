<template>
    <div :class="classes" ref="container">
        <div :class="`${prefixCls}-body`" v-if="!scrollable">
            <table>
                <va-table-head :columns="simpleColumns"></va-table-head>
                <va-table-body :expanded-rows="expandedRows" :columns="simpleColumns" :data="filterData"></va-table-body>
            </table>
        </div>
        <template v-else>
            <va-table-scrollable :expanded-rows="expandedRows" :columns="simpleColumns" :data="filterData"></va-table-scrollable>
        </template>
        <div :class="`${prefixCls}-footer`" v-if="pagination">
            <va-pagination :total="total" :row="row" @on-page-change="onPageChange"></va-pagination>
        </div>
    </div>
</template>

<script>
    import vaTableHead from './table-head.vue';
    import vaTableBody from './table-body.vue';
    import vaTableScrollable from './table-scrollable.vue';
    import vaPagination from '../pagination';
    import {listen} from '../base/event';
    import {oneOf} from "../base/utils";

    const prefixCls = 'va-table';

    export default {
        name: 'va-table',
        components: {
            vaTableHead,
            vaTableBody,
            vaTableScrollable,
            vaPagination
        },
        props: {
            columns: {
                type: Array,
                default: () => {
                    return []
                }
            },
            scrollable: {
                type: Boolean
            },
            maxHeight: {
                type: [Number, String]
            },
            pagination: {
                type: Boolean
            },
            selectionMode: {
                validator(val) {
                    return oneOf(val, ['multiple', 'single'])
                }
            },
            striped: {
                default: false
            },
            border: {
                default: false
            },
            hover: {
                default: false
            },
            row: {
                type: Number,
                default: 10
            },
            sort: {
                type: Boolean
            },
            resizable: {
                default: false
            },
            order: {
                type: Boolean
            },
            emptyMessage: {
                type: String,
                default: '暂无数据'
            },
            expandableRows: {
                default: false
            },
            data: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                prefixCls,
                simpleColumns: [],
                currentCol: '',
                checkboxSelection: [],
                radioSelection: [],
                radios: [],
                total: 0,
                isEmpty: false,
                page: 1,
                first: 0,
                totalChecked: false,
                columnResizeStartX: 0,
                currentResizeCell: '',
                columnResizeMoveX: 0,
                resizeDown: false,
                sortState: false,
                container: '',
                filterData: [],
                expandedRows: []
            }
        },
        methods: {
            initColumnResize() {
                this.documentMousemoveListener = listen(document, 'mousemove', (e) => {
                    if (this.resizeDown) {
                        const nextSibling = this.currentResizeCell.nextElementSibling;
                        this.currentResizeCell.style.width = this.currentResizeCell.offsetWidth
                            + this.columnResizeMoveX + 'px';
                        nextSibling.style.width = nextSibling.offsetWidth - this.columnResizeMoveX + 'px';
                        this.columnResizeMoveX = e.pageX - this.columnResizeStartX;
                        this.columnResizeStartX = e.pageX;
                    }
                });
                this.documentMouseupListener = listen(document, 'mouseup', () => {
                    if (this.resizeDown) {
                        this.resizeDown = false;
                    }
                });
            },

            columnResizeStart(event) {
                this.resizeDown = true;
                this.currentResizeCell = event.target.parentNode.parentNode;
                this.columnResizeStartX = event.pageX;
                this.columnResizeMoveX = 0;
            },

            getColumnLength() {
                let length = this.columns.length;
                if (this.order) {
                    length += 1;
                }
                if (this.expandedRows) {
                    length += 1;
                }
                if (this.selectionMode) {
                    length += 1;
                }
                return length;
            },

            onColumnSort(column, event) {
                this.sortState = !this.sortState;
                this.currentCol = column;
                const desc = this.sortState ? -1 : 1;
                column.desc = this.sortState;
                const field = column.field;
                const vx = desc;
                this.filterData.sort((a, b) => {
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
            },

            toggleRow(row) {
                if (!this.expandedRows) {
                    this.expandedRows = [];
                }

                const rowIndex = this.findRowExpand(row);

                if (rowIndex !== -1) {
                    this.expandedRows.splice(rowIndex, 1);
                } else {
                    this.expandedRows.push(row);
                }
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

            findCell(elem, tagName) {
                let cell = elem;
                while (cell && cell.tagName !== tagName) {
                    cell = elem.parentNode;
                }
                return cell;
            },

            filterValue(data = [], page) {
                if (this.pagination) {
                    this.first = this.row * (page - 1);
                    this.filterData = data.filter((item, index) => {
                        return (index >= this.first && index < this.row * page);
                    });
                } else {
                    this.filterData = [...data];
                }
            },

            onPageChange(index) {
                this.filterValue(this.data, index);
                this.checkboxSelection = [];
                this.totalChecked = false;
            },

            rowClick() {
                this.checkboxSelection = [];
                if (this.selectionMode) {
                    if (!this.totalChecked) {
                        for (const v of this.filterData) {
                            this.checkboxSelection.push(v);
                        }
                    } else {
                        this.checkboxSelection = [];
                    }
                    this.onSelectChange();
                }
            },

            onCheckboxItemClick(checked, rowData, i) {
                if (this.selectionMode) {
                    if (checked && !this.totalChecked) {
                        this.checkboxSelection.push(rowData);
                    }
                    let length = this.checkboxSelection.length;
                    if (!checked) {
                        while (length) {
                            length--;
                            if (this.checkboxSelection[length] === rowData) {
                                this.checkboxSelection.splice(length, 1);
                            }
                        }
                    }
                    this.totalChecked = this.checkOfSelect();
                    this.onSelectChange();
                }
            },

            onRadioItemClick(event, rowData, i) {
                if (this.selectionMode) {
                    if (event.checked) {
                        for (const r of this.radios) {
                            r.checked = false;
                        }
                        this.radios[i].checked = true;
                        this.radioSelection = [rowData];
                    } else if (!event.checked) {
                        this.radios[i].checked = false;
                    }
                    this.onSelectChange();
                }
            },

            onSelectChange() {
                if (this.selectionMode === 'multiple') {
                    this.$emit('on-select', {
                        total: this.totalChecked,
                        value: this.checkboxSelection
                    })
                } else if (this.selectionMode === 'single') {
                    this.$emit('on-select', {
                        value: this.radioSelection
                    })
                }
            },

            checkOfSelect() {
                return this.checkboxSelection.length === this.data.length;
            },

            filterColumns(columns) {
                return columns
//                    .filter((col) => {
//                    return col.type !== 'expand'
//                });
            },

            unbindDocumentMouseListener() {
                if (this.documentMousemoveListener) {
                    this.documentMousemoveListener();
                    this.documentMousemoveListener = null;
                }
                if (this.documentMouseupListener) {
                    this.documentMouseupListener();
                    this.documentMouseupListener = null;
                }
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-sort`]: this.sort,
                        [`${prefixCls}-striped`]: this.striped,
                        [`${prefixCls}-bordered`]: this.border,
                        [`${prefixCls}-hover`]: this.hover
                    }
                ]
            }
        },
        watch: {
            data: {
                handler(val) {
                    this.radioSelection = [];
                    this.checkboxSelection = [];
                    this.totalChecked = false;
                    this.page = 1;
                    this.total = val.length;
                    this.filterValue(val, this.page);
                },
                deep: true
            },
            columns: {
                handle(val) {
                    this.simpleColumns = this.filterColumns(val);
                },
                deep: true
            }
        },
        mounted() {
            this.total = this.data.length;
            this.filterValue(this.data, this.page);
            this.simpleColumns = this.filterColumns(this.columns);
//            this.templates.forEach((item) => {
//                switch (item.getType()) {
//                    case 'rowexpansion':
//                        this.rowExpansionTemplate = item.template;
//                        break;
//                }
//            });
            this.initColumnResize();
        },
        beforeDestroy() {
            this.unbindDocumentMouseListener();
        }
    }
</script>