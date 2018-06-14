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
                    <va-input placeholder="Username" v-model="form.account"></va-input>
                </div>
                <div class="form-group">
                    <va-input placeholder="Password" v-model="form.password"></va-input>
                </div>
                <div class="form-group row justify-center">
                    <div class="col-6">
                        <va-checkbox> Remember me </va-checkbox>
                    </div>
                    <div class="col-6 flex justify-center align-right">
                        Forgot Password?
                    </div>
                </div>
                <div class="form-group">
                    <va-button theme="primary" type="submit" @click="handleSubmit" size="lg" :block="true">LOG IN</va-button>
                </div>
                <div class="form-group m-t-60 text-center">
                    Don't have an account? <b><router-link to="register">Sign Up</router-link></b>
                </div>
            </template>
        </va-card>
    </div>
</template>

<script>
    import {validate, validateAll} from "@/base/vary-ui/components/base/validator";

    export default {
        name: "va-login",
        data() {
            return {
                form: {
                    account: 'admin',
                    password: ''
                }
            }
        },
        methods: {
            handleSubmit() {
                const values = [
                    {
                        name: 'account',
                        value: this.form.account,
                        rules: [
                            {type: 'string', required: true}
                        ]
                    },
                    {
                        name: 'password',
                        value: this.form.password,
                        rules: [
                            {type: 'string', required: true}
                        ]
                    }
                ];
                validateAll(values, (valid) => {
                    if (valid) {
                        this.$store.commit('login', {
                            account: this.form.account
                        });

                        this.$router.push({
                            name: 'home_index'
                        })
                    }
                })
                // validate({account: this.form.account}, {account: {type: "string", required: true}}, (a, b) => {
                //     console.log(a, b)
                // })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "./login.less";
</style>