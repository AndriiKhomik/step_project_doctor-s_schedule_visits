import Modal from "./modal";
import { VisitDentist, VisitCardiologist, VisitTherapist } from './visitComponents.js';
import Card from '../card/card.js';
import { addVisit, updateVisit } from '../api/api.js'
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
        </button>`
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

  addVisitForm(value = "Create card") {
    this.selector.insertAdjacentHTML('afterend', this.visit.renderFields())
    this.form = this.modalContainer.querySelector("#visit-form")
    this.btn.classList.remove("visit-btn--hidden")
    this.btn.textContent = value
  }

  removeVisitForm() {
    if (this.form) {
      this.form.remove()
    }
  }

  selectVisitForm(value) {
    switch (value.toLowerCase()) {
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

  onSelectChange() {
    this.removeVisitForm()
    this.selectVisitForm(this.selector.value)
    this.addVisitForm()
    this.modalContainer.classList.add("visit-modal--selected")
  }

  async onCreateBtnClick(e) {
    e.preventDefault()
    this.options = this.visit.getValue()
    if (Object.values(this.options).some(v => v === '')) return
    console.log(this.options);
    // Create card
    if (this.btn.textContent === 'Create card') {
      this.options["Doctor:"] = this.selector.value
      const result = await addVisit(this.options)
      this.card = new Card()
      this.card.renderCard(result)
    }
    // Edit card
    if (this.btn.textContent === 'Save' && e.target === this.btn) {
      const card = new Card();
      await card.removeCardInfo(this.currentCard);
      this.options["Doctor:"] = this.doctor;
      const result = await updateVisit(this.options, this.id);
      card.renderCardInfo(result, this.currentCard, true);
    }
    this.btn.removeEventListener("click", this.onCreateBtnClick);
    this.hide();
  }


  editCard(obj, currentCardInfo) {
    this.currentCard = currentCardInfo;
    this.selectVisitForm(obj['Doctor:'])
    this.show()
    this.addVisitForm('Save')
    this.modalContainer.classList.add("visit-modal--selected")
    this.selector.remove()
    this.visit.setValue(obj)
    this.id = obj.id
    this.doctor = obj['Doctor:']
  }
}

export default VisitModal