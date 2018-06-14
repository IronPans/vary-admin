<template>
    <div class="va-page-box">
        <va-row :gutter="16">
            <va-col :lg="6">
                <va-card>
                    <h4 slot="header">
                        Margin
                        <small>eg: <code>&lt;div class="m-10 m-b-0"&gt;&lt;div&gt;</code></small>
                    </h4>
                    <template slot="content">
                        <strong class="d-block m-b-10">Margin</strong>

                        <code>.m-0</code>
                        <code>.m-5</code>
                        <code>.m-10</code>
                        <code>.m-15</code>
                        <code>.m-20</code>
                        <code>.m-25</code>

                        <br>
                        <br>

                        <strong class="d-block m-b-10">Margin Top</strong>

                        <code>.m-t-0</code>
                        <code>.m-t-5</code>
                        <code>.m-t-10</code>
                        <code>.m-t-15</code>
                        <code>.m-t-20</code>
                        <code>.m-t-25</code>

                        <br>
                        <br>

                        <strong class="d-block m-b-10">Margin Right</strong>

                        <code>.m-r-0</code>
                        <code>.m-r-5</code>
                        <code>.m-r-10</code>
                        <code>.m-r-15</code>
                        <code>.m-r-20</code>
                        <code>.m-r-25</code>

                        <br>
                        <br>

                        <strong class="d-block m-b-10">Margin Bottom</strong>

                        <code>.m-b-0</code>
                        <code>.m-b-5</code>
                        <code>.m-b-10</code>
                        <code>.m-b-15</code>
                        <code>.m-b-20</code>
                        <code>.m-b-25</code>

                        <br>
                        <br>

                        <strong class="d-block m-b-10">Margin Left</strong>

                        <code>.m-l-0</code>
                        <code>.m-l-5</code>
                        <code>.m-l-10</code>
                        <code>.m-l-15</code>
                        <code>.m-l-20</code>
                        <code>.m-l-25</code>
                    </template>
                </va-card>
                <va-card class="m-t-20">
                    <h4 slot="header">
                        Text Transform <small>eg: <code>&lt;div class="text-uppercase"&gt;&lt;div&gt;</code></small>
                    </h4>
                    <template slot="content">
                        <code>.text-lowercase</code>
                        <code>.text-uppercase</code>
                        <code>.text-capitalize</code>
                    </template>
                </va-card>
                <va-card class="m-t-20">
                    <h4 slot="header">
                        Text Color <small>eg: <code>&lt;div class="c-blue"&gt;&lt;div&gt;</code></small>
                    </h4>
                    <template slot="content">
                        <code>.c-blue</code>
                        <code>.c-indigo</code>
                        <code>.c-purple</code>
                        <code>.c-pink</code>
                        <code>.c-red</code>
                        <code>.c-orange</code>
                        <code>.c-yellow</code>
                        <code>.c-green</code>
                        <code>.c-teal</code>
                        <code>.c-cyan</code>
                        <code>.c-white</code>
                        <code>.c-gray</code>
                        <code>.c-gray-dark</code>
                        <code>.c-primary</code>
                        <code>.c-secondary</code>
                        <code>.c-success</code>
                        <code>.c-info</code>
                        <code>.c-warning</code>
                        <code>.c-danger</code>
                        <code>.c-light</code>
                        <code>.c-dark</code>
                    </template>
                </va-card>
                <va-card class="m-t-20">
                    <h4 slot="header">
                        Positions <small>eg: <code>&lt;div class="p-sticky"&gt;&lt;div&gt;</code></small>
                    </h4>
                    <template slot="content">
                        <code>.p-sticky</code>
                        <code>.p-relative</code>
                        <code>.p-absolute</code>
                        <code>.p-fixed</code>
                        <code>.p-static</code>
                    </template>
                </va-card>
            </va-col>

            <va-col :lg="6">
                <va-card>
                    <h4 slot="header">
                        Padding
                        <small>eg: <code>&lt;div class="p-10 p-b-0"&gt;&lt;div&gt;</code></small>
                    </h4>
                    <template slot="content">
                        <strong class="d-block m-b-10">Padding</strong>

                        <code>.p-0</code>
                        <code>.p-5</code>
                        <code>.p-10</code>
                        <code>.p-15</code>
                        <code>.p-20</code>
                        <code>.p-25</code>

                        <br>
                        <br>

                        <strong class="d-block m-b-10">Padding Top</strong>

                        <code>.p-t-0</code>
                        <code>.p-t-5</code>
                        <code>.p-t-10</code>
                        <code>.p-t-15</code>
                        <code>.p-t-20</code>
                        <code>.p-t-25</code>

                        <br>
                        <br>

                        <strong class="d-block m-b-10">Padding Right</strong>

                        <code>.p-r-0</code>
                        <code>.p-r-5</code>
                        <code>.p-r-10</code>
                        <code>.p-r-15</code>
                        <code>.p-r-20</code>
                        <code>.p-r-25</code>

                        <br>
                        <br>

                        <strong class="d-block m-b-10">Padding Bottom</strong>

                        <code>.p-b-0</code>
                        <code>.p-b-5</code>
                        <code>.p-b-10</code>
                        <code>.p-b-15</code>
                        <code>.p-b-20</code>
                        <code>.p-b-25</code>

                        <br>
                        <br>

                        <strong class="d-block m-b-10">Padding Left</strong>

                        <code>.p-l-0</code>
                        <code>.p-l-5</code>
                        <code>.p-l-10</code>
                        <code>.p-l-15</code>
                        <code>.p-l-20</code>
                        <code>.p-l-25</code>
                    </template>
                </va-card>
                <va-card class="m-t-20">
                    <h4 slot="header">
                        Text Align <small>eg: <code>&lt;div class="text-center"&gt;&lt;div&gt;</code></small>
                    </h4>
                    <template slot="content">
                        <code>.text-center</code>
                        <code>.text-right</code>
                        <code>.text-left</code>
                        <code>.text-justify</code>
                    </template>
                </va-card>
                <va-card class="m-t-20">
                    <h4 slot="header">
                        Background Color <small>eg: <code>&lt;div class="bg-blue"&gt;&lt;div&gt;</code></small>
                    </h4>
                    <template slot="content">
                        <code>.bg-blue</code>
                        <code>.bg-indigo</code>
                        <code>.bg-purple</code>
                        <code>.bg-pink</code>
                        <code>.bg-red</code>
                        <code>.bg-orange</code>
                        <code>.bg-yellow</code>
                        <code>.bg-green</code>
                        <code>.bg-teal</code>
                        <code>.bg-cyan</code>
                        <code>.bg-white</code>
                        <code>.bg-gray</code>
                        <code>.bg-gray-dark</code>
                        <code>.bg-primary</code>
                        <code>.bg-secondary</code>
                        <code>.bg-success</code>
                        <code>.bg-info</code>
                        <code>.bg-warning</code>
                        <code>.bg-danger</code>
                        <code>.bg-light</code>
                        <code>.bg-dark</code>
                    </template>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>
    const prefixCls = 'va-generic-classes';

    export default {
        name: 'va-generic-classes'
    }
</script>

<style scoped lang="less">
    h4 {
        margin: 0;
    }
    h4 small {
        display: block;
        margin-top: 5px;
        color: #AEAEAE;
        line-height: 160%;
    }
</style>