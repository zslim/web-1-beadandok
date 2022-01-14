function getCountries() {
    let response = new x
}

function processFormData() {
    const validationPassed = this.validateForm()
}

function validateTaxId() {
    const taxIdInput = document.getElementById("tax-id-input").value
    const birthDateInput = document.getElementById("birth-date-input").value
    const passed = checkTaxId(taxIdInput, birthDateInput)
    return passed
}

function validateTaj() {
    const tajInput = document.getElementById("taj-szam-input").value
    const passed = checkTaj(tajInput)
    return passed
}

function fieldsFilled() {
    const fields = document.querySelectorAll(".not-empty")
    const result = true
    fields.forEach(field => {
        result = result && field.value != ""
    })
    return result
}

function validateForm() {
    const tajInputField = document.getElementById("taj-szam-input")
    const tajValid = this.validateTaj()
    if (tajValid) {
        tajInputField.setCustomValidity("")
    } else {
        tajInputField.setCustomValidity("Érvénytelen TAJ szám")
    }

    const taxIdField = document.getElementById("tax-id-input")
    const taxIdValid = this.validateTaxId()
    if (taxIdValid) {
        taxIdField.setCustomValidity("")
    } else {
        taxIdField.setCustomValidity("Érvénytelen adószám")
    }
    const form = document.getElementById("urlap")
    form.classList.remove("needs-validation")
    form.classList.add("was-validated")
    const allFieldsFilled = this.fieldsFilled()
    const radioSelected = document.querySelector("input[name='radio-gender']:checked").value != ""
    const ready = tajValid && taxIdValid && allFieldsFilled && radioSelected
    return ready
}
