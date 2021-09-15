import Modal from "./modal";
import { VisitDentist, VisitCardiologist, VisitTherapist } from './visitComponents.js'

class VisitModal extends Modal {
    constructor(title) {
        super(title)
        this.visit = null
        this.onSelectChange = this.onSelectChange.bind(this)
    }
    renderBody() {
        this.modalContainer.classList.add("visit-modal")
        const html = `<select required class="form-select visit-select">
            <option disabled selected>Choose doctor</option>
            <option value="therapist">Therapist</option>
            <option value="cardiologist">Cardiologist</option>
            <option value="dentist">Dentist</option>
        </select>`
        return html
    }

    renderBtn() {
        const html = `<button type="submit" class="btn btn-primary mx-auto">Create card</button>`
        return html
    }

    show() {
        super.show()
        this.addSelectListener()
    }

    hide() {
        super.hide()
        this.removeSelectListener()
    }

    addSelectListener() {
        this.modalContainer.addEventListener("change", this.onSelectChange)
    }

    removeSelectListener() {
        this.modalContainer.removeEventListener("change", this.onSelectChange)
    }

    addVisitForm(targetEl) {
        targetEl.insertAdjacentHTML('afterend', this.visit.renderFields())
    }

    removeVisitForm() {
        this.form = this.modalContainer.querySelector("#visit-form")
        if (this.form) {
            this.form.remove()
        }
    }

    selectVisitForm(targetEl) {
        if (targetEl === this.modalContainer.querySelector(".visit-select")) {
            switch (targetEl.value) {
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
    }

    onSelectChange(e) {
        this.removeVisitForm()
        this.selectVisitForm(e.target)
        this.addVisitForm(e.target)
    }
}
const modal = new VisitModal("Create visit")
const btn = document.getElementById("test-btn")
btn.addEventListener("click", () => {
    modal.show()
})

export default VisitModal