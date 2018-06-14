<template>
    <router-view></router-view>
</template>

<script>
    export default {
        components: {},
        methods: {
            addThemeLink() {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.id = 'admin-theme';
                link.href = 'assets/themes/white-dark.css';
                document.head.appendChild(link);
            }
        },
        mounted() {
//            this.$Notification.success({
//                title: 'Welcome to Vary-Admin!',
//                message: 'Welcome to Vary-Admin!'
//            });
            this.addThemeLink();
        }
    }
</script>

<style lang="less">
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    body {
        font: 13px Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
        line-height: 1.5;
        color: #303548;
        background: #f5f5f5;

        &::-webkit-scrollbar {
            height: 6px;
            width: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #6e6e6e;
            outline: 1px solid #333;
        }

        &::-webkit-scrollbar-corner,
        &::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, .3);
        }
    }

    @import "base/vary-ui/styles/base";
    @import "base/vary-ui/styles/index";
    @import "base/styles/widget/index";
</style>