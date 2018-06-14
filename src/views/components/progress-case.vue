<template>
    <div class="va-page-box">
        <va-row :gutter="16">
            <va-col :lg="6">
                <va-card header="Progress">
                    <va-progress value="50"></va-progress>
                    <va-progress value="50" bar-color="#17a2b8" class="m-t-10"></va-progress>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Striped Progress">
                    <va-progress value="50" bar-color="#28a745" :striped="true"></va-progress>
                    <va-progress value="50" bar-color="#dc3545" :striped="true" :animated="true" class="m-t-10"></va-progress>
                </va-card>
            </va-col>
        </va-row>
        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="6">
                <va-card header="Knob">
                    <va-knob :value="50"></va-knob>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="With Icon Knob">
                    <va-knob :value="50">
                        <va-icon icon="search"></va-icon>
                    </va-knob>

                    <va-knob :value="30" :size="50">
                        40%
                    </va-knob>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>
    export default {
        name: "progress-case"
    }
</script>

<style scoped>
    .va-spin {
        margin: 10px;
    }
</style>