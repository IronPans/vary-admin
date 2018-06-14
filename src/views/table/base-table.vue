<template>
    <div class="va-page-box">
        <va-row :gutter="16">
            <va-col :lg="6">
                <va-card header="Basic Table">
                    <va-table :columns="progressColumns" :data="progressData"></va-table>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Striped Table">
                    <va-table :order="true" :striped="true" :columns="columns" :data="data"></va-table>
                </va-card>
            </va-col>
        </va-row>
        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="6">
                <va-card header="Hoverable Table">
                    <va-table :hover="true" :columns="columns" :data="data"></va-table>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Bordered Table">
                    <va-table :border="true" :columns="columns" :data="data"></va-table>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>

    const prefixCls = 'va-base-table';

    export default {
        name: 'va-base-table',
        data() {
            return {
                columns: [
                    {
                        field: 'name',
                        header: 'First name'
                    },
                    {
                        field: 'progress',
                        header: 'Progress'
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
                progressColumns: [
                    {
                        field: 'name',
                        header: 'First name'
                    },
                    {
                        field: 'progress',
                        header: 'Progress',
                        render(h, params) {
                            const data = params.rowData;
                            return h('va-progress', {
                                props: {
                                    value: data.progress.value,
                                    barColor: data.progress.color
                                }
                            });
                        }
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
                        'name': 'Herman Beck',
                        'progress': 20,
                        'amount': '$ 77.99',
                        'deadline': 'May 15, 2018'
                    },
                    {
                        'name': 'Messsy Adam',
                        'progress': 20,
                        'amount': '$245.30',
                        'deadline': 'July 1, 2018'
                    },
                    {
                        'name': 'John Richards',
                        'progress': 20,
                        'amount': '$138.00',
                        'deadline': 'Apr 12, 2018'
                    },
                    {
                        'name': 'Messsy Adam',
                        'progress': 20,
                        'amount': '$245.30',
                        'deadline': 'July 1, 2018'
                    },
                    {
                        'name': 'John Richards',
                        'progress': 20,
                        'amount': '$138.00',
                        'deadline': 'Apr 12, 2018'
                    }
                ],

                progressData: [
                    {
                        'name': 'Herman Beck',
                        'progress': {
                            value: 20,
                            color: '#007bff'
                        },
                        'amount': '$ 77.99',
                        'deadline': 'May 15, 2018'
                    },
                    {
                        'name': 'Messsy Adam',
                        'progress': {
                            value: 50,
                            color: '#17a2b8'
                        },
                        'amount': '$245.30',
                        'deadline': 'July 1, 2018'
                    },
                    {
                        'name': 'John Richards',
                        'progress': {
                            value: 60,
                            color: '#ffc107'
                        },
                        'amount': '$138.00',
                        'deadline': 'Apr 12, 2018'
                    },
                    {
                        'name': 'Messsy Adam',
                        'progress': {
                            value: 50,
                            color: '#17a2b8'
                        },
                        'amount': '$245.30',
                        'deadline': 'July 1, 2018'
                    },
                    {
                        'name': 'John Richards',
                        'progress': {
                            value: 60,
                            color: '#ffc107'
                        },
                        'amount': '$138.00',
                        'deadline': 'Apr 12, 2018'
                    }
                ]
            }
        }
    }
</script>