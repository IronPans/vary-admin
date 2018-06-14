<template>
    <div :class="classes">
        <va-chip v-for="(node, index) in chipData" :data="node" :key="index.toString()"
                 @on-delete="handleDelete(node)" @click="handleClick(node)"></va-chip>
        <input v-if="placeholder" v-model="value" :spellCheck="false" type="text"
        placeholder="placeholder" @keyup.enter="handleKeyUp"
        @change="handleChange" @focus="handleFocus"/>
    </div>
</template>

<script>
    import vaChip from './chip';

    const prefixCls = 'va-chip';

    export default {
        name: "va-chip-group",
        components: {
            vaChip
        },
        props: {
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            placeholder: {
                type: String
            }
        },
        data() {
            return {
                focus: false,
                chipData: [...this.data],
                value: ''
            }
        },
        computed: {
            classes() {
                return [
                    `${prefixCls}-group`,
                    {
                        [`${prefixCls}-input`]: this.placeholder,
                        [`${prefixCls}-focus`]: this.focus
                    }
                ]
            }
        },
        methods: {
            handleDelete(data) {
                const chipData = [...this.chipData];
                const chipToDelete = chipData.indexOf(data);
                chipData.splice(chipToDelete, 1);
                this.chipData = chipData;
                this.$emit('on-delete', {
                    label: data.label,
                    value: data.value
                });
            },

            handleClick(data) {
                this.$emit('click', {
                    label: data.label,
                    value: data.value
                });
            },

            handleFocus() {
                this.focus = true;
            },

            handleChange(event) {
                this.value = event.target.value;
            },

            handleKeyUp(event) {
                let value = event.target.value;
                const data = [...this.chipData];
                let isExited = false;
                for (const d of data) {
                    if (d.label === value) {
                        isExited = true;
                        break;
                    }
                }
                if (!isExited) {
                    data.push({
                        label: value,
                        value: value
                    });
                    value = '';
                    this.chipData = data;
                    this.value = '';
                }
            }
        }
    }
</script>

<style scoped>

</style>