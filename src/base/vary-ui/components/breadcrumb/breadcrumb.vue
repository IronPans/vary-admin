<template>
    <ol :class="classes">
        <li v-for="(menu, index) in data" :key="index.toString()">
            <template v-if="menu.icon">
                <va-icon :icon="menu.icon"></va-icon>
            </template>
            <template v-if="menu.type === 'icon'">
                <va-template :render="menu.render"></va-template>
            </template>
            <span :class="`${prefixCls}-separator`" v-if="index > 0">
                    {{menu.separator || separator}}
                </span>
            <a :href="menu.to" v-if="!menu.linkTo">
                <span :class="`${prefixCls}-title`">{{menu.name}}</span>
            </a>
            <router-link v-else :to="menu.linkTo">
                <span :class="`${prefixCls}-title`">{{menu.name}}</span>
            </router-link>
        </li>
    </ol>
</template>

<script>
    import vaTemplate from '../base/template';

    const prefixCls = 'va-breadcrumb';

    export default {
        name: 'vaBreadcrumb',
        components: {vaTemplate},
        props: {
            data: {
                type: Array,
                default() {
                    return [];
                }
            },
            separator: {
                type: String,
                default: '/'
            }
        },
        data() {
            return {
                prefixCls
            }
        },
        computed: {
            classes() {
                return prefixCls;
            }
        }
    }
</script>