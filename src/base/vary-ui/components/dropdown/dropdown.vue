<template>
    <div :class="classes" v-clickoutside="onClickoutside" @mouseleave="handleMouseleave">
        <div :class="`${prefixCls}-header`" @click="toggle" @mouseover="handleMouseover"><slot/></div>
        <transition :name="hover ? 'moveInUp' : 'scaleInTop'">
            <div :class="menuClasses" ref="dropdown" v-show="expanded">
                <ul v-if="currentMenu && currentMenu.length > 0">
                    <template v-for="(item, index) in currentMenu">
                        <li v-if="!item.divider" :key="index" :class="`${prefixCls}-menu-item`" @click="itemClick(item)">
                            <i v-if="item.icon" class="va-icon">{{item.icon}}</i>
                            {{item.title}}
                        </li>
                        <li v-if="item.divider" :class="`${prefixCls}-divider`"></li>
                    </template>
                </ul>
                <slot name="menu"></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    import {oneOf} from '../base/utils';
    import {addClass} from "../base/dom";
    import clickoutside from '../../directives/clickoutside';

    const prefixCls = 'va-dropdown';

    export default {
        name: 'va-dropdown',
        directives: {clickoutside},
        props: {
            menu: {
                type: Array,
                default() {
                    return [];
                }
            },
            direction: {
                validator(value) {
                    return oneOf(value, ['top-left','bottom-right','bottom-left','top-right']);
                },
                default: 'bottom-left'
            },
            hover: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentMenu: this.menu,
                expanded: false,
                prefixCls
            }
        },
        methods: {
            itemClick(item) {
                this.expanded = false;
                if (item.onClick) {
                    item.onClick();
                }
            },
            toggle() {
                if (!this.hover) {
                    this.expanded = !this.expanded;
                }
            },
            handleMouseover() {
                if (this.hover) {
                    this.expanded = true;
                }
            },
            handleMouseleave() {
                if (this.hover) {
                    this.expanded = false;
                }
            },
            close() {
                this.expanded = false;
            },
            onClickoutside() {
                if (!this.hover) {
                    this.close();
                }
            }
        },
        computed: {
            classes() {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-expanded`]: this.expanded,
                        [`${prefixCls}-hover`]: this.hover
                    }
                ]
            },
            menuClasses() {
                return [
                    `${prefixCls}-menu`,
                    `${prefixCls}-${this.direction}`
                ]
            }
        }
    }
</script>