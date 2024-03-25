<template>
  <slot name="default"></slot>
  <Teleport to="body">
    <div :class="classes">
      <div
        v-if="hideBackdrop && currentMessages.length > 0"
        @click="handleClose"
        :class="`${prefixCls}-overlay`"
      ></div>
      <va-message-item
        v-for="(item, index) in currentMessages"
        :class="item.className"
        :delay="item.delay"
        :closable="item.closable"
        @on-close="close(item.key, index)"
        :message="item.message"
        :transition-name="item.transitionName"
        :key="item.key"
      ></va-message-item>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, provide } from "vue";
import vaMessageItem from "./message-item.vue";
import { messageInjectKey } from "./config";

const prefixCls = "va-message";
let seed = 0;
const now = Date.now();

const getUuid = () => {
  return `Message-${now}_${seed++}`;
};

export default defineComponent({
  name: "va-message",
  components: { vaMessageItem },
  props: {
    messages: {
      type: Array,
      default() {
        return [];
      },
    },
    className: {
      type: String,
    },
    hideBackdrop: {
      type: Boolean,
      default: false,
    },
    forRef: {},
  },
  setup(props) {
    const currentMessages = ref(props.messages || []);
    function add(messageItem) {
      if (messageItem) {
        const key = messageItem.key ? messageItem.key : getUuid();
        const hideBackdrop = Boolean(messageItem.hideBackdrop);
        messageItem.key = key;
        messageItem.hideBackdrop = hideBackdrop;
        const messages = [...currentMessages.value];
        let isExit = false;
        for (const message of messages) {
          if (message.key === key) {
            isExit = true;
            break;
          }
        }
        if (!isExit) {
          messages.push(messageItem);
          currentMessages.value = messages;
        }
      }
      return messageItem;
    }
    function remove(key) {
      currentMessages.value = currentMessages.value.filter(
        (message) => message.key !== key
      );
    }
    function handleClose() {
      currentMessages.value = [];
    }
    function close(key, index) {
      const currentMessage = currentMessages.value[index];
      if (currentMessage.onClose) {
        currentMessage.onClose();
      }
      remove(key);
    }

    const api = {
      add,
      remove,
    };

    provide(messageInjectKey, api);

    onMounted(() => {
      props.forRef?.({
        add,
        remove,
      });
    });

    return {
      prefixCls,
      hideBackdrop: props.hideBackdrop,
      currentMessages,
      close,
      handleClose,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-none`]: currentMessages.value.length <= 0,
          },
          props.className,
        ];
      }),
    };
  },
});
</script>
