<template>
  <div :class="classes" :style="data.rowStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  useSlots,
  defineComponent,
  reactive,
  computed,
  onMounted,
  onUnmounted,
  provide,
  ref,
} from "vue";
import { oneOf } from "../base/utils";
import enquire from "enquire.js";
import { gridInjectionKey } from "./config";

if (typeof window !== "undefined") {
  const matchMediaPolyfill = (mediaQuery) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

const responsiveArray = ["lg", "md", "sm", "xs"];

const responsiveMap = {
  xs: "(max-width: 767px)",
  sm: "(min-width: 768px)",
  md: "(min-width: 992px)",
  lg: "(min-width: 1200px)",
};

export default defineComponent({
  props: {
    gutter: {
      type: [Number, String],
      default: 0,
    },
    align: {
      type: String,
      default: "",
      validator(value) {
        return oneOf(value, ["top", "middle", "bottom"]);
      },
    },
    justify: {
      type: String,
      default: "",
      validator(value) {
        return oneOf(value, ["start", "center", "end", "space-between", "space-around"]);
      },
    },
  },
  setup(props) {
    const data = reactive({
      screens: {},
      rowStyle: {},
    });

    const prefixCls = "row";

    const classes = computed(() => {
      let align = "";
      const justify = props.justify && "align-" + props.justify;
      switch (props.align) {
        case "top":
          align = "justify-start";
          break;
        case "middle":
          align = "justify-center";
          break;
        case "bottom":
          align = "justify-end";
          break;
      }
      switch (props.align) {
        case "start":
          align = "align-left";
          break;
        case "end":
          align = "align-right";
          break;
      }
      return [`${prefixCls}`, align, justify];
    });

    function getMediaScreen() {
      const { gutter } = props;
      if (typeof gutter === "object") {
        Object.keys(responsiveMap).map((screen) =>
          enquire.register(responsiveMap[screen], {
            match: () => {
              if (typeof gutter !== "object") {
                return;
              }
              data.screens = {
                ...data.screens,
                [screen]: true,
              };
            },
            unmatch: () => {
              if (typeof gutter !== "object") {
                return;
              }
              data.screens = {
                ...data.screens,
                [screen]: false,
              };
            },
            destroy() {},
          })
        );
      }
    }

    function getSpacing() {
      const { gutter } = props;
      if (typeof gutter === "object") {
        for (let i = 0; i <= responsiveArray.length; i++) {
          const breakpoint = responsiveArray[i];
          if (data.screens[breakpoint] && gutter[breakpoint] !== undefined) {
            return gutter[breakpoint];
          }
        }
      }
      return gutter;
    }

    const itemStyleRef = ref({});
    getMediaScreen();
    const gutter = getSpacing();
    const halfSpacing = gutter / 2;
    data.rowStyle =
      gutter > 0
        ? {
            marginLeft: -halfSpacing + "px",
            marginRight: -halfSpacing + "px",
          }
        : {};

    if (gutter > 0) {
      itemStyleRef.value = {
        paddingLeft: halfSpacing + "px",
        paddingRight: halfSpacing + "px",
      };
    }
    provide(gridInjectionKey, {
      itemStyleRef,
    });

    onMounted(() => {
      // const slots = useSlots();
      // console.log(slots.default);
      // this.$refs.map((child) => {
      //   if (gutter > 0) {
      //     child.style = {
      //       paddingLeft: halfSpacing + "px",
      //       paddingRight: halfSpacing + "px",
      //     };
      //   }
      // });
    });

    onUnmounted(() => {
      Object.keys(responsiveMap).map((screen) =>
        enquire.unregister(responsiveMap[screen])
      );
    });

    return {
      classes,
      data,
    };
  },
});
</script>
