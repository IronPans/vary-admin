<template>
    <div class="va-page-box">
        <va-row :gutter="16">
            <va-col :lg="6">
                <va-card header="Default Tabs">
                    <va-tabs>
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab2">tab2</va-tab-pane>
                        <va-tab-pane label="Tab3">tab3</va-tab-pane>
                    </va-tabs>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Center Tabs">
                    <va-tabs :centermode="true">
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                    </va-tabs>
                </va-card>
            </va-col>
        </va-row>
        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="6">
                <va-card header="Default Tabs">
                    <va-tabs>
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab2">tab2</va-tab-pane>
                        <va-tab-pane label="Tab3">tab3</va-tab-pane>
                    </va-tabs>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Center Tabs">
                    <va-tabs :centermode="true" :scrollable="true">
                        <va-tab-pane label="Tab1">tab1</va-tab-pane>
                        <va-tab-pane label="Tab2">tab2</va-tab-pane>
                        <va-tab-pane label="Tab3">tab3</va-tab-pane>
                        <va-tab-pane label="Tab4">tab4</va-tab-pane>
                        <va-tab-pane label="Tab5">tab5</va-tab-pane>
                        <va-tab-pane label="Tab6">tab6</va-tab-pane>
                        <va-tab-pane label="Tab7">tab7</va-tab-pane>
                        <va-tab-pane label="Tab8">tab8</va-tab-pane>
                        <va-tab-pane label="Tab9">tab9</va-tab-pane>
                        <va-tab-pane label="Tab10">tab10</va-tab-pane>
                        <va-tab-pane label="Tab11">tab11</va-tab-pane>
                        <va-tab-pane label="Tab12">tab12</va-tab-pane>
                    </va-tabs>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>

    const prefixCls = 'va-tabs-case';

    export default {
        name: 'va-tabs-case'
    }
</script>