<template>
    <va-row>
        <va-col :lg="12">
            <va-card>
                <div class="top">
                    <va-tooltip dir="top" content="This is a Tip!">
                        <va-button>bottom-center</va-button>
                    </va-tooltip>
                    <va-tooltip dir="top-left" content="This is a Tip!">
                        <va-button>bottom-center</va-button>
                    </va-tooltip>
                    <va-tooltip dir="top-right" content="This is a Tip!">
                        <va-button>bottom-center</va-button>
                    </va-tooltip>
                </div>
                <div class="center clearfix">
                    <div class="center-left">
                        <va-tooltip dir="top" content="This is a Tip!">
                            <va-button>bottom-center</va-button>
                        </va-tooltip>
                        <va-tooltip dir="top-left" content="This is a Tip!">
                            <va-button>bottom-center</va-button>
                        </va-tooltip>
                        <va-tooltip dir="top-right" content="This is a Tip!">
                            <va-button>bottom-center</va-button>
                        </va-tooltip>
                    </div>
                    <div class="center-right">
                        <va-tooltip dir="top" content="This is a Tip!">
                            <va-button>bottom-center</va-button>
                        </va-tooltip>
                        <va-tooltip dir="top-left" content="This is a Tip!">
                            <va-button>bottom-center</va-button>
                        </va-tooltip>
                        <va-tooltip dir="top-right" content="This is a Tip!">
                            <va-button>bottom-center</va-button>
                        </va-tooltip>
                    </div>
                </div>
                <div class="bottom">
                    <va-tooltip content="This is a Tip!">
                        <va-button>bottom-center</va-button>
                    </va-tooltip>
                    <va-tooltip dir="bottom-left" content="This is a Tip!">
                        <va-button>bottom-center</va-button>
                    </va-tooltip>
                    <va-tooltip dir="bottom-right" content="This is a Tip!">
                        <va-button>bottom-center</va-button>
                    </va-tooltip>
                </div>
            </va-card>
        </va-col>
    </va-row>
</template>

<script>

    const prefixCls = 'va-tooltip-case';

    export default {
        name: 'va-tooltip-case'
    }
</script>

<style scoped lang="less">
    .va-row {
        .center-left {
            float: left;
        }
        .center-right {
            float: right;
        }
    }
</style>