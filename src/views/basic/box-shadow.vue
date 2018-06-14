<template>
    <div class="va-page-box">
        <va-card header="Box Shadow">
            <va-row :gutter="16">
                <va-col :lg="4" v-for="i in 24" :key="i" class="m-b-20">
                    <div :class="`va-shadow-box d-${i}dp`">
                        Use class <code>d-{{i}}dp</code> inside div element to add box-shadow.
                    </div>
                </va-col>
            </va-row>
        </va-card>
    </div>
</template>

<script>

    const prefixCls = 'va-box-shadow';

    export default {
        name: 'va-box-shadow'
    }
</script>

<style lang="less" scoped>
    .va-shadow-box {
        padding: 10px 20px;
        font-size: 13px;
        text-align: center;
        box-sizing: border-box;
        background: #fff;
    }

    .va-shadow-box code {
        background-color: #eee;
        margin: 5px;
        display: inline-block;

    }
</style>