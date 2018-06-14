<template>
    <div :class="classes" :style="rowStyle">
        <slot/>
    </div>
</template>

<script>
    import {oneOf} from "../base/utils";
    import enquire from 'enquire.js';

    if (typeof window !== 'undefined') {
        const matchMediaPolyfill = (mediaQuery) => {
            return {
                media: mediaQuery,
                matches: false,
                addListener() {
                },
                removeListener() {
                },
            };
        };
        window.matchMedia = window.matchMedia || matchMediaPolyfill;
    }

    const responsiveArray = ['lg', 'md', 'sm', 'xs'];

    const responsiveMap = {
        xs: '(max-width: 767px)',
        sm: '(min-width: 768px)',
        md: '(min-width: 992px)',
        lg: '(min-width: 1200px)'
    };

    const prefixCls = 'row';

    export default {
        name: "va-row",
        props: {
            gutter: {
                type: Number | String,
                default: 0
            },
            align: {
                validator(value) {
                    return oneOf(value, ['top', 'middle', 'bottom'])
                }
            },
            justify: {
                validator(value) {
                    return oneOf(value, ['start', 'center', 'end', 'space-between', 'space-around'])
                }
            }
        },
        data() {
            return {
                screens: {},
                rowStyle: ''
            }
        },
        methods: {
            getMediaScreen() {
                const {gutter} = this;
                if (typeof gutter === 'object') {
                    Object.keys(responsiveMap)
                        .map((screen) => enquire.register(responsiveMap[screen], {
                                match: () => {
                                    if (typeof gutter !== 'object') {
                                        return;
                                    }
                                    this.screens = {
                                        ...this.screens,
                                        [screen]: true,
                                    }
                                },
                                unmatch: () => {
                                    if (typeof gutter !== 'object') {
                                        return;
                                    }
                                    this.screens = {
                                        ...this.screens,
                                        [screen]: false,
                                    }
                                },
                                destroy() {
                                },
                            },
                        ));
                }
            },
            getSpacing() {
                const {gutter, screens} = this;
                if (typeof gutter === 'object') {
                    for (let i = 0; i <= responsiveArray.length; i++) {
                        const breakpoint = responsiveArray[i];
                        if (screens[breakpoint] && gutter[breakpoint] !== undefined) {
                            return gutter[breakpoint];
                        }
                    }
                }
                return gutter;
            }
        },
        computed: {
            classes() {
                let align = '', justify = this.justify && 'align-' + this.justify;
                switch (this.align) {
                    case 'top':
                        align = 'justify-start';
                        break;
                    case 'middle':
                        align = 'justify-center';
                        break;
                    case 'bottom':
                        align = 'justify-end';
                        break;
                }
                switch (this.align) {
                    case 'start':
                        align = 'align-left';
                        break;
                    case 'end':
                        align = 'align-right';
                        break;
                }
                return [
                    `${prefixCls}`,
                    align,
                    justify
                ]
            }
        },
        mounted() {
            this.getMediaScreen();
            const gutter = this.getSpacing();
            const halfSpacing = gutter / 2;
            this.rowStyle = gutter > 0 ? {
                marginLeft: -halfSpacing + 'px',
                marginRight: -halfSpacing + 'px',
            } : {};
            this.$children.map((child) => {
                if (gutter > 0) {
                    child.style = {
                        paddingLeft: halfSpacing + 'px',
                        paddingRight: halfSpacing + 'px'
                    }
                }
            });
        },
        destroyed() {
            Object.keys(responsiveMap)
                .map((screen) => enquire.unregister(responsiveMap[screen]));
        }
    }
</script>