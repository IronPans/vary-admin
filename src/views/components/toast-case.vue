<template>
    <div class="va-page-box">
        <va-row :gutter="16">
            <va-col :lg="4">
                <va-card header="Default Toast">
                    <va-button class="m-5" @click="toast('show')">Default</va-button>
                </va-card>
            </va-col>
            <va-col :lg="8">
                <va-card header="With Icon Toast">
                    <va-button class="m-5" @click="toast('info')">Info</va-button>
                    <va-button class="m-5" @click="toast('success')">Success</va-button>
                    <va-button class="m-5" @click="toast('warning')">Warning</va-button>
                    <va-button class="m-5" @click="toast('error')">Error</va-button>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>
    const prefixCls = 'va-toast-case';

    export default {
        name: 'va-toast-case',
        methods: {
            toast(type) {
                this.$Toast[type]({
                    message: 'Welcome to Vary-Admin!'
                });
            }
        }
    }
</script>