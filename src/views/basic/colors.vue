<template>
    <div class="va-page-box">
        <va-card header="Base Color">
            <div class="flex">
                <div class="color_list c-primary">
                    <h6>primary</h6>
                    <p>#007bff</p>
                </div>
                <div class="color_list c-info">
                    <h6>info</h6>
                    <p>#34bfa3</p>
                </div>
                <div class="color_list c-success">
                    <h6>success</h6>
                    <p>#34bfa3</p>
                </div>
                <div class="color_list c-warning">
                    <h6>warning</h6>
                    <p>#ffc107</p>
                </div>
                <div class="color_list c-danger">
                    <h6>danger</h6>
                    <p>#f4516c</p>
                </div>
            </div>
        </va-card>
    </div>
</template>

<script setup lang="ts">
    // const prefixCls = 'va-colors';

    // export default {
    //     name: 'va-colors',
    // }
</script>

<style scoped lang="less">
    .color_list {
        position: relative;
        padding-top: 80px;
        width: 80px;
        margin: 10px 20px 0 0;
        text-align: center;

        h6 {
            font-size: 16px;
            color: #4c5161;
            margin: 5px 0;
        }

        p {
            margin: 0;
            font-size: 14px;
            color: #4c5161;
        }

        &:before {
             content: '';
            position: absolute;
            top: 0;
            left: 0;
             border: 40px solid transparent;
             border-radius: 50%;
             box-shadow: 0 4px 16px;
             opacity: .5;
         }

        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            border: 40px solid;
            border-radius: 50%;
            left: 0;
            top: 0;
        }
    }
</style>