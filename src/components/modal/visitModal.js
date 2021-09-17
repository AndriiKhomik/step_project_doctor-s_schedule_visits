import Modal from "./modal";
import { VisitDentist, VisitCardiologist, VisitTherapist } from './visitComponents.js';
import Card from '../card/card.js';
import { addVisit } from '../api/api.js'
class VisitModal extends Modal {
    constructor(title) {
        super(title)
        this.visit = null
        this.onSelectChange = this.onSelectChange.bind(this)
        this.onCreateBtnClick = this.onCreateBtnClick.bind(this)
    }
    renderBody() {
        this.modalContainer.classList.add("visit-modal")
        const html = `<select required class="form-select visit-select">
            <option disabled selected>Choose doctor</option>
            <option value="Therapist">Therapist</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dentist">Dentist</option>
        </select>`
        return html
    }

    renderBtn() {
        const html = `<button type="submit" 
        id="card-create-btn" class="btn btn-primary mx-auto visit-btn--hidden">
        Create card</button>`
        return html
    }

    show() {
        super.show()
        this.addListeners()
    }

    hide() {
        super.hide()
        this.removeListeners()
    }

    addListeners() {
        this.selector = this.modalContainer.querySelector(".visit-select")
        this.btn = this.modalContainer.querySelector("#card-create-btn")
        this.selector.addEventListener("change", this.onSelectChange)
        this.btn.addEventListener("click", this.onCreateBtnClick)
    }

    removeListeners() {
        this.selector.removeEventListener("change", this.onSelectChange)
    }

    addVisitForm() {
        this.selector.insertAdjacentHTML('afterend', this.visit.renderFields())
        this.btn.classList.remove("visit-btn--hidden")
    }

    removeVisitForm() {
        this.form = this.modalContainer.querySelector("#visit-form")
        if (this.form) {
            this.form.remove()
        }
    }

    selectVisitForm() {
        switch (this.selector.value.toLowerCase()) {
            case "therapist":
                this.visit = new VisitTherapist()
                break;
            case "cardiologist":
                this.visit = new VisitCardiologist()
                break;
            case "dentist":
                this.visit = new VisitDentist()
                break;
            default:
                break;
        }
    }

    onSelectChange(e) {
        this.removeVisitForm()
        this.selectVisitForm()
        this.addVisitForm()
    }

    async onCreateBtnClick(e) {
        e.preventDefault()
        this.options = this.visit.getValue()
        // to check empty required input fields
        if (Object.values(this.options).some(v => v === '')) return
        //to create card value 'doctor'
        this.options["Doctor:"] = this.selector.value
        //to prevent creating additional same card on double click
        this.btn.removeEventListener("click", this.onCreateBtnClick)
        //to post fetch
        const result = await addVisit(this.options)
        //to create card
        this.card = new Card()
        this.card.renderCard(result)
        console.log(result);
        //to remove modal
        this.hide()
    }
}

export default VisitModal