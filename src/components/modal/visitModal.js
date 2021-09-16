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
        this.card = new Card()
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
        this.btn.removeEventListener("click", this.onCreateBtnClick)
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

    setVisitDoc() {
        this.options = this.visit.getValue()
        this.options["Doctor:"] = this.selector.value
    }

    async onCreateBtnClick(e) {
        e.preventDefault()
        this.setVisitDoc()
        const result = await addVisit(this.options)
        // this.options.id = result.id запрос возвращает все поля вместе с id в renderCard передаю результат
        this.card.renderCard(result)
        this.hide()
    }
}
const modal = new VisitModal("Create visit")
const btn = document.getElementById("test-btn")
btn.addEventListener("click", () => {
    modal.show()
})

export default VisitModal