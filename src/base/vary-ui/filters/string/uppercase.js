const uppercase = function(value) {
    if (!value) {
        return '';
    }
    const newVal = value.toString();
    return newVal.toUpperCase();
};

export default uppercase;