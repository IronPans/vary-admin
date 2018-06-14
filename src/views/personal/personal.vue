<template>
    <div class="va-page-box">
        <va-card header="个人中心" class="p-20 p-t-0">
            <template slot="content">
                <div class="form-group">
                    <va-input label="用户名" :inline="true" placeholder="Username" v-model="form.account"></va-input>
                </div>
                <div class="form-group">
                    <va-input label="手机号" :inline="true" placeholder="Phone" v-model="form.phone"></va-input>
                </div>
            </template>
            <template slot="footer">
                <div class="form-group">
                    <va-button theme="primary">保存</va-button>
                </div>
            </template>
        </va-card>
    </div>
</template>

<script>
    const prefixCls = 'va-personal';

    export default {
        name: 'va-personal',
        data() {
            return {
                form: {
                    account: this.$store.state.user.account,
                    phone: ''
                }
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="less">
    .form-group {
        margin-bottom: 10px;
        font-size: 15px;

        &:last-child {
            margin: 0;
        }
    }
</style>