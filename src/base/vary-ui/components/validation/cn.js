export default function (rule, value, callback, source, options) {
    const errors = [];
    if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
        errors.push(new Error('必须是中文'));
    }
    callback(errors);
}