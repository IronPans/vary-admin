<template>
    <div class="va-page-box">
        <va-row :gutter="16">
            <va-col :lg="6">
                <va-card header="Default Collapse">
                    <va-collapse>
                        <va-collapse-item header="Item 1">
                            Item 1 content.
                        </va-collapse-item>
                        <va-collapse-item header="Item 2">
                            Item 2 content.
                        </va-collapse-item>
                        <va-collapse-item header="Item 3">
                            Item 3 content.
                        </va-collapse-item>
                    </va-collapse>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Accordion">
                    <va-collapse :accordion="true">
                        <va-collapse-item header="Item 1">
                            Item 1 content.
                        </va-collapse-item>
                        <va-collapse-item header="Item 2">
                            Item 2 content.
                        </va-collapse-item>
                        <va-collapse-item header="Item 3">
                            Item 3 content.
                        </va-collapse-item>
                    </va-collapse>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>
    const prefixCls = 'va-collapse-case';

    export default {
        name: 'va-collapse-case'
    }
</script>