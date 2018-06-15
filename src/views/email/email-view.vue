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
                        <div class="p-l-20 p-r-20">
                            <h4 class="border-bottom p-b-10">Your message title goes here</h4>
                            <div class="mail-detail">
                                <va-list>
                                    <va-list-item>
                                        <va-avatar src="assets/images/avatar/1.jpg"></va-avatar>
                                        <va-list-item-text>
                                            Tome
                                            <div class="text-muted">From: jonathan@domain.com</div>
                                        </va-list-item-text>
                                    </va-list-item>
                                </va-list>
                                <div class="mail-detail-content">
                                    <p><b>Dear USer</b></p>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.</p>
                                    <p>enean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,</p>
                                </div>
                            </div>
                            <div class="mail-detail-footer">
                                <va-button theme="primary">reply</va-button>
                            </div>
                        </div>
                    </va-col>
                </va-row>
            </div>
        </va-card>
    </div>
</template>

<script>
    const prefixCls = 'va-email-view';

    export default {
        name: 'va-email-view',
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