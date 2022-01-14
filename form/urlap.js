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
    if (validationPassed) {
        const fieldset = document.getElementById("urlap-fieldset")
        fieldset.setAttribute("disabled", "")
        const tableDiv = document.getElementById("results-table")
        tableDiv.innerHTML = ""
        extractData()
    }
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

function extractData() {
    const form_data = {
        "name-input": "Név",
        "birth-date-input": "Születési dátum",
        "taj-szam-input": "TAJ szám",
        "tax-id-input": "Adóazonosító jel",
        "education-select": "Legmagasabb iskolai végzettség",
        "country-select": "Ország",
        "region-select": "Megye",
        "town-select": "Település",
        "address-input": "Cím",
        "email-input": "E-mail",
        "phone-number-input": "Telefonszám"
    };  // TODO: a nem nincs benne
    const table = document.createElement("table");
    table.classList.add("table", "result-table");
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for (const key in form_data) {
        const row = document.createElement("tr");
        const cell1 = document.createElement("th")
        cell1.innerText = form_data[key]
        cell1.setAttribute("scope", "row")
        const cell2 = document.createElement("td")
        cell2.innerText = document.getElementById(key).value
        row.appendChild(cell1)
        row.appendChild(cell2)
        tbody.appendChild(row)
    }
    const tableDiv = document.getElementById("results-table")
    tableDiv.appendChild(table)
}
