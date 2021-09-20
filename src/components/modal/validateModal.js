export const getDateTimeString = () => {
    const now = new Date()
    const yearNow = now.getFullYear();
    const monthNow = now.getMonth().toString().length > 1 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
    const dayNow = now.getDate().toString().length > 1 ? now.getDate() : `0${now.getDate()}`;
    const nowDateTimeString = `${yearNow}-${monthNow}-${dayNow}`;
    return nowDateTimeString;
}

export const checkLoginValue = (el, data) => {
    if (el.value === data) {
        el.style.borderColor = "#006196"
        return el.value
    }
    else {
        el.style.borderColor = "red"
        return ''
    }
}