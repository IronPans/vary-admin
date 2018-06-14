<template>
    <thead :class="prefixCls">
    <tr>
        <th :class="thClasses" v-if="dt.order || dt.expandableRows">
            <div :class="`${prefixCls}-inner`">#</div>
        </th>
        <th :class="`${prefixCls}-head ${prefixCls}-selection`" v-if="dt.selectionMode">
            <div :class="`${prefixCls}-inner`">
                <div :class="`${prefixCls}-text`" v-if="dt.selectionMode === 'multiple'">
                    <va-checkbox v-model="dt.totalChecked" @click.native="dt.rowClick"></va-checkbox>
                </div>
                <div :class="`${prefixCls}-text`" v-if="dt.selectionMode === 'single'">
                </div>
            </div>
        </th>
        <template v-for="(col, i) in columns">
            <th :style="col.style" :class="columnsClasses">
                <div :class="`${prefixCls}-inner`" @click="dt.onColumnSort(col, $event)">
                    <div :class="`${prefixCls}-text`">
                        <span v-if="!col.headerRender">{{col.header}}</span>
                        <va-table-template v-else :row-index="i" :row-data="col" :render="headerRender(col)"></va-table-template>
                        <span v-if="dt.sort || col.sort" :class="`${prefixCls}-sort`">
                          <i class="va-icon" :class="{'va-icon-rotate-180': dt.sortState && (dt.currentCol === col)}">arrow_downward</i>
                        </span>
                    </div>
                    <span :class="`${prefixCls}-resizer`" v-if="dt.resizable && dt.border"
                          @mousedown="dt.columnResizeStart"></span>
                </div>
            </th>
        </template>
    </tr>
    </thead>
</template>

<script>
    import vaTableTemplate from './table-template';
    import vaCheckbox from '../checkbox';
    import vaRadio from '../radio';
    const prefixCls = 'va-table-head';

    export default {
        name: 'va-table-head',
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
            }
        },
        data() {
            return {
                prefixCls,
                expandableRows: false,
                order: false,
                selectionMode: '',
                totalChecked: false,
                dt: {}
            }
        },
        methods: {
            columnsClasses(sort) {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-sort`]: sort
                    }
                ]
            },
            headerRender(col) {
                let render = () => {
                    return '';
                };
                if (col.type === 'header' && col.headerRender) {
                    render = col.headerRender;
                }
                return render;
            }
        },
        computed: {
            thClasses() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-expand`]: this.dt && this.dt.expandableRows,
                        [`${prefixCls}-order`]: this.dt && this.dt.order
                    }
                ]
            }
        },
        mounted() {
            this.dt = this.$parent;
        }
    }
</script>