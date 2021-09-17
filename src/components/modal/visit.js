import LoginForm from "./loginForm";

class Visit {
    rendeInputFields() {
        const html = `<label for="fullName" class="form-label">Enter your name:</label>
        <input required type="text" name="fullName" id="fullName"/>
        <label for="target" class="form-label">Target of visit:</label>
        <input required type="text" name="target" id="target"/>
        <label for="description" class="form-label">Brief description of the visit:</label>
        <input type="text" name="description" id="description"/>
        <label for="urgency" class="form-label">Choose urgency of the visit:</label>
        <select required name="urgency" class="visit-form-select form-select">
            <option value="Ordinary">Ordinary</option>
            <option value="Priority">Priority</option>
            <option value="Urgent">Urgent</option>
        </select>
        <label for="date-visit" class="form-label">Date of visit:</label>
       <input required type="datetime-local" name="date-visit" id="date-visit"/>`
        return html
    }

    renderFields() {
        const html = `<form id="visit-form" class="visit-form">
        ${this.rendeInputFields()}
        </form>`
        return html
    }

    getValue() {
        this.form = document.getElementById("visit-form");
        const options = {}
        const pressureValue = this.form.querySelector(".visit-form-select").value
        const inputs = this.form.querySelectorAll('input')
        inputs.forEach(input => {
            //to remove empty not required input fields from obj
            if (!input.hasAttribute("required")) {
                if (input.value === "") return
            }
            const key = this.form.querySelector(`label[for= "${input.name}"]`)
            options[key.textContent] = input.value
        });

        this.changeOptionsKey(options, 'Enter your name:', 'full name:')
        options["Pressure:"] = pressureValue
        return options
    }

    changeOptionsKey(obj, oldKey, newKey) {
        if (obj[oldKey]) {
            Object.defineProperty(obj, newKey,
                Object.getOwnPropertyDescriptor(obj, oldKey));
            delete obj[oldKey];
        }
    }
}

export default Visit