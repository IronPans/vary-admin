export default {
    name: 'VaTableTemplate',
    functional: true,
    props: {
        rowData: {
            type: Object
        },
        rowIndex: {
            type: Number
        },
        render: Function
    },
    render(h, ctx) {
        const params = {
            rowData: ctx.props.rowData,
            rowIndex: ctx.props.rowIndex
        };
        return ctx.props.render(h, params);
    }
}