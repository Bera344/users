const users = require("../../data/import-dev-data.js")

var fetchForm = "/form"

const form = document.querySelector("form")
const divForms = document.querySelector("div")
const labels = document.querySelector("label")
const inputs = document.querySelector("input")

const names = document.getElementById("name").value
const surname = document.getElementById("surname").value
const age = document.getElementById("age").value
const description = document.getElementById("description").value


form.addEventListener("submit", (event) => {
    event.preventDefault()
    
    inputs.textContent = ""
    names.textContent = ""
    surname.textContent = ""
    age.textContent = ""
    description.textContent = ""

    //form?address=
    users = fetchForm + "?address=" + inputs.value


    //NEW FUNCTION "FETCH().THEN()"
    fetch(users).then(response => {
        response.json().then(data => {
            if (data.error) {
                inputs.textContent = data.error
                names.textContent = ""
                surname.textContent = ""
                age.textContent = ""
                description.textContent = ""
            }
            else {
                names.textContent = data.name
                surname.textContent = data.surname
                age.textContent = data.age
                description.textContent = data.description
            }
        })
    })
})