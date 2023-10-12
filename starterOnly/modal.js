function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

/*------------------------------------------------------------*/ 

// Fonction permettant de "fermer" la pop up d'inscription
function closeModal() {
  modalbg.style.display = "none";
}

//Fonction pour tester chaque champs du formulaire
function validate(values) {
  const errors = {}

  const emailReg = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")
  const birthdateReg = new RegExp("^(19|20)\\d\\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$")

  if (!values.name || values.name.length < 2) {
    errors.name = "Veuillez entrer 2 caractères ou plus pour le champ du Prénom"
  } else {
    errors.name = ''
  }

  if (!values.lastName || values.lastName.length < 2) {
    errors.lastName = "Veuillez entrer 2 caractères ou plus pour le champ du nom"
  } else {
    errors.lastName = ''
  }

  if (!values.email || !emailReg.test(values.email)) {
    errors.email = "Veuillez entrer un email valide"
  } else {
    errors.email = ''
  }

  if (!values.birthdate || !birthdateReg.test(values.birthdate)) {
    errors.birthdate = "Veuillez entrer une date de naissance valide"
  } else {
    errors.birthdate = ''
  }

  if (values.turnamentNumber > 99) {
    errors.turnamentNumber = "Veuillez entrer un nombre de tournoi inférieur à 99"
  } else {
    errors.turnamentNumber = ''
  }

  if (values.location === null) {
    errors.location = "Veuillez sélectionner le lieu du tournoi auquel vous souhaitez participer"
  } else {
    errors.location = ''
  }

  if (!values.cgu) {
    errors.cgu = "Veuillez accepter les conditions d'utilisation"
  } else {
    errors.cgu = ''
  }

  return errors
}

//Fonction permettant d"afficher les différentes erreurs rencontrées
function displayError(errors) {
  Object.entries(errors).forEach(([errorName, errorValue]) => {
    const element = document.getElementById(`error-${errorName.toLowerCase()}`)
    console.log(element)
    element.innerHTML = errorValue
  })
}

const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
  event.preventDefault()

  try {
    const formData = new FormData(event.target)

    const name = formData.get("name")
    const lastName = formData.get("lastName")
    const email = formData.get("email")
    const birthdate = formData.get("birthdate")
    const turnamentNumber = Number.parseInt(formData.get("turnamentNumber") || 0)
    const location = formData.get("location")
    const cgu = Boolean(formData.get("cgu"))
    const newsletter = Boolean(formData.get("newsletter"))

    const allValues = {
      name,
      lastName,
      email,
      birthdate,
      turnamentNumber,
      location,
      cgu,
      newsletter,
    }

    console.log(allValues)
    const errors = validate(allValues)
    displayError(errors)

    const isValid = Object.values(errors).every(error => error.length === 0)

    if (!isValid) {
      return
    }

    const div = document.getElementById("modal-body")
    div.innerHTML = "Merci ! Votre réservation a été reçue."
  } catch (e) {
    console.log(e);
  }
})
