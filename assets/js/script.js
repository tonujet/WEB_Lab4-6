//Phone Mask

let pNumberInput = document.getElementById("pNumber");
pNumberInput.addEventListener("focus", setUkraineNumbers)
pNumberInput.addEventListener("input", phoneValidator)

function phoneValidator(e) {
    let x = e.target.value.replace(/\D/g, '')
        .match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    if (!x[1]) {
        e.target.value = '';
        return;
    }

    if (!x[2]) {
        e.target.value = `+${x[1]}`;
        return;
    }
    e.target.value = `+${x[1]} (${x[2]}`
        + (x[3] ? `) ${x[3]}` : '')
        + (x[4] ? `-${x[4]}` : '')
        + (x[5] ? `-${x[5]}` : '')
        + (x[6] ? `-${x[6]}` : '');
}

function setUkraineNumbers(e) {
    let numberValue = e.target.value;
    if (numberValue === "") {
        e.target.value = "+38(0"
    }
}

//inputs validation

document.addEventListener("DOMContentLoaded", setCustomValidation)

let validationTexts = {
    "email": "Email is incorrect",
    "password": "Password does not match to standard",
    "pNumber": "Phone number is incorrect",
    "Sname": "Name is incorrect",
    "name": "Name is incorrect",
    "Mname": "MiddleName is incorrect",
    "Bdate": "Date is incorrect",
    "gender": "",
    "groups": "Please select group"
}
const regForm = document.forms.reg;

function setCustomValidation(e) {
    for (const name in validationTexts) {
        let element = regForm[name];
        element.oninvalid = (e) => {
            if (!e.target.validity.valid) {
                e.target.setCustomValidity(" ");
                showError(validationTexts[name], element)
            }
        }
        element.oninput = (e) => {
            e.target.setCustomValidity("");
            if (e.target.type === "text" && !e.target.value.match(/^[A-Za-z\s]*$/)) {
                e.target.setCustomValidity(" ");
                showError("Clean redundant characters", element)
            } else if (e.target.validity.valid || e.target.value.length === 0) {
                deleteError(element);
            } else {
                e.target.setCustomValidity(" ");
                showError(validationTexts[name], element)
            }
        }

    }
}

function showError(text, element) {
    let nextElement = element.nextElementSibling;
    if (!nextElement) {
        let div = document.createElement("div");
        div.classList.add("form__error")
        div.innerText = text;
        element.after(div);
    }
}

function deleteError(element) {
    let nextElement = element.nextElementSibling;
    nextElement && nextElement.remove();
}


//table filling

let tableHeaders = ["Sname", "name", "Mname", "Bdate", "groups", "email", "pNumber", "password", "gender"]
regForm.addEventListener("submit", createTableRow)

const table = document.getElementById("table")
table.addEventListener("click", setCellClick)

for (let check of document.getElementsByClassName("table__check")) {
    check.addEventListener("click", e => {
        e.stopPropagation();
    })
}

function createTableRow(e) {
    e.preventDefault();
    let row = table.insertRow(table.rows.length);
    let cellCount = 1
    let cell = row.insertCell(0);
    cell.innerHTML = "<input type='checkbox' name='studentCheck' class='table__check'>"
    cell.firstElementChild.addEventListener("click", e=>{
        e.stopPropagation()
    })
    for (const element of tableHeaders) {
        cell = row.insertCell(cellCount);
        cell.innerText = regForm.elements[element].value;
        regForm.elements[element].value = ""
        cellCount++
    }
}

function setCellClick(e) {
    const cell = e.target.closest("td");
    if (cell) {
        const checkBox = cell.firstElementChild
        if (checkBox && checkBox.classList.contains("table__check")) {
            checkBox.checked = !checkBox.checked;
        }
    }
}


//table modifications
tableButtons = document.getElementsByName("tableButton")
tableButtons[0].addEventListener("click", deleteTableRow)
tableButtons[1].addEventListener("click", duplicateTableRow)
const studentChecks = document.getElementsByName("studentCheck");

function deleteTableRow(e) {
    let deletedRows = [];
    for (const [i, elem] of studentChecks.entries()) {
        if (elem.checked) {
            deletedRows.push(i + 1);
        }
    }
    deletedRows.reverse().forEach(i => {
        table.deleteRow(i)
    })
}

function duplicateTableRow(e) {
    for (const elem of studentChecks) {
        if (elem.checked) {
            elem.checked = false;
            const row = elem.parentElement.parentElement;
            const nextRow = row.cloneNode(true)
            row.after(nextRow);
        }
    }
}
