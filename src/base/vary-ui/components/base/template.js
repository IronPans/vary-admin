export default {
    name: 'VaTemplate',
    functional: true,
    props: {
        data: {
            type: [String, Object]
        },
        index: {
            type: Number
        },
        render: Function
    },
    render(h, ctx) {
        const params = {
            data: ctx.props.data,
            index: ctx.props.index
        };
        return ctx.props.render(h, params);
    }
};
