<template>
    <div class="va-page-error">
        <va-card class="panel-box animated flipInX">
            <template slot="content">
                <div class="header text-center">
                    <h4>Error <strong>404</strong></h4>
                </div>
                <div class="text-center">
                    <h4 class="m-t-20 m-b-0">Page not found</h4>
                    <p class="text-muted">The requested page was not found</p>
                </div>
                <div class="form-group text-center">
                    <va-button link-to="/" class="va-unlock-btn text-uppercase" theme="primary" size="lg">
                        <va-icon icon="home"></va-icon>
                        return to home
                    </va-button>
                </div>
            </template>
        </va-card>
    </div>
</template>

<script>
    export default {
        name: "va-page404"
    }
</script>

<style scoped lang="less">
    @import "./error.less";
</style>