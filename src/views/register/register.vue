<template>
    <div class="va-page-login">
        <va-card class="login-box">
            <template slot="content">
                <a class="text-center block">
                    <va-avatar :width="80" :height="80" src="assets/logo.png"></va-avatar>
                    <br>
                    <span class="login-title"><b>Vary</b> Admin</span>
                </a>
                <div class="form-group">
                    <va-input placeholder="Name"></va-input>
                </div>
                <div class="form-group">
                    <va-input placeholder="Email"></va-input>
                </div>
                <div class="form-group">
                    <va-input placeholder="Password"></va-input>
                </div>
                <div class="form-group">
                    <va-input placeholder="Confirm Password"></va-input>
                </div>
                <div class="form-group row justify-center">
                    <div class="col-6">
                        <va-checkbox>  I agree to all Terms </va-checkbox>
                    </div>
                </div>
                <div class="form-group">
                    <va-button theme="primary" size="lg" :block="true">Sign Up</va-button>
                </div>
                <div class="form-group m-t-60 text-center">
                    Already have an account?  <b><router-link to="login">Sign In</router-link></b>
                </div>
            </template>
        </va-card>
    </div>
</template>

<script>

    export default {
        name: "va-register"
    }
</script>

<style lang="less" scoped>
    @import "../login/login.less";
</style>