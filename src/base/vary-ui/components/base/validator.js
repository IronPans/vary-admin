import Schema from 'async-validator';

export function validate(value, rules) {
    if (!rules) {
        return true;
    }

    return new Promise((resolve, reject) => {
        const validator = new Schema(rules);

        validator.validate(value, errors => {
            const state = !errors ? 'success' : 'error';
            const message = errors ? errors[0].message : '';
            resolve(message);
        });
    })
}

export function validateAll(value, callback) {
    if (!value || value.length === 0) {
        callback();
        return true;
    }

    return new Promise((resolve, reject) => {
        let count = 0, valid = true;
        for (const v of value) {
            validate({[v.name]: v.value}, {[v.name]: v.rules}).then((errors) => {
                if (errors) {
                    valid = false;
                    if (typeof callback === 'function') {
                        callback(valid);
                    }
                    // reject(valid);
                    resolve(valid);
                }
                if (count === value.length - 1) {
                    resolve(valid);
                    if (typeof callback === 'function') {
                        callback(valid);
                    }
                }
                count++;
            });
            if (!valid) {
                break;
            }
        }
    })
}

export default {validate, validateAll}