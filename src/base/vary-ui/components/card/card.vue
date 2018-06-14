<template>
    <div :class="classes">
        <div v-if="showHead" :class="headerClasses">
            <slot name="header">{{header}}</slot>
        </div>
        <div :class="mediaClasses" v-if="showMedia">
            <slot name="media"/>
        </div>
        <div :class="contentClasses">
            <slot name="content"/>
            <slot/>
        </div>
        <div :class="footerClasses" v-if="$slots.footer">
            <slot name="footer"/>
        </div>
    </div>
</template>

<script>
    const prefixCls = 'va-card';

    export default {
        name: 'va-card',
        props: {
            header: {
              type: String,
              default: ''
          }
        },
        data() {
            return {
                showHead: true,
                showMedia: false
            }
        },
        computed: {
            classes() {
                return `${prefixCls}`;
            },
            headerClasses() {
                return `${prefixCls}-header`;
            },
            mediaClasses() {
                return `${prefixCls}-media`;
            },
            contentClasses() {
                return `${prefixCls}-content`;
            },
            footerClasses() {
                return `${prefixCls}-footer`;
            }
        },
        mounted() {
            this.showHead = this.header || this.$slots.header;
            this.showMedia = this.$slots.media;
        }
    }
</script>

<style></style>