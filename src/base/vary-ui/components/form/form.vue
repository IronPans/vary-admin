<template>
  <form :class="classes" :novalidate="novalidate"><slot></slot></form>
</template>

<script lang="ts">
import { defineComponent, provide, computed, defineExpose } from "vue";
import { formInjectKey } from "./config";
const prefixCls = "va-form";

export default defineComponent({
  name: "VaForm",
  props: {
    group: {
      type: Object,
    },
    rules: {
      type: Object,
      default() {
        return {};
      },
    },
    novalidate: {
      type: Boolean,
    },
    inline: {
      type: Boolean,
    },
  },
  setup(props) {
    const fields: any = [];
    // onMounted(() => {
    //     this.fields = this.$children.filter((child) => {
    //   return child.name;
    // });
    // });
    function validate(callback) {
      return new Promise((resolve, reject) => {
        let count = 0,
          valid = true;
        fields.forEach((validate) => {
          validate((errors) => {
            if (errors) {
              valid = false;
            }
            if (count === fields.length - 1) {
              resolve(valid);
              if (typeof callback === "function") {
                callback(valid);
              }
            }
            count++;
          });
        });
      });
    }
    function getRules(name: string) {
      return props.rules[name];
    }
    function getValue(name: string) {
      return props.group?.[name];
    }
    function addField(field: any) {
      fields.push(field);
    }

    defineExpose({
      validate,
    });

    provide(formInjectKey, {
      getRules,
      getValue,
      addField,
    });

    return {
      prefixCls,
      fields: [],
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-inline`]: props.inline,
          },
        ];
      }),
    };
  },
});
</script>
