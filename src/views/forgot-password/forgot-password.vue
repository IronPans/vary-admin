<template>
    <div class="va-page-forgot-password">
        <va-card class="login-box animated flipInX">
            <template slot="content">
                <p class="text-center">
                    <va-avatar src="assets/images/avatar/1.jpg"></va-avatar>
                    <br>
                    <span>Siam Graves</span>
                </p>
                <div class="form-group">
                    <va-input v-model="form.email" :animated="true" placeholder="Email"></va-input>
                </div>
                <div class="form-group">
                    <va-button class="va-unlock-btn" theme="primary" size="lg" :block="true" :rounded="true">
                        Reset Password
                    </va-button>
                </div>
                <div class="text-center">
                    <router-link to="/login">
                        Log In
                    </router-link>
                </div>
            </template>
        </va-card>
    </div>
</template>

<script>
    const prefixCls = 'va-forgot-password';

    export default {
        name: 'va-forgot-password',
        data() {
            return {
                form: {
                    email: ''
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "./forgot-password.less";
</style>