import * as PNotify from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css"
import "@pnotify/core/dist/BrightTheme.css"

function showStackBottomLeft(textValue) {
    if (typeof window.stackBottomLeft === 'undefined') {
        window.stackBottomLeft = new PNotify.Stack({
            dir1: 'right',
            dir2: 'up',
            firstpos1: 25,
            firstpos2: 25,
            push: 'top',
            maxStrategy: 'close'
        });
    }

    PNotify.info({
        text: textValue,
        stack: window.stackBottomLeft
    });
}

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

export const checkVisitValue = (el, minValue, maxValue) => {
    if (+el.value < minValue || +el.value > maxValue || el.value === "") {
        el.style.borderColor = "red"
        let field = null
        switch (el.name) {
            case "age":
                field = "Age"
                break;
            case "body-mass-index":
                field = "Body mass index"
                break;
            case "pressure":
                field = "Normal pressure"
                break;
            default:
                break;
        }
        showStackBottomLeft(`Check field "${field}"  (should be number from ${minValue} to ${maxValue})`)
        return ''
    }
    else {
        el.style.borderColor = "#006196"
        return el.value
    }

}


