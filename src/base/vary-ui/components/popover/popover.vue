<template>
  <div :class="prefixCls">
    <slot></slot>
    <div :class="`${prefixCls}-wrapper`">
      <div :class="`${prefixCls}-header`">
        {{ title }}
        <slot name="title"></slot>
      </div>
      <div :class="`${prefixCls}-body`">
        {{ body }}
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const prefixCls = "va-popover";

export default defineComponent({
  name: "vaPopover",
  props: {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  setup(props) {
    // function setElPositionStyle(elem) {
    //   if (elem && elem.style) {
    //     const position: any = getElPositionStyle(elem);
    //     elem.style.top = position.top + "px";
    //     elem.style.left = position.left + "px";
    //     elem.style.transformOrigin = position.transformOrigin;
    //   }
    // }

    // function getElPositionStyle(elem) {
    //   let { anchorEl, dir } = props;
    //   if (anchorEl) {
    //     const rect = anchorEl.getBoundingClientRect();
    //     const width = anchorEl.offsetWidth,
    //       height = anchorEl.offsetHeight;
    //     let elemWidth = elem.offsetWidth;
    //     const offsetWidth = elemWidth - width;
    //     let left = 0,
    //       top = rect.top;
    //     switch (dir) {
    //       case "top-left":
    //         left = rect.left - offsetWidth;
    //         break;
    //       case "top-center":
    //         left = rect.left - offsetWidth / 2;
    //         elemWidth = elemWidth / 2;
    //         break;
    //       case "top-right":
    //         left = rect.left;
    //         elemWidth = 0;
    //         break;
    //       case "bottom-left":
    //         top = rect.top + height;
    //         left = rect.left - offsetWidth;
    //         break;
    //       case "bottom-center":
    //         top = rect.top + height;
    //         left = rect.left - offsetWidth / 2;
    //         elemWidth = elemWidth / 2;
    //         break;
    //       case "bottom-right":
    //         left = rect.left;
    //         top = rect.top + height;
    //         elemWidth = 0;
    //         break;
    //     }
    //     return { left, top, transformOrigin: elemWidth + "px 0 0" };
    //   }
    // }
    
    return {
      prefixCls,
      body: props.body
    };
  },
});
</script>
