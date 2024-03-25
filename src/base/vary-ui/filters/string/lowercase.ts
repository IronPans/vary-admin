const lowercase = function(value) {
    if (!value) {
        return '';
    }
    let newVal = value.toString();
    return newVal.toLowerCase();
};

export default lowercase;