<template>
    <div class="va-page-box">
        <va-row>
            <va-col :lg="12">
                <va-card header="Default Steps">
                    <va-steps v-model="value">
                        <va-step-pane label="test">
                            Click to Next Step!
                            <div class="m-t-10">
                                <va-button @click="toNext" theme="primary">Next</va-button>
                            </div>
                        </va-step-pane>
                        <va-step-pane label="test1">
                            Click to Next Step!
                            <div class="m-t-10">
                                <va-button @click="toNext" theme="primary">Next</va-button>
                            </div>
                        </va-step-pane>
                        <va-step-pane label="test2">
                            Click to Complete!
                            <div class="m-t-10">
                                <va-button @click="toNext" theme="success">Complete</va-button>
                            </div>
                        </va-step-pane>
                    </va-steps>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>

    const prefixCls = 'va-steps-case';

    export default {
        name: 'va-steps-case',
        data() {
            return {
                value: 0
            }
        },
        methods: {
            toNext() {
                this.value += 1;
            }
        }
    }
</script>