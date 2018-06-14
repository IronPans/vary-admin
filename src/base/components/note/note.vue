<template>
    <div :class="classes" :style="styles" ref="content">
        <div :class="`${prefixCls}-item`" v-for="(item, index) in currentData" :key="index.toString()"
             class="va-card-tile" :style="cardStyles(item)" @dblclick="openEditModal(index)" @mousedown="handleMousedown(item, $event)">
            <div class="lined-paper">
                <h4 class="m-0" v-if="item.title">{{item.title}}</h4>
                <p class="text-muted m-0" v-if="item.content">{{item.content}}</p>
                <template v-if="item.type === 'content' && item.render">
                    <va-template :data="item" :index="index" :render="item.render"></va-template>
                </template>
            </div>
        </div>
        <va-modal header="Add an Event" v-model="visible" @on-ok="confirm" @on-cancel="cancel">
            <div class="m-b-20">
                <va-input class="flex" :border="true" placeholder="title" v-model="selectedItem.title"></va-input>
            </div>
            <div class="m-b-20">
                <va-input class="flex" :border="true" placeholder="content" type="textarea" v-model="selectedItem.content"></va-input>
            </div>
        </va-modal>
    </div>
</template>

<script>
    import {listen} from '../../vary-ui/components/base/event';
    import {hasClass} from '../../vary-ui/components/base/dom';
    import {getSize} from '../../vary-ui/components/base/utils';

    const prefixCls = 'va-note';

    export default {
        name: 'vaNote',
        props: {
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            maxHeight: {
                type: [Number, String],
                default: 200
            },
            width: {
                type: [Number, String]
            },
            height: {
                type: [Number, String],
                default: 400
            }
        },
        data() {
            return {
                prefixCls,
                currentData: [],
                zIndex: 1,
                borderWidth: 0,
                borderHeight: 0,
                documentMoveListener: null,
                documentMoveEndListener: null,
                offset: {
                    x: 0,
                    y: 0
                },
                isMobile: false,
                currentNote: null,
                isDragging: false,
                target: null,
                visible: false,
                selectedItem: {
                    title: '',
                    content: ''
                },
                oldSelectedItem: {
                    title: '',
                    content: ''
                },
                selectedIndex: 0
            }
        },
        computed: {
            classes() {
                return [prefixCls]
            },
            styles() {
                return {
                    height: getSize(this.height),
                    width: getSize(this.width)
                }
            }
        },
        methods: {
            openEditModal(index) {
                this.visible = true;
                this.selectedItem = this.currentData[index];
                this.oldSelectedItem = {...this.selectedItem};
                this.selectedIndex = index;
            },
            confirm() {
                this.currentData[this.selectedIndex] = {
                    ...this.currentData[this.selectedIndex],
                    ...this.selectedItem
                };
                this.visible = false;
            },
            cancel() {
                this.currentData[this.selectedIndex] = {...this.oldSelectedItem};
                this.visible = false;
            },
            handleMousedown(note, e) {
                this.currentNote = note;
                const event = this.isMobile ? e.changedTouches[0] : e;
                this.offset = {
                    x: event.pageX,
                    y: event.pageY
                };
                this.resetDepth();
                this.currentNote.zIndex = this.currentData.length;
                this.isDragging = true;
                this.target = this.getChildNode(e);
                this.documentMoveListener = listen(document, 'mousemove', this.handleMousemove);
                this.documentMoveEndListener = listen(document, 'mouseup', this.handleMouseend);
            },
            handleMousemove(e) {
                if (!this.isDragging) {
                    return;
                }
                const event = this.isMobile ? e.changedTouches[0] : e;
                let {x, y} = this.currentNote;
                x += event.pageX - this.offset.x;
                y += event.pageY - this.offset.y;
                if (this.borderWidth) {
                    const diff = this.borderWidth - this.target.offsetWidth;
                    if (x < 0) {
                        x = 0;
                    } else if (x > diff) {
                        x = diff;
                    }
                }

                if (this.borderHeight) {
                    const diff = this.borderHeight - this.target.offsetHeight;
                    if (y < 0) {
                        y = 0;
                    } else if (y > diff) {
                        y = diff;
                    }
                }

                this.currentNote.x = x;
                this.currentNote.y = y;

                this.offset = {
                    x: event.pageX,
                    y: event.pageY
                }
            },
            handleMouseend(e) {
                this.isDragging = false;
                if (this.documentMousemoveListener) {
                    this.documentMousemoveListener();
                    this.documentMousemoveListener = null;
                }
                if (this.documentMoveEndListener) {
                    this.documentMoveEndListener();
                    this.documentMoveEndListener = null;
                }
            },
            getChildNode(e) {
                let target = e.target;
                while (target) {
                    if (hasClass(target, `${prefixCls}-item`)) {
                        break;
                    }
                    target = target.parentNode;
                }
                return target;
            },
            getData() {
                if (!Array.isArray(this.data)) {
                    this.currentData = [this.data];
                } else {
                    this.currentData = this.data;
                }
                const data = [];
                let num = 1;
                for (const item of this.currentData) {
                    data.push({x: num * 10, y: 0, rotate: 0, zIndex: 1, ...item});
                }
                this.currentData = data;
            },
            cardStyles(data) {
                return {
                    left: data.x + 'px',
                    top: data.y + 'px',
                    transform: `rotate(${data.rotate}deg)`,
                    zIndex: data.zIndex
                }
            },
            resetDepth() {
                for (const note of this.currentData) {
                    note.zIndex = 1;
                }
            }
        },
        created() {
            this.getData();
            this.isMobile = 'ontouchstart' in document;
        },
        mounted() {
            const content = this.$refs.content;
            const borderWidth = this.width ? parseFloat(this.width, 10) : content.offsetWidth;
            const borderHeight = this.height ? parseFloat(this.height, 10) : content.offsetHeight;
            this.borderWidth = borderWidth;
            this.borderHeight = borderHeight;
        }
    }
</script>

<style scoped lang="less">
    @import "note";
</style>