export const getDateTimeString = () => {
    const now = new Date()
    const yearNow = now.getFullYear();
    const monthNow = now.getMonth().toString().length > 1 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
    const dayNow = now.getDate().toString().length > 1 ? now.getDate() : `0${now.getDate()}`;
    const nowDateTimeString = `${yearNow}-${monthNow}-${dayNow}`;
    return nowDateTimeString;
}

export const isValidNumber = (obj, key, minValue, maxValue) => {
    if (+obj[key] < minValue || +obj[key] > maxValue || obj[key] === '') {
        alert(`${key.substring(0, key.length - 1)} must be in field from ${minValue} to ${maxValue}`)
        obj[key] = ''
        return obj[key]
    }
}
