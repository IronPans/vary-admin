<template>
    <div class="v-main">
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        components: {}
    }
</script>

<style lang="less">
    @import "./styles/index.less";
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    body {
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

    .v-main {
        height: 100%;
    }
</style>