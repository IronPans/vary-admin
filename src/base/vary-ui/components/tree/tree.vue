<template>
    <div :class="prefixCls">
        <div v-if="loading" :class="`${prefixCls}-loading`">
            <div :class="`${prefixCls}-loading-mask`"></div>
            <div :class="`${prefixCls}-loading-content`"></div>
        </div>
        <ul :class="`${prefixCls}-inner`">
            <va-tree-node v-for="(node, index) in value" :selection-mode="selectionMode" :tree="tree"
                          :selection="currentSelection"
                          :node="node" :key="index.toString()" :index="index"></va-tree-node>
        </ul>
        <div v-if="!loading && value.length > 0" :class="`${prefixCls}-empty-message`">
            {{emptyMessage}}
        </div>
    </div>
</template>

<script>
    import {oneOf} from "@/base/vary-ui/components/base/utils";
    import vaTreeNode from './tree-node';

    const prefixCls = 'va-tree';

    export default {
        name: 'VaTree',
        components: {vaTreeNode},
        props: {
            emptyMessage: {
                type: String
            },
            loading: {
                type: Boolean
            },
            passSelectedUp: {
                type: Boolean,
                default: true
            },
            passSelectedDown: {
                type: Boolean,
                default: true
            },
            selection: {
                type: [Object]
            },
            selectionMode: {
                validator(value) {
                    return oneOf(value, ['single', 'checkbox'])
                }
            },
            value: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                prefixCls,
                currentSelection: this.selection,
                nodeTouched: false,
                tree: this
            }
        },
        methods: {
            onNodeClick(event, node) {
                const {passSelectedDown, passSelectedUp, selectionMode, selection} = this;
                if (selectionMode) {
                    const index = this.findIndexInSelection(node);
                    const selected = (index >= 0);

                    if (this.isCheckboxSelectionMode()) {
                        if (selected) {
                            if (passSelectedDown) {
                                this.passDown(node, false);
                            } else {
                                this.currentSelection = this.getSelection(index);
                            }

                            if (passSelectedUp && node.parent) {
                                this.passUp(node.parent, false);
                            }
                            this.onSelectChange();
                            this.onNodeUnselect({originalEvent: event, node});
                        } else {
                            if (passSelectedDown) {
                                this.passDown(node, true);
                            } else {
                                this.currentSelection = [...selection || [], node];
                            }

                            if (passSelectedUp && node.parent) {
                                this.passUp(node.parent, true);
                            }
                            this.onSelectChange();
                            this.onNodeSelect({originalEvent: event, node});
                        }
                    } else {
                        if (this.isSingleSelectionMode()) {
                            if (selected) {
                                this.currentSelection = null;
                                this.onNodeUnselect({originalEvent: event, node});
                            } else {
                                this.currentSelection = node;
                                this.onNodeSelect({originalEvent: event, node});
                            }
                        } else {
                            if (selected) {
                                this.currentSelection = this.getSelection(index);
                                this.onNodeUnselect({originalEvent: event, node});
                            } else {
                                this.currentSelection = [...this.currentSelection || [], node];
                                this.onNodeSelect({originalEvent: event, node});
                            }
                        }
                        this.onSelectChange();
                    }
                }
                this.nodeTouched = false;
            },

            onNodeTouchEnd() {
                this.nodeTouched = true;
            },

            passUp(node, select) {
                if (node.children && node.children.length) {
                    let selectedCount = 0;
                    let childPartialSelected = false;
                    for (const child of node.children) {
                        if (this.isSelected(child)) {
                            selectedCount++;
                        } else if (child.partialSelected) {
                            childPartialSelected = true;
                        }
                    }

                    if (select && selectedCount === node.children.length) {
                        this.currentSelection = [...this.currentSelection || [], node];
                        node.partialSelected = false;
                    } else {
                        if (!select) {
                            const index = this.findIndexInSelection(node);
                            if (index >= 0) {
                                this.currentSelection = this.getSelection(index);
                            }
                        }

                        node.partialSelected = (childPartialSelected ||
                        selectedCount > 0 && selectedCount !== node.children.length);
                    }
                }

                const parent = node.parent;
                if (parent) {
                    this.passUp(parent, select);
                }
            },

            passDown(node, select) {
                const index = this.findIndexInSelection(node);

                if (select && index === -1) {
                    this.currentSelection = [...this.currentSelection || [], node];
                } else if (!select && index > -1) {
                    this.currentSelection = this.getSelection(index);
                }

                node.partialSelected = false;

                if (node.children && node.children.length) {
                    for (const child of node.children) {
                        this.passDown(child, select);
                    }
                }
            },

            getSelection(index) {
                return this.currentSelection.filter((val, i) => (val && i !== index));
            },

            findIndexInSelection(node) {
                let index = -1;

                if (this.selectionMode && this.currentSelection) {
                    if (this.isSingleSelectionMode()) {
                        index = (this.currentSelection === node) ? 0 : -1;
                    } else {
                        for (let i = 0; i < this.currentSelection.length; i++) {
                            if (this.currentSelection[i] === node) {
                                index = i;
                                break;
                            }
                        }
                    }
                }

                return index;
            },

            isSelected(node) {
                return this.findIndexInSelection(node) !== -1;
            },

            isSingleSelectionMode() {
                return this.selectionMode && this.selectionMode === 'single';
            },

            isCheckboxSelectionMode() {
                return this.selectionMode && this.selectionMode === 'checkbox';
            },
            onNodeCollapse(data) {
                this.$emit('on-node-collapse', data);
            },
            onNodeExpand(data) {
                this.$emit('on-node-expand', data);
            },
            onNodeSelect(data) {
                this.$emit('on-node-select', data);
            },
            onNodeUnselect(data) {
                this.$emit('on-node-unselect', data);
            },
            onSelectChange() {
                this.$emit('on-change', this.currentSelection);
            }
        }
    }
</script>