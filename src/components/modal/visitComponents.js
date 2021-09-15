import Visit from "./visit";

class VisitDentist extends Visit {
    constructor(title) {
        super(title)
    }
    renderFields() {
        const html = `<form id="visit-form" class="visit-form">
        ${super.rendeInputFields()}
        ${this.renderAdditionalFields()}
        </form>`
        return html
    }

    renderAdditionalFields() {
        const html = `<label for="last-visit" class="form-label"> Date of last visit: </label>
           <input required type="datetime-local" name="last-visit"/>`
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
        const html = `<label for="pressure" class="form-label"
        >Normal pressure:
    </label>
    <input required type="text" name="pressure"/>
        <label for="body-mass-index" class="form-label">Body mass index:</label>
        <input required type="number" name="body-mass-index"/>
        <label for="cardiovascular-diseases" class="form-label"
            >Transferred diseases of the cardiovascular system:</label>
        <input type="text" name="cardiovascular-diseases"/>
        <label for="age" class="form-label"
            >Age:
        </label> 
        <input required type="number" name="age"/>`
        return html
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
        const html = `<label for="age" class="form-label"
        >Age:
    </label> 
    <input required type="number" name="age"/>`
        return html
    }
}

export { VisitDentist, VisitCardiologist, VisitTherapist }