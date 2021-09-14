import Visit from "./visit";

class VisitDentist extends Visit {
    constructor(title) {
        super(title)
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
    renderAdditionalFields() {
        const html = `<label for="age" class="form-label"
        >Age:
    </label> 
    <input required type="number" name="age"/>`
        return html
    }
}


const modal = new VisitDentist("Create visit")
const btn = document.getElementById("test-btn")
btn.addEventListener("click", () => {
    modal.show()
})

export default {
    VisitDentist, VisitCardiologist, VisitTherapist
}