<template>
    <div :class="prefixCls" :style="styles">
        <div :class="loaderClasses" :style="">
            <span v-for="(item, index) in getSpinElement()"
                  :style="fetchSpinStyles(item)" :key="index.toString()"></span>
        </div>
    </div>
</template>

<script>
    import {oneOf} from '../base/utils';

    const prefixCls = 'va-spin';

    export default {
        name: 'VaSpin',
        props: {
            width: {
                type: [String, Number],
                default: 100
            },
            height: {
                type: [String, Number],
                default: 100
            },
            type: {
                validator(value) {
                    return oneOf(value, ['circleRound', 'circleLine', 'circleRoundFade', 'lineSquare', 'lineRound', 'lineBounce']);
                },
                default: 'circleRound'
            },
            size: {
                validator(value) {
                    return oneOf(value, ['lg', 'sm', 'xs'])
                },
                default: 'xs'
            },
            color: {
                type: String,
                default: '#303548'
            }
        },
        data() {
            return {
                prefixCls
            }
        },
        computed: {
            loaderClasses() {
                return [
                    `${prefixCls}-loader`,
                    `${prefixCls}-${this.type}`
                ]
            },
            styles() {
                const rect = this.getSize();
                return {
                    width: rect.width + 'px',
                    height: rect.height + 'px'
                };
            }
        },
        methods: {
            getSize() {
                let {height, width, size, type} = this;
                switch (size) {
                    case 'xs':
                        width *= 0.25;
                        height *= 0.25;
                        break;
                    case 'sm':
                        width *= 0.5;
                        height *= 0.5;
                        break;
                }
                switch (type) {
                    case 'lineSquare':
                    case 'lineRound':
                    case 'lineBounce':
                        height = width * 0.5;
                        break;
                }
                return {width, height};
            },
            getSpinElement() {
                const type = this.type;
                const spanSize = this.getSize().width;
                const spans = [];
                let num = 8;
                let height;
                switch (type) {
                    case 'lineSquare':
                    case 'lineRound':
                    case 'lineBounce':
                        num = 5;
                        break;
                }
                if (type === 'lineSquare' || type === 'lineRound') {
                    height = spanSize * 0.1;
                }
                for (let i = 0; i < num; i++) {
                    spans.push({
                        height: height + 'px',
                        background: this.color
                    });
                }
                return spans;
            },
            fetchSpinStyles(item) {
                return {...item};
            }
        }
    }
</script>