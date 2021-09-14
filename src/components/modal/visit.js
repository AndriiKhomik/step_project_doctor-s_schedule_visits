import Modal from "./modal";

class Visit extends Modal {
    constructor(title) {
        super(title)
    }
    renderBody() {
        const html = `<select required class="form-select visit-select">
            <option disabled selected>Choose doctor</option>
            <option value="therapist">Therapist</option>
            <option value="cardiologist">Cardiologist</option>
            <option value="dentist">Dentist</option>
        </select>`
        this.modalContainer.classList.add("visit-modal")
        this.addSelectListener()
        return html
    }

    rendeInputFields() {
        const html = `<form id="visit-form" class="visit-form">
        <label for="fullName" class="form-label"
        >Enter your name:
    </label>
    <input required type="text" name="fullName"/>
        <label for="target" class="form-label">Target of visit:</label>
        <input required type="text" name="target"/>
        <label for="description" class="form-label"
            >Brief description of the visit:</label>
        <input type="text" name="description"/>
        <label for="urgency" class="form-label"
            >Choose urgency of the visit:
        </label>
        <select required name="urgency" class="visit-form-select form-select">
            <option value="ordinary">Ordinary</option>
            <option value="priority">Priority</option>
            <option value="urgent">Urgent</option>
        </select>
        <label for="date-visit" class="form-label"> Date of visit: </label>
       <input required type="datetime-local" name="date-visit"
        ${this.renderAdditionalFields()}
    </form>`
        return html
    }
    renderAdditionalFields() {
        return ""
    }
    renderBtn() {
        const html = `<button type="submit" class="btn btn-primary mx-auto">Create card</button>`
        return html
    }
    addSelectListener() {
        this.modalContainer.addEventListener("change", (e) => {
            if (e.target === this.modalContainer.querySelector(".visit-select")) {
                switch (e.target.value) {
                    case "therapist":
                        console.log("therapist");
                        break;
                    case "cardiologist":
                        console.log("cardiologist");
                        break;
                    case "dentist":
                        console.log("dentist");
                        break;
                    default:
                        break;
                }
            }
        })
    }
}


export default Visit