<template>
    <div class="va-page-box">
        <va-row>
            <va-col :lg="6">
                <va-card>
                    <va-swiper :options="options">
                        <va-swiper-slide>
                            <div class="box bg-blue">Slide1</div>
                        </va-swiper-slide>
                        <va-swiper-slide>
                            <div class="box bg-green">Slide2</div>
                        </va-swiper-slide>
                        <va-swiper-slide>
                            <div class="box bg-red">Slide3</div>
                        </va-swiper-slide>
                        <va-swiper-slide>
                            <div class="box bg-orange">Slide4</div>
                        </va-swiper-slide>
                    </va-swiper>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>
    export default {
        name: "swiper-case",
        data() {
            return {
                options: {
                    navigation: true
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .box {
        width: 100%;
        height: 180px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 20px;
    }
</style>