class Visit {
    rendeInputFields() {
        const html = `<label for="fullName" class="form-label"
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
       <input required type="datetime-local" name="date-visit"`
        return html
    }

}

export default Visit