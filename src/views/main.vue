<template>
    <div class="v-containers">
        <aside class="v-aside">
            <div class="v-aside-header">
                Vary Admin
            </div>
        </aside>
        <main class="v-content">
            <header class="v-nav">
                <div class="v-nav-left">
                    <v-button class="v-nav-menu">
                        <v-icon icon="menu"/>
                    </v-button>
                </div>
            </header>
            <div class="v-content-wrapper">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script>
    import vButton from '@/components/button/index';
    import vIcon from '@/components/icon/index';

    export default {
        name: "main",
        components: {
            vButton,
            vIcon
        }
    }
</script>

<style scoped lang="less">
    @import "main";
</style>