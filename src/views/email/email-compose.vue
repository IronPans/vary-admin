<template>
    <div class="va-page-box">
        <va-card class="email-wrapper">
            <div>
                <va-row>
                    <va-col :md="3" class="mail-sidebar">
                        <div class="menu-bar">
                            <va-list>
                                <va-list-item class="active">
                                    <va-icon icon="local_post_office"></va-icon>
                                    <va-list-item-text>
                                        Inbox
                                    </va-list-item-text>
                                    <va-list-action>
                                        <va-badge :count="11" status="primary" :fixed="false"></va-badge>
                                    </va-list-action>
                                </va-list-item>
                                <va-list-item>
                                    <va-icon icon="star"></va-icon>
                                    <va-list-item-text>
                                        Starred
                                    </va-list-item-text>
                                </va-list-item>
                                <va-list-item>
                                    <va-icon icon=" assignment"></va-icon>
                                    <va-list-item-text>
                                        Drafts
                                    </va-list-item-text>
                                </va-list-item>
                                <va-list-item>
                                    <va-icon icon="send"></va-icon>
                                    <va-list-item-text>
                                        Sent Mail
                                    </va-list-item-text>
                                </va-list-item>
                                <va-list-item>
                                    <va-icon icon="delete"></va-icon>
                                    <va-list-item-text>
                                        Trash
                                    </va-list-item-text>
                                    <va-list-action>
                                        <va-badge :count="11" status="info" :fixed="false"></va-badge>
                                    </va-list-action>
                                </va-list-item>
                            </va-list>
                            <div class="label-list">
                                <h5>Labels</h5>
                                <va-list>
                                    <va-list-item>
                                        <va-list-item-text>
                                            <va-badge :dot="true" :fixed="false" status="primary"/> Work
                                        </va-list-item-text>
                                    </va-list-item>
                                    <va-list-item>
                                        <va-list-item-text>
                                            <va-badge :dot="true" :fixed="false" status="info"/> Design
                                        </va-list-item-text>
                                    </va-list-item>
                                    <va-list-item>
                                        <va-list-item-text>
                                            <va-badge :dot="true" :fixed="false" status="success"/> Family
                                        </va-list-item-text>
                                    </va-list-item>
                                    <va-list-item>
                                        <va-list-item-text>
                                            <va-badge :dot="true" :fixed="false" status="warning"/> Friends
                                        </va-list-item-text>
                                    </va-list-item>
                                    <va-list-item>
                                        <va-list-item-text>
                                            <va-badge :dot="true" :fixed="false" status="danger"/> Office
                                        </va-list-item-text>
                                    </va-list-item>
                                </va-list>
                            </div>
                        </div>
                    </va-col>
                    <va-col :md="9" class="mail-body p-20">
                        <div class="form-group m-b-10">
                            <va-input placeholder="收件人" class="flex" :block="true" :border="true"></va-input>
                        </div>
                        <div class="form-group m-b-10">
                            <va-input class="flex" placeholder="主题" :block="true" :border="true"></va-input>
                        </div>
                        <va-editor width="100%"></va-editor>
                        <div class="m-t-10 text-right">
                            <va-button theme="primary">Send</va-button>
                        </div>
                    </va-col>
                </va-row>
            </div>
        </va-card>
    </div>
</template>

<script setup lang="ts">
    // export default {
    //     name: "va-email-compose",
    //     data() {
    //         return {}
    //     }
    // }
</script>

<style lang="less">
    @import "./email.less";
</style>