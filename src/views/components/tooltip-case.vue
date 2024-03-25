<template>
  <va-row>
    <va-col :lg="12">
      <va-card>
        <div class="top">
          <va-tooltip dir="top" content="This is a Tip!">
            <va-button>top</va-button>
          </va-tooltip>
          <va-tooltip dir="top-left" content="This is a Tip!">
            <va-button>top-left</va-button>
          </va-tooltip>
          <va-tooltip dir="top-right" content="This is a Tip!">
            <va-button>top-right</va-button>
          </va-tooltip>
        </div>
        <div class="bottom">
          <va-tooltip content="This is a Tip!">
            <va-button>bottom-center</va-button>
          </va-tooltip>
          <va-tooltip dir="bottom-left" content="This is a Tip!">
            <va-button>bottom-left</va-button>
          </va-tooltip>
          <va-tooltip dir="bottom-right" content="This is a Tip!">
            <va-button>bottom-right</va-button>
          </va-tooltip>
        </div>
      </va-card>
    </va-col>
  </va-row>
</template>

<script setup lang="ts">
// const prefixCls = 'va-tooltip-case';

// export default {
//     name: 'va-tooltip-case'
// }
</script>

<style scoped lang="less">
.va-tooltip {
  margin: 10px;
}
.va-row {
  .center-left {
    float: left;
  }
  .center-right {
    float: right;
  }
}
</style>
