<template>
  <div class="va-page-box">
    <va-row>
      <va-col :lg="6">
        <va-card>
          <va-swiper :options="options" :data="slides">
            <template #item="{ item, index }">
              <div :class="['box', item.clz]">{{ item.content }}</div>
            </template>
            <!-- <va-swiper-slide>
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
            </va-swiper-slide> -->
          </va-swiper>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
const options = {
  navigation: true,
};
const slides = [
  {
    clz: "bg-blue",
    content: "Slide1",
  },
  {
    clz: "bg-green",
    content: "Slide2",
  },
  {
    clz: "bg-red",
    content: "Slide2",
  },
];
// export default {
//     name: "swiper-case",
//     data() {
//         return {
//             options: {
//                 navigation: true
//             }
//         }
//     }
// }
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
