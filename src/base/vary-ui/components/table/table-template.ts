import { h } from 'vue'

export default {
  name: 'VaTableTemplate',
  // functional: true,
  props: {
    rowData: {
      type: Object
    },
    rowIndex: {
      type: Number
    },
    render: Function
  },
  setup(props) {
    const params = {
      rowData: props.rowData,
      rowIndex: props.rowIndex
    }
    return () => props.render(params)
  }
}

// const VaTableTemplate = (props, context) => {
//   console.log(props, context);
//   const params = {
//     rowData: context.props.rowData,
//     rowIndex: context.props.rowIndex,
//   };
//   return h(props.tag, params, context.slots);
// };

// VaTableTemplate.props = ["tag", "rowData", "rowIndex"];

// export default VaTableTemplate;
