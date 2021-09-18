import Visit from "./visit";

class VisitDentist extends Visit {
    constructor() {
        super()
    }
    renderFields() {
        const html = `<form id="visit-form" class="visit-form">
        ${super.rendeInputFields()}
        ${this.renderAdditionalFields()}
        </form>`
        return html
    }
    renderAdditionalFields() {
        const html = `<label for="last-visit" class="form-label">Date of last visit:</label>
           <input required type="date" name="last-visit" id="last-visit"/>`
        return html
    }
}
class VisitCardiologist extends Visit {
    constructor() {
        super()
    }
    renderFields() {
        const html = `<form id="visit-form" class="visit-form">
        ${super.rendeInputFields()}
        ${this.renderAdditionalFields()}
        </form>`
        return html
    }
    renderAdditionalFields() {
        const html = `<label for="pressure" class="form-label">Normal pressure:</label>
        <input required type="text" name="pressure" id="pressure"/>
        <label for="body-mass-index" class="form-label">Body mass index:</label>
        <input required type="number" name="body-mass-index" id="body-mass-index"/>
        <label for="cardiovascular-diseases" class="form-label"
            >Transferred diseases of the cardiovascular system:</label>
        <input type="text" name="cardiovascular-diseases" id="cardiovascular-diseases"/>
        <label for="age" class="form-label">Age:</label> 
        <input required type="number" name="age" id="age"/>`
        return html
    }

    isValidAge(value) {
        if (value >= 0 && age <= 200) return true
        return false
    }

    invalidData(el) {
        el.classList.add("visit-input--invalid")
        this.options["Age:"] = ''
    }
    validData(el) {
        if (el.classList.contains("visit-input--invalid")) {
            el.classList.remove("visit-input--invalid")
        }
        this.options["Age:"] = el.value
        return
    }
    getValue() {
        super.getValue()
        const ageInputEl = this.form.elements.age
        const validAge = this.isValidAge(ageInputEl.value);
        validAge ? this.validData(ageInputEl) : this.invalidData(ageInputEl)
        return this.options
    }
}
class VisitTherapist extends Visit {
    constructor() {
        super()
    }
    renderFields() {
        const html = `<form id="visit-form" class="visit-form">
        ${super.rendeInputFields()}
        ${this.renderAdditionalFields()}
        </form>`
        return html
    }
    renderAdditionalFields() {
        const html = `<label for="age" class="form-label">Age:</label> 
       <input required type="number" name="age" id="age"/>`
        return html
    }
}

export { VisitDentist, VisitCardiologist, VisitTherapist }