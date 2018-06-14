<template>
    <div :class="prefixCls">
        <div :class="`${prefixCls}-input`" @click="onClick">
            <label v-if="currentValue">{{currentValue}}</label>
            <label v-if="!currentValue">{{placeholder}}</label>
        </div>
        <div :class="`${prefixCls}-menu`" v-if="visible" @click="onMenuClick">
            <div :class="`${prefixCls}-filter`" v-if="filter">
                <va-checkbox v-if="multiple"
                            v-model="multipleTotal" @on-change="onMultipleTotal">
                </va-checkbox>
                <div :class="`${prefixCls}-inner`">
                    <i class="va-icon">search</i>
                    <input type="text" v-model="filterValue" @input="onFilterChange">
                </div>
            </div>
            <div :class="`${prefixCls}-wrapper va-iscroll`">
                <ul v-if="!multiple">
                    <va-select-item v-for="(option, i) in filterValueBy(options, 'label')" :key="i.toString()"
                            @on-click="onItemClick" :option="option" :index="i"></va-select-item>
                </ul>
                <ul v-if="multiple">
                    <li v-for="(option, i) in filterValueBy(options, 'label')" :key="i.toString()">
                        <va-checkbox @on-change="onCheckboxSelect($event, option)"
                                       v-model="option.checked">{{option.label}}</va-checkbox>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {listen} from '../base/event';
    import {equals} from '../base/utils';
    import vaSelectItem from './select-item.vue';
    import vaCheckbox from '../checkbox';

    const prefixCls = 'va-select';

    export default {
        name: 'va-select',
        components: {
            vaCheckbox,
            vaSelectItem
        },
        props: {
            value: {
                type: [Array, String, Object]
            },
            placeholder: {
                type: String
            },
            filter: {
                default: false
            },
            multiple: {
                default: false
            },
            editable: {
                default: false
            },
            options: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        data() {
            return {
                prefixCls,
                currentValue: this.value,
                filterValue: '',
                visible: false,
                itemClick: false,
                selfClick: false,
                items: [],
                selected: [],
                bindDocumentClickListener: ''
            }
        },
        methods: {
            onMultipleTotal(checked) {
                this.multipleTotal = checked;
                if (this.multipleTotal) {
                    this.selected = Array.from(this.options);
                } else {
                    this.selected = [];
                }
                for (const option of this.options) {
                    option['checked'] = checked;
                }
                this.getSelectedValue();
            },

            onCheckboxSelect(checked, option) {
                if (checked) {
                    option.checked = true;
                    this.selected.push(option);
                    if (this.filterValueBy(this.options, 'label').length === this.selected.length) {
                        this.multipleTotal = true;
                    }
                } else {
                    this.multipleTotal = false;
                    const selected = this.selected;
                    let i = selected.length;
                    while (i) {
                        if (selected[i - 1].value === option['value']) {
                            this.selected.splice(i - 1, 1);
                            this.options[i - 1].checked = false;
                        }
                        i--;
                    }
                }
                this.getSelectedValue();
            },

            compareWith(value) {
                let isEqual = false;
                if (value && this.selected) {
                    if (Array.isArray(this.selected)) {
                        for (const o of this.selected) {
                            isEqual = equals(value, o['value']);
                            break;
                        }
                    } else {
                        isEqual = equals(value, this.selected.value);
                    }
                }
                return isEqual;
            },

            onItemClick($event) {
                this.itemClick = $event;
                this.selected = $event;
                this.currentValue = $event.label;
                this.getSelectedValue();
                this.close();
            },

            getValue() {
                this.currentValue = '';
                const selectedValue = [];
                if (Array.isArray(this.selected)) {
                    for (const s of this.selected) {
                        selectedValue.push(s.label);
                    }
                    this.currentValue = selectedValue.join(',');
                } else if (this.selected) {
                    this.currentValue = this.selected.label;
                }
            },

            getSelectedValue() {
                this.getValue();
                this.$emit('input', this.selected);
            },

            onFilterChange(event) {
            },

            addGroup(value) {
                this.items.push(value);
            },

            onMenuClick() {
                this.itemClick = true;
            },

            onDocumentClickListener() {
                if (!this.bindDocumentClickListener) {
                    this.bindDocumentClickListener = listen(document, 'click', () => {
                        if (!this.selfClick && !this.itemClick) {
                            this.close();
                        }
                        this.itemClick = false;
                        this.selfClick = false;
                    });
                }
            },

            offDocumentClickListener() {
                if (this.bindDocumentClickListener) {
                    this.bindDocumentClickListener();
                    this.bindDocumentClickListener = null;
                }
            },

            onClick() {
                if (!this.editable) {
                    if (!this.visible) {
                        this.open();
                    } else {
                        this.close();
                    }
                }
            },

            filterValueBy(options, value) {
                if (this.filter && options && Array.isArray(options)) {
                    return options.filter((v, k, arr) => {
                        const regexp = new RegExp(this.filterValue, 'ig');
                        if (regexp.test(v[value])) {
                            return true;
                        }
                    })
                }
                return options;
            },

            open() {
                this.selfClick = true;
                this.visible = true;
            },

            close() {
                this.visible = false;
                this.selfClick = false;
            }
        },
        created() {
            this.onDocumentClickListener();
        },
        beforeDestroy() {
            this.offDocumentClickListener();
        }
    }
</script>