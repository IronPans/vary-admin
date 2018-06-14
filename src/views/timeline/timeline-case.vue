<template>
    <div class="va-page-box">
        <va-row>
            <va-col :lg="12">
                <va-card>
                    <va-timeline>
                        <va-timeline-node>
                            <va-button theme="primary">NOW</va-button>
                        </va-timeline-node>
                        <va-timeline-item>
                            <template slot="badge">
                                <va-icon icon="chat_bubble_outline" class="f-18 text-muted"></va-icon>
                            </template>
                            <div class="p-10">
                                <h4>New Items Arrived</h4>
                                <p class="m-t-5 m-b-5">
                                    <small class="flex justify-center text-muted">
                                       <va-icon class="f-14 p-r-5" icon="schedule"></va-icon> Feb, 23rd 2014 by CreativeUser
                                    </small>
                                </p>
                                <p>Purchased new stationary items for head office</p>
                            </div>
                        </va-timeline-item>
                        <va-timeline-item :inverted="true">
                            <template slot="badge">
                                <va-icon icon="chat_bubble_outline" class="f-18 text-muted"></va-icon>
                            </template>
                            <div class="p-10">
                                <h4>New Items Arrived</h4>
                                <p class="m-t-5 m-b-5">
                                    <small class="flex justify-center text-muted">
                                        <va-icon class="f-14 p-r-5" icon="schedule"></va-icon> Feb, 23rd 2014 by CreativeUser
                                    </small>
                                </p>
                                <p>Purchased new stationary items for head office</p>
                            </div>
                        </va-timeline-item>
                    </va-timeline>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>

    const prefixCls = 'va-timeline-case';

    export default {
        name: 'va-timeline-case'
    }
</script>