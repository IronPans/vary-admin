<template>
    <li :class="classes" :style="{paddingLeft: '36px'}">
        <div :class="leafClasses" @click="onNodeClick" @touchend="onNodeTouchEnd">
            <button :class="toggleClasses" @click="toggle">
                        <span>
                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" :style="arrowStyle">
                            <g><path d="M7 10l5 5 5-5z"/></g></svg>
                        </span>
            </button>
            <div :class="`${prefixCls}-label`">
                <div v-if="tree && tree.$props.selectionMode === 'checkbox'" :class="`${prefixCls}-checkbox`">
                    <div :class="`${prefixCls}-checkbox-box`">
                        <div :class="`${prefixCls}-checkbox-icon`">
                            <svg v-if="node.partialSelected" fill="#4285F4" height="24" viewBox="0 0 24 24" width="24">
                                <defs>
                                    <path d="M0 0h24v24H0z" id="a"/>
                                </defs>
                                <clipPath id="b">
                                    <use overflow="visible" xlinkHref="#a"/>
                                </clipPath>
                                <path clipPath="url(#b)"
                                      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/>
                            </svg>
                            <template v-else>
                                <svg v-if="isSelected()" fill="#4285F4" height="24" viewBox="0 0 24 24" width="24">
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                <svg v-if="!isSelected()" fill="#757575" height="24" viewBox="0 0 24 24" width="24">
                                    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                </svg>
                            </template>
                        </div>
                    </div>
                </div>
                <span v-if="!isSelected()">
                    <template v-if="expanded && node.children && node.children.length">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#757575">
                            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                        </svg>
                    </template>
                    <template v-else>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#757575">
                            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                        </svg>
                    </template>
                </span>
                <span v-else>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#4285F4">
                <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
            </svg>
                </span>
                <span :class="`${prefixCls}-menu-label`">
                {{node.label}}
                </span>
            </div>
        </div>
        <ul v-show="node.children && expanded" :class="`${prefixCls}-children`">
            <va-tree-node v-for="(childNode, i) in node.children" :selection-mode="selectionMode" :tree="tree"
                          :selection="selection" :node="childNode"
                          :parentNode="node" :key="i.toString()" :index="i + index"></va-tree-node>
        </ul>
    </li>
</template>

<script>
    const prefixCls = 'va-tree-node';

    export default {
        name: 'VaTreeNode',
        props: {
            tree: {
                type: Object,
                default() {
                    return {}
                }
            },
            index: Number,
            node: {
                type: Object
            },
            parentNode: {},
            selection: {},
            selectionMode: {
                type: String
            }
        },
        data() {
            return {
                prefixCls,
                arrowStyle: {
                    pointerEvents: 'none',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    fill: 'rgb(117, 117, 117)'
                },
                expanded: this.node.expanded
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-leaf`]: this.isLeaf()
                    }
                ]
            },
            leafClasses() {
                return [
                    `${prefixCls}-content`,
                    {
                        [`${prefixCls}-selectable`]: this.selectionMode && this.node.selectable !== false,
                        [`${prefixCls}-content-selected`]: this.isSelected()
                    }
                ]
            },
            toggleClasses() {
                return [
                    `${prefixCls}-toggle`,
                    {
                        [`${prefixCls}-expanded`]: this.expanded
                    }
                ]
            }
        },
        methods: {
            isLeaf() {
                const node = this.node;
                return node.leaf === false ? false : !(node.children && node.children.length);
            },

            isSelected() {
                return this.tree.isSelected(this.node);
            },

            toggle(event) {
                event.stopPropagation();
                const node = this.node;
                const tree = this.tree;
                if (node.expanded) {
                    if (typeof tree.onNodeCollapse === 'function') {
                        tree.onNodeCollapse({originalEvent: event, node});
                    }
                } else {
                    if (typeof tree.onNodeExpand === 'function') {
                        tree.onNodeExpand({originalEvent: event, node});
                    }
                }

                node.expanded = !node.expanded;
                this.expanded = node.expanded;
            },

            onNodeClick(event) {
                this.tree.onNodeClick(event, this.node);
            },

            onNodeTouchEnd() {
                this.tree.onNodeTouchEnd();
            }
        },
        created() {
            this.node.parent = this.parentNode;
        },
        watch: {
            expanded(val) {
                this.node.expanded = val;
            }
        }
    }
</script>