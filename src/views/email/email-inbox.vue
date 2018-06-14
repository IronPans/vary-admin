<template>
    <div class="va-page-box">
        <va-card class="email-wrapper">
            <div>
                <va-row>
                    <va-col :md="3" class="mail-sidebar">
                        <div class="p-10 text-center">
                            <va-button link-to="/email_compose" theme="primary">Compose</va-button>
                        </div>
                        <div class="menu-bar">
                            <va-list>
                                <va-list-item class="active">
                                    <va-icon icon="local_post_office"></va-icon>
                                    <va-list-item-text>
                                        Inbox
                                    </va-list-item-text>
                                    <va-list-item-action>
                                        <va-badge :count="11" status="primary" :fixed="false"></va-badge>
                                    </va-list-item-action>
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
                                    <va-list-item-action>
                                        <va-badge :count="11" status="info" :fixed="false"></va-badge>
                                    </va-list-item-action>
                                </va-list-item>
                            </va-list>
                            <div class="label-list">
                                <h5>Labels</h5>
                                <va-list>
                                    <va-list-item>
                                        <va-list-item-text>
                                            <va-badge :dot="true" :fixed="false" status="primary"></va-badge> Work
                                        </va-list-item-text>
                                    </va-list-item>
                                    <va-list-item>
                                        <va-list-item-text>
                                            <va-badge :dot="true" :fixed="false" status="info"></va-badge> Design
                                        </va-list-item-text>
                                    </va-list-item>
                                    <va-list-item>
                                        <va-list-item-text>
                                            <va-badge :dot="true" :fixed="false" status="success"></va-badge> Family
                                        </va-list-item-text>
                                    </va-list-item>
                                    <va-list-item>
                                        <va-list-item-text>
                                            <va-badge :dot="true" :fixed="false" status="warning"></va-badge> Friends
                                        </va-list-item-text>
                                    </va-list-item>
                                    <va-list-item>
                                        <va-list-item-text>
                                            <va-badge :dot="true" :fixed="false" status="error"></va-badge> Office
                                        </va-list-item-text>
                                    </va-list-item>
                                </va-list>
                            </div>
                        </div>
                    </va-col>
                    <va-col :md="9" class="mail-body">
                        <div class="mail-body-header">
                            <va-button theme="primary" size="sm">
                                <va-icon icon="error"></va-icon>
                            </va-button>
                            <va-button theme="info" size="sm">
                                <va-icon icon="move_to_inbox"></va-icon>
                            </va-button>
                            <va-button theme="danger" size="sm">
                                <va-icon icon="delete"></va-icon>
                            </va-button>
                            <va-button theme="success" shape="circle" size="sm">
                                <va-icon icon="autorenew"></va-icon>
                            </va-button>
                        </div>
                        <va-table :pagination="true" selection-mode="multiple" :hover="true" :columns="columns" :data="data"></va-table>
                    </va-col>
                </va-row>
            </div>
        </va-card>
    </div>
</template>

<script>
    export default {
        name: "va-email",
        data() {
            return {
                columns: [
                    {
                        field: 'progress',
                        header: 'Progress',
                        render(h, params) {
                            const data = params.rowData.progress;
                            return h('va-icon', {
                                class: data.labelClass,
                                props: {
                                    icon: data.icon
                                }
                            })
                        }
                    },
                    {
                        field: 'name',
                        header: 'First name'
                    },
                    {
                        field: 'amount',
                        header: 'Amount'
                    },
                    {
                        field: 'deadline',
                        header: 'Deadline'
                    }
                ],
                data: [
                    {
                        'name': 'John Doe',
                        'progress': {
                            icon: 'star',
                            labelClass: 'text-c-red'
                        },
                        'amount': '$ 77.99',
                        'deadline': '13:02 PM'
                    },
                    {
                        'name': 'Messsy Adam',
                        'progress': {
                            icon: 'star',
                            labelClass: 'text-c-green'
                        },
                        'amount': '$245.30',
                        'deadline': 'July 1, 2018'
                    },
                    {
                        'name': 'John Richards',
                        'progress': {
                            icon: 'star',
                            labelClass: 'text-c-blue'
                        },
                        'amount': '$138.00',
                        'deadline': 'Apr 12, 2018'
                    },
                    {
                        'name': 'John Doe',
                        'progress': {
                            icon: 'star',
                            labelClass: 'text-c-red'
                        },
                        'amount': '$ 77.99',
                        'deadline': '13:02 PM'
                    },
                    {
                        'name': 'Messsy Adam',
                        'progress': {
                            icon: 'star'
                        },
                        'amount': '$245.30',
                        'deadline': 'July 1, 2018',
                        labelClass: 'text-c-blue'
                    },
                    {
                        'name': 'John Richards',
                        'progress': {
                            icon: 'star'
                        },
                        'amount': '$138.00',
                        'deadline': 'Apr 12, 2018',
                        labelClass: 'text-c-red'
                    }
                ]
            }
        }
    }
</script>

<style lang="less">
    @import "./email.less";
</style>