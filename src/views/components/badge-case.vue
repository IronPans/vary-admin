<template>
    <div class="va-page-box">
        <va-row :gutter="16">
            <va-col :lg="6">
                <va-card header="Badge">
                    <va-badge :count="11" :fixed="false"></va-badge>
                    <va-badge :count="1">
                        <va-icon icon="perm_identity"></va-icon>
                    </va-badge>
                    <va-badge :count="11" shape="circle">
                        <va-button>BUTTON</va-button>
                    </va-badge>
                    <va-button>
                        BUTTON
                        <va-badge :count="8" :fixed="false" class="m-0 p-l-5"/>
                    </va-button>

                    <br>

                    <va-badge :dot="true">
                        <va-icon icon="local_post_office"/>
                    </va-badge>
                    <va-badge :dot="true" :notify="true">
                        <va-icon icon="local_post_office"/>
                    </va-badge>

                    <p>
                        <va-badge :dot="true" :fixed="false" status="primary"/>
                        primary
                    </p>
                    <p>
                        <va-badge :dot="true" :fixed="false" status="info"/>
                        info
                    </p>
                    <p>
                        <va-badge :dot="true" :fixed="false" status="success"/>
                        success
                    </p>
                    <p>
                        <va-badge :dot="true" :fixed="false" status="warning"/>
                        waring
                    </p>
                    <p>
                        <va-badge :dot="true" :fixed="false" status="error"/>
                        Error
                    </p>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Chip">
                    <va-chip :data="{label: 'Tome'}">
                        <va-avatar slot="avatar" src="assets/images/avatar/1.jpg"></va-avatar>
                    </va-chip>
                    <va-chip :data="{label: 'Tome'}">
                        <va-avatar slot="avatar" src="assets/images/avatar/1.jpg"></va-avatar>
                    </va-chip>
                    <va-chip :data="{label: 'Tome'}">
                        <va-icon slot="avatar" icon="perm_identity"></va-icon>
                    </va-chip>
                    <br>

                    <va-chip-group class="m-t-20" placeholder="Love" :data="chipData"></va-chip-group>
                </va-card>
            </va-col>
        </va-row>

        <va-row class="m-t-20" :gutter="16">
            <va-col :lg="6">
                <va-card header="Breadcrumb">
                    <va-breadcrumb :data="menus"/>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>

    export default {
        name: "va-badge-case",
        data() {
            return {
                chipData: [
                    {
                        label: 'CSS',
                        value: 'CSS'
                    },
                    {
                        label: 'Javascript',
                        value: 'Javascript'
                    }
                ],
                menus: [
                    {
                        name: 'Homepage',
                        icon: 'home',
                        type: 'icon',
                        render(h, params) {
                            return h('va-icon', {
                                icon: params.icon
                            })
                        }
                    },
                    {name: 'item 1'},
                    {name: 'item 2'}
                ]
            }
        }
    }
</script>

<style scoped>
    .va-badge {
        margin-right: 20px
    }
</style>