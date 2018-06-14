<template>
    <div class="va-page-box">
        <va-row>
            <va-col :lg="12">
                <va-card header="Editor">
                    <va-editor width="100%"></va-editor>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>
    const prefixCls = 'va-editor-case';

    export default {
        name: 'va-editor-case'
    }
</script>