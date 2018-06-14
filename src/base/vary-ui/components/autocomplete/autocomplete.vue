<template>
    <div :class="prefixCls">
        <va-input :id="id" v-model="inputValue" @input="handleChange" :placeholder="placeholder"
                 @on-focus="handleFocus" @on-blur="handleBlur"></va-input>
        <transition name="scaleInTop">
            <div v-if="visible" :class="menuClasses" :style="menuStyles">
                <va-list>
                    <va-list-item v-for="(item, index) in filterValue" :key="item"
                                 @click.native="handleItemClick(item)">
                        <va-list-item-text>{{item.label}}</va-list-item-text>
                    </va-list-item>
                    <va-list-item v-if="filterValue && filterValue.length <= 0">
                        {{emptyMessage}}
                    </va-list-item>
                </va-list>
            </div>
        </transition>
    </div>
</template>

<script>
    import {getSize} from '../base/utils';
    import {clickOutside} from '../base/dom';
    import {listen} from '../base/event';

    const prefixCls = 'va-autocomplete';

    export default {
        name: 'va-autocomplete',
        props: {
            count: {
                type: Number,
                count: 5
            },
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            maxHeight: {
                type: [Number, String]
            },
            emptyMessage: {
                type: String,
                default: '没有数据'
            },
            placeholder: {
                type: String
            },
            id: {
                type: String
            }
        },
        data() {
            return {
                prefixCls,
                visible: false,
                filterData: this.data,
                inputValue: '',
                selfClick: false,
                documentClickListener: ''
            }
        },
        computed: {
            menuClasses() {
                return [
                    `${prefixCls}-menus`,
                    {
                        [`${prefixCls}-scroll`]: this.maxHeight
                    }
                ]
            },
            menuStyles() {
                return {
                    maxHeight: getSize(this.maxHeight)
                }
            },
            filterValue() {
                let count = 0;
                const {count: countProps} = this;
                const total = this.filterData.length;
                return this.filterData.filter((value) => {
                    const keep =
                        (!this.inputValue || value.label.toLowerCase().includes(this.inputValue.toLowerCase())) &&
                        count < ((countProps && countProps !== -1) || (countProps === -1 && total) || 5);

                    if (keep) {
                        count += 1;
                    }
                    return keep;
                });
            }
        },
        methods: {
            handleDomClick(event) {
                if (this.visible) {
                    clickOutside(event.target, prefixCls, () => {
                        this.selfClick = true;
                    }, () => {
                        this.selfClick = false;
                        this.visible = false;
                    });
                }
            },

            handleChange() {
                this.visible = true;
                this.$emit('on-change', this.inputValue);
            },

            handleFocus() {
                if (this.inputValue) {
                    this.visible = true;
                }
                this.$emit('on-focus');
            },

            handleBlur(event) {
                this.$emit('on-blur', event.value);
            },

            handleItemClick(item) {
                this.visible = false;
                this.inputValue = item.label;
                this.$emit('on-select', {
                    item,
                    originEvent: event
                });
            }
        },
        watch: {
            data(val) {
                if (val) {
                    this.filterData = val;
                }
            }
        },
        mounted() {
            this.documentClickListener = listen(document, 'click', this.handleDomClick);
        },
        beforeDestroy() {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        }
    }
</script>