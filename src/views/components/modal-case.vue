<template>
    <div class="va-page-box">
        <va-row :gutter="16">
            <va-col :lg="4">
                <va-card header="Default Modal">
                    <va-button theme="primary" @click="defaultVisible = !defaultVisible">open</va-button>
                </va-card>
            </va-col>
            <va-col :lg="4">
                <va-card header="Delay Modal">
                    <va-button theme="primary" @click="delayVisible = !delayVisible">open</va-button>
                </va-card>
            </va-col>
            <va-col :lg="4">
                <va-card header="Confirm">
                    <va-button theme="primary" @click="openConfirm">confirm</va-button>
                </va-card>
            </va-col>
        </va-row>
        <va-modal header="Header" v-model="defaultVisible" @on-ok="onOk" @on-cancel="onCancel">
            123
        </va-modal>
        <va-modal header="Header" :confirm-loading="confirmLoading" v-model="delayVisible" @on-ok="onDelayOk" @on-cancel="onCancel">
            123
        </va-modal>
    </div>
</template>

<script>

    export default {
        name: "VaModalCase",
        data() {
            return {
                defaultVisible: false,
                delayVisible: false,
                confirmLoading: false
            }
        },
        methods: {
            onOk() {
                this.defaultVisible = false;
            },
            onCancel() {
                this.defaultVisible = false;
                this.delayVisible = false;
            },
            onDelayOk() {
                this.confirmLoading = true;

                setTimeout(() => {
                    this.confirmLoading = false;
                    this.delayVisible = false;
                }, 3000)
            },
            openConfirm() {
                this.$Modal.confirm({
                    title: 'Title',
                    content: 'Content'
                })
            }
        }
    }
</script>

<style scoped>

</style>