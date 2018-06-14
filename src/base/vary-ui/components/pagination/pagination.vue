<template>
    <div :class="classes">
        <ul>
            <va-pagination-item :disabled="isFirstPage" :index="currentValue - 1">
                <span :class="`${prefixCls}-backward`">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                    <path d="M30.83 32.67l-9.17-9.17 9.17-9.17L28 11.5l-12 12 12 12z"/>
                    <path d="M0-.5h48v48H0z" fill="none"/>
                </svg>
                </span>
            </va-pagination-item>
            <va-pagination-item v-if="startEllipsis" :index="1">
                <span :class="`${prefixCls}-number`">1</span>
            </va-pagination-item>
            <va-pagination-item :disabled="true" :index="1" v-if="startEllipsis">
                <span :class="`${prefixCls}-number  ${prefixCls}-ellipsis`"></span>
            </va-pagination-item>
            <va-pagination-item v-for="(page, index) in pages"
                               :key="page" :active="page === currentValue" :index="page">
            <span :class="`${prefixCls}-number`">{{page}}</span>
            </va-pagination-item>
            <va-pagination-item v-if="endEllipsis" :disabled="true">
                <span :class="`${prefixCls}-number ${prefixCls}-ellipsis`"></span>
            </va-pagination-item>
            <va-pagination-item v-if="pageCount > maxPage && !isLastPage && endEllipsis" :index="pageCount">
                <span :class="`${prefixCls}-number`">{{pageCount}}</span>
            </va-pagination-item>
            <va-pagination-item :disabled="isLastPage" :index="currentValue + 1">
                <span :class="`${prefixCls}-forward`">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                            <path d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z"/>
                            <path d="M0-.25h48v48H0z" fill="none"/>
                        </svg>
                </span>
            </va-pagination-item>
        </ul>
    </div>
</template>

<script>
    import {oneOf} from '../base/utils';
    import vaPaginationItem from './pagination-item.vue';

    const prefixCls = 'va-pagination';

    export default {
        name: 'va-pagination',
        components: {vaPaginationItem},
        props: {
            maxPage: {
                type: Number,
                default: 5
            },
            shape: {
                validator(value) {
                    return oneOf(value, 'circle');
                }
            },
            total: {
                type: Number
            },
            value: {
                type: Number,
                default: 1
            },
            row: {
                type: Number,
                default: 10
            }
        },
        data() {
            return {
                prefixCls,
                pageCount: 0,
                start: 0,
                end: 0,
                pages: [],
                isFirstPage: false,
                isLastPage: false,
                startEllipsis: false,
                endEllipsis: false,
                currentValue: this.value > 1 ? this.value : 1
            }
        },
        methods: {
            countPage(end, start = 0) {
                const pages = [];
                const min = Math.min(end, this.pageCount);
                for (let i = start; i < min; i++) {
                    pages.push(i + 1);
                }
                this.pages = pages;
            },
            changePage(index) {
                const {maxPage} = this;
                const middle = Math.ceil(maxPage / 2);
                if (index <= 1) {
                    index = 1;
                } else if (index >= this.getPage()) {
                    index = this.getPage();
                }
                this.start = index - middle;
                this.end = Math.min((index + maxPage - middle), this.pageCount);
                if (index < maxPage) {
                    this.end = maxPage;
                }
                if (this.end - this.start <= maxPage) {
                    this.start = this.end - maxPage;
                }
                if (this.start <= 0 || index < maxPage) {
                    this.start = 0;
                }

                this.currentValue = index;
                this.countPage(this.end, this.start);
                this.checkStartOrEnd(index);
                this.$emit('on-page-change', this.currentValue);
            },
            checkStartOrEnd(index) {
                this.isFirstPage = false;
                this.isLastPage = false;
                this.startEllipsis = false;
                this.endEllipsis = false;
                if (index === 1) {
                    this.isFirstPage = true;
                }
                if (index === this.pageCount) {
                    this.isLastPage = true;
                }
                if (this.maxPage < this.pageCount && !this.isLastPage && this.end !== this.pageCount) {
                    this.endEllipsis = true;
                }
                if (this.maxPage < this.pageCount && !this.isFirstPage && this.currentValue >= this.maxPage) {
                    this.startEllipsis = true;
                }
            },
            getPage() {
                return Math.max(this.maxPage, this.pageCount);
            },
            count(total, value) {
                this.pageCount = Math.ceil(total / this.row);
                this.countPage(this.maxPage);
                this.checkStartOrEnd(value);
                this.changePage(value);
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-circle`]: this.shape === 'circle'
                    }
                ]
            }
        },
        watch: {
          total(val) {
              this.count(val, this.currentValue);
          },
          value(val) {
              this.count(this.total, val);
          }
        },
        mounted() {
           this.count(this.total, this.currentValue);
        }
    }
</script>