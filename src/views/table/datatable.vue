<template>
    <div class="va-page-box">
        <va-row :gutter="16">
            <va-col :lg="6">
                <va-card header="Pagination">
                    <va-table :pagination="true" :row="4" :columns="columns" :data="books"></va-table>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Multiple Selection">
                    <va-table selection-mode="multiple" :columns="columns" :data="books"></va-table>
                </va-card>
            </va-col>
        </va-row>
        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="6">
                <va-card header="Fixed Header">
                    <va-table :scrollable="true" max-height="150px" :columns="columns" :data="books"></va-table>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Sort">
                    <va-table :columns="columns" :sort="true" :data="books"></va-table>
                </va-card>
            </va-col>
        </va-row>
        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="6">
                <va-card header="Expand">
                    <va-table :expandable-rows="true" :columns="expandColumns" :data="books"></va-table>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Custom Header">
                    <va-table :columns="headerColumns" :data="books"></va-table>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>

    const prefixCls = 'va-datatable';

    export default {
        name: 'va-datatable',
        data() {
            return {
                columns: [
                    {
                        field: 'name',
                        header: 'name'
                    },
                    {
                        field: 'age',
                        header: 'name'
                    },
                    {
                        field: 'address',
                        header: 'name'
                    },
                    {
                        field: 'job',
                        header: 'name'
                    }
                ],
                books: [
                    {
                        'name': 'Tom Black',
                        'age': 20,
                        'address': 'beijing',
                        'job': 'engineer'
                    },
                    {
                        'name': 'Tom Green',
                        'age': 25,
                        'address': 'shanghai',
                        'job': 'police'
                    },
                    {
                        'name': 'Tom Brown',
                        'age': 30,
                        'address': 'guangdong',
                        'job': 'nurse'
                    },

                    {
                        'name': 'Tom Black',
                        'age': 20,
                        'address': 'beijing',
                        'job': 'engineer'
                    },
                    {
                        'name': 'Tom Green',
                        'age': 25,
                        'address': 'shanghai',
                        'job': 'police'
                    }
                ],
                expandColumns: [
                    {
                        field: 'name',
                        header: 'name',
                        type: 'expand',
                        expandRender(h, params) {
                            const data = params.rowData;
                            return h('va-progress', {
                                props: {
                                    value: data.age
                                }
                            });
                        }
                    },
                    {
                        field: 'age',
                        header: 'name'
                    },
                    {
                        field: 'address',
                        header: 'name'
                    },
                    {
                        field: 'job',
                        header: 'name'
                    }
                ],
                headerColumns: [
                    {
                        field: 'name',
                        header: 'name',
                        type: 'header',
                        headerRender(h, params) {
                            const data = params.rowData;
                            return h('span', {
                                'class': {
                                    'flex': true,
                                    'justify-center': true
                                }
                            }, [
                                h('va-icon', {
                                    style: {
                                        fontSize: '16px'
                                    },
                                    props: {
                                        icon: 'home'
                                    }
                                }),
                                data.header
                            ]);
                        }
                    },
                    {
                        field: 'age',
                        header: 'name'
                    },
                    {
                        field: 'address',
                        header: 'name'
                    },
                    {
                        field: 'job',
                        header: 'name'
                    }
                ]
            }
        }
    }
</script>