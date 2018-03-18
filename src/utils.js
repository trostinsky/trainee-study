export const notEmpty = (value) => {
    return typeof value !== 'undefined' &&
        value !== null &&
            value !== '' ?
        value : '';
}