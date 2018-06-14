<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    import {oneOf} from '../base/utils';
    const prefixCls = 'va-button-group';

    export default {
        name: 'VaButtonGroup',
        props: {
            dir: {
                validator(value) {
                    return oneOf(value, ['horizontal', 'vertical']);
                },
                default: 'horizontal'
            }
        },
        computed: {
            classes() {
                return [
                    prefixCls,
                    `${prefixCls}-${this.dir}`
                ]
            }
        }
    }
</script>