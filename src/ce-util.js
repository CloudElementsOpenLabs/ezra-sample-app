import * as R from 'ramda';

const createTitleText = (txt) => {
    return txt
        ? txt[0].toUpperCase() + txt.slice(1)
        : null;
}

const isObject = obj => {
    return R.is(Object, obj);
}

const isNilOrEmpty = obj => {
    return R.isNil(obj) || R.isEmpty(obj);
}

const handleResponse = response => {
    return response.ok
        ? Promise.resolve(response)
        : Promise.reject(response.statusText);
}


export {
    createTitleText,
    isObject,
    isNilOrEmpty,
    handleResponse
}