function getCountries() {
    const url = "https://location.wlfpt.co/api/v1/countries"
    fetch(url)
        .then(response => response.json())
        .then(data => showItems(data, "country-select"))
}

function showItems(items, parentId) {
    const parentElement = document.getElementById(parentId)
    parentElement.innerHTML = "";
    Array.from(items).forEach(item => {
        const option = document.createElement("option");
        const valueField = "sortname" in item ? "sortname" : "name"
        option.value = item[valueField];
        option.innerText = item.name;
        parentElement.appendChild(option);
    })
}

function getStates(country) {
    const url = `https://location.wlfpt.co/api/v1/states?filter=${country}&type=code`
    fetch(url)
        .then(response => response.json())
        .then(data => showItems(data, "region-select"))
}

function getCities(state) {
    const url = `https://location.wlfpt.co/api/v1/cities?filter=${state}&type=name`
    fetch(url)
        .then(response => response.json())
        .then(data => showItems(data, "town-select"))
}

function initializeForm() {
    getCountries()
    const countrySelect = document.getElementById("country-select")
    countrySelect.addEventListener("change", () => getStates(countrySelect.value))
    const stateSelect = document.getElementById("region-select")
    stateSelect.addEventListener("change", () => getCities(stateSelect.value))
}

function processFormData() {
    const validationPassed = this.validateForm()
}

function validateTaxId() {
    const taxIdInput = document.getElementById("tax-id-input").value;
    const birthDateInput = document.getElementById("birth-date-input").value;
    const passed = checkTaxId(taxIdInput, birthDateInput);
    return passed;
}

function validateTaj() {
    const tajInput = document.getElementById("taj-szam-input").value;
    const passed = checkTaj(tajInput);
    return passed;
}

function fieldsFilled() {
    const fields = document.querySelectorAll(".not-empty");
    let result = true;
    fields.forEach(field => {
        result = result && field.value != "";
    });
    return result
}

function validateForm() {
    const tajInputField = document.getElementById("taj-szam-input");
    const tajValid = this.validateTaj();
    if (tajValid) {
        tajInputField.setCustomValidity("");
    } else {
        tajInputField.setCustomValidity("Érvénytelen TAJ szám");
    }

    const taxIdField = document.getElementById("tax-id-input");
    const taxIdValid = this.validateTaxId();
    if (taxIdValid) {
        taxIdField.setCustomValidity("");
    } else {
        taxIdField.setCustomValidity("Érvénytelen adószám");
    }
    const form = document.getElementById("urlap");
    form.classList.remove("needs-validation");
    form.classList.add("was-validated");
    const allFieldsFilled = this.fieldsFilled();
    const radioSelected = document.querySelector("input[name='radio-gender']:checked").value != "";
    const ready = tajValid && taxIdValid && allFieldsFilled && radioSelected;
    return ready;
}
