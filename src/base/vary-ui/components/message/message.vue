<template>
    <div :class="classes">
        <div v-if="hideBackdrop && currentMessages.length > 0"
             @click="handleClose" :class="`${prefixCls}-overlay`"></div>
        <va-message-item v-for="(item, index) in currentMessages"
                        :class="item.className"
                        :delay="item.delay"
                        :closable="item.closable"
                        @on-close="close(item.key, index)"
                        :message="item.message"
                        :transition-name="item.transitionName"
                        :key="item.key"></va-message-item>
    </div>
</template>

<script>
    import vaMessageItem from './message-item.vue';

    const prefixCls = 'va-message';
    let seed = 0;
    const now = Date.now();

    const getUuid = () => {
        return `Message-${now}_${seed++}`;
    };

    export default {
        name: 'va-message',
        components: {vaMessageItem},
        props: {
            messages: {
                type: Array,
                default() {
                    return [];
                }
            },
            className: {
                type: String
            },
            hideBackdrop: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                prefixCls,
                currentMessages: [...this.messages]
            }
        },
        methods: {
            add(messageItem) {
                if (messageItem) {
                    const key = messageItem.key ? messageItem.key : getUuid();
                    const hideBackdrop = Boolean(messageItem.hideBackdrop);
                    messageItem.key = key;
                    messageItem.hideBackdrop = hideBackdrop;
                    const messages = [...this.currentMessages];
                    let isExit = false;
                    for (const message of messages) {
                        if (message.key === key) {
                            isExit = true;
                            break;
                        }
                    }
                    if (!isExit) {
                        messages.push(messageItem);
                        this.currentMessages = messages;
                    }
                }
                return messageItem;
            },
            remove(key) {
                this.currentMessages = this.currentMessages.filter((message) => message.key !== key);
            },
            handleClose() {
                this.currentMessages = [];
            },
            close(key, index) {
                const currentMessage = this.currentMessages[index];
                if (currentMessage.onClose) {
                    currentMessage.onClose();
                }
                this.remove(key);
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-none`]: this.currentMessages.length <= 0
                    },
                    this.className
                ]
            }
        }
    }
</script>