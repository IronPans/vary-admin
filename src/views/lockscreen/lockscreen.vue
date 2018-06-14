<template>
    <div class="va-page-lockscreen">
        <va-card class="login-box animated flipInX">
            <template slot="content">
                <p class="text-center">
                    <va-avatar src="assets/images/avatar/1.jpg"></va-avatar>
                    <br>
                    <span>Siam Graves</span>
                </p>
                <div class="form-group">
                    <va-input placeholder="Password"></va-input>
                </div>
                <div class="form-group text-center">
                    <va-button @click="unlock" class="va-unlock-btn" theme="primary" size="lg" :rounded="true">
                        Unlock
                    </va-button>
                </div>
            </template>
        </va-card>
    </div>
</template>

<script>

    export default {
        name: "va-lockscreen",
        data() {
            return {
                form: {
                    password: ''
                }
            }
        },
        methods: {
            unlock() {
                localStorage.removeItem('locking');
                this.$router.push({
                    name: 'home_index'
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "./lockscreen.less";
</style>