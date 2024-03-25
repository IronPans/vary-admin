const slice = function(value, start = 0, end) {
    if (!value) {
        return value;
    }
    end = end || value.length;
    return value.slice(start, end);
};

export default slice;