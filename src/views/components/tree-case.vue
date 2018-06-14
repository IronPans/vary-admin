<template>
    <div class="va-page-box">
        <va-row :gutter="16">
            <va-col :lg="6">
                <va-card header="Default Tree">
                    <va-tree :value="TREES['data']"></va-tree>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Single Select">
                    <va-tree :value="TREES['data']" selectionMode="single"></va-tree>
                </va-card>
            </va-col>
        </va-row>
        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="6">
                <va-card header="Checkbox Select">
                    <va-tree selection-mode="checkbox" :value="TREES['data']"></va-tree>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>
    const prefixCls = 'va-tree-case';
    const TREES = {
        "data": [
            {
                "label": "parent1",
                "value": "parent1",
                "children": [
                    {
                        "label": "child1",
                        "value": "child1",
                        "children": [
                            {
                                "label": "Grandchild 1",
                                "value": "Grandchild 1"
                            },
                            {
                                "label": "Grandchild 2",
                                "value": "Grandchild 2"
                            }
                        ]
                    },
                    {
                        "label": "child2",
                        "value": "child2"
                    }
                ]
            }
        ]
    };

    export default {
        name: 'va-tree-case',
        data() {
            return {
                TREES
            }
        }
    }
</script>