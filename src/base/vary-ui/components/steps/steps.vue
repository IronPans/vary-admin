<template>
    <div :class="classes">
        <div :class="`${prefixCls}-nav`">
            <ul>
                <li v-for="(step, i) in navList" :class="itemClasses(i)"
                    :key="i.toString()" @click="handleClick(i)">
                    <span :class="statusClasses(i)">{{i + 1}}</span>
                    <span :class="`${prefixCls}-title`">{{step.label}}</span>
                    <span :class="`${prefixCls}-chevron`"></span>
                </li>
            </ul>
        </div>
        <div :class="`${prefixCls}-content`" v-if="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    const prefixCls = 'va-steps';

    export default {
        name: 'va-steps',
        props: {
            readonly: {
                default: false
            },
            value: {
                type: Number,
                default: 0
            },
            wired: {
                default: true
            },
            clickable: {
                type: Boolean,
                default: true
            },
            orientation: {
                type: String
            }
        },
        data() {
            return {
                prefixCls,
                activeIndex: this.value,
                content: '',
                navList: [],
                count: 0
            }
        },
        methods: {
            itemClasses(index) {
                return {
                    [`${prefixCls}-item`]: true,
                    active: index === this.activeIndex,
                    [`${prefixCls}-complete`]: index < this.activeIndex
                }
            },
            statusClasses(index) {
                return [
                    `${prefixCls}-number`,
                    {
                        'va-icon': index < this.activeIndex
                    }
                ]
            },
            handleClick(index) {
                if (!this.readonly && this.clickable && index > this.activeIndex) {
                    this.activeIndex = index;
                    if (this.count <= this.activeIndex) {
                        this.$emit('on-finish');
                    }
                    this.$emit('input', index);
                    this.$emit('on-change', index);
                }
            },
            updateNav() {
                const steps = this.$children;
                steps.forEach((child) => {
                    this.navList.push({
                        label: child.label || ''
                    })
                });
            },
            updateContent() {
                const steps = this.$children;
                this.count = steps.length;
                steps.forEach((child, index) => {
                    child.isActive = index === this.activeIndex;
                });
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-wired`]: this.wired
//                        [`${prefixCls}-vertical`]: this.orientation === 'vertical'
                    }
                ]
            }
        },
        mounted() {
            this.content = this.$slots.default;

            // 解决获取不到$children的问题
            setTimeout(() => {
                this.updateNav();
                this.updateContent();
            }, 0);
        },
        watch: {
            value(val) {
                this.activeIndex = val;
            },
            activeIndex() {
                this.updateContent();
                if (this.count <= this.activeIndex) {
                    this.$emit('on-finish');
                }
            }
        }
    }
</script>