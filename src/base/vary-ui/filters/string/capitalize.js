const capitalize = function(value) {
    if (!value) {
        return '';
    }
    const newVal = value.toString();
    return newVal.charAt(0).toUpperCase() + newVal.slice(1);
};

export default capitalize;