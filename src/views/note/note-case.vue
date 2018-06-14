<template>
    <div class="va-page-box">
        <va-card header="Note">
            <va-note :data="notes"></va-note>
        </va-card>
    </div>
</template>

<script>
    import vaNote from '../../base/components/note';
    const prefixCls = 'va-note-case';

    export default {
        name: 'va-note-case',
        components: {vaNote},
        data() {
            return {
                notes: [
                    {
                        title: 'This is my note #3',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.',
                        x: 10
                    },
                    {
                        title: 'This is my note #3',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.',
                        x: 20
                    },
                    {
                        title: 'This is my note #3',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.',
                        x: 30
                    }
                ]
            }
        }
    }
</script>