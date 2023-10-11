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
const modalClose = document.querySelector(".close")
let errors = {}

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
function validate(pForm) {
  const emailReg = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")
  const birthdateReg = new RegExp("^(19|20)\\d\\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$")

  if (pForm[0][1].length < 2) {
    errors.name = "Veuillez entrer 2 caractères ou plus pour le champ du Prénom"
  } else {
    errors.name = ''
  }

  if (pForm[1][1].length < 2) {
    errors.lastName = "Veuillez entrer 2 caractères ou plus pour le champ du nom"
  } else {
    errors.lastName = ''
  }

  if (!emailReg.test(pForm[2][1])) {
    errors.email = "Veuillez entrer un email valide"
  } else {
    errors.email = ''
  }

  if (!birthdateReg.test(pForm[3][1])) {
    errors.birthdate = "Veuillez entrer une date de naissance valide"
  } else {
    errors.birthdate = ''
  }

  if (pForm[4][1] > 99) {
    errors.turnamentNumber = ("Veuillez entrer un nombre de tournoi inférieur à 99")
  } else {
    errors.turnamentNumber = ''
  }

  if (pForm[5][1] === null){
    errors.country = "Veuillez sélectionner le lieu du tournoi auquel vous souhaitez participer"
  } else {
    errors.country = ''
  }

  if(!pForm[6][1]) {
    errors.cgu = "Veuillez accepter les conditions d'utilisation"
  } else {
    errors.cgu = ''
  }

  console.log(pForm[0][1])
  console.log(pForm[1][1])
  console.log(pForm[2][1])
  console.log(pForm[3][1])
  console.log(pForm[4][1])
  console.log(pForm[5][1])
  console.log(pForm[6][1])
  console.log(pForm[7][1])

}

//Fonction permettant d'afficher les différentes erreurs rencontrées
function displayError(listError) {

  const errorName = document.getElementById('error-name')
  const errorLastname = document.getElementById('error-lastname')
  const errorEmail = document.getElementById('error-email')
  const errorBirthdate = document.getElementById('error-birthdate')
  const errorLocation = document.getElementById('error-location')
  const errorCgu = document.getElementById('error-cgu')

  errorName.innerHTML = listError[0][1]
  errorLastname.innerHTML = listError[1][1]
  errorEmail.innerHTML = listError[2][1]
  errorBirthdate.innerHTML = listError[3][1]
  errorLocation.innerHTML = listError[5][1]
  errorCgu.innerHTML = listError[6][1]
}

const form = document.querySelector('form')
form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {

    const formData = new FormData(event.target)

    const name = formData.get("name")
    const lastName = formData.get("lastName")
    const email = formData.get("email");
    const birthdate = formData.get("birthdate");
    const turnamentNumber = Number.parseInt(formData.get("turnamentNumber") || 0);
    const country = formData.get("location");
    const cgu = Boolean(formData.get("cgu"))
    const newsletter = Boolean(formData.get("newsletter"))

    const allValues = {
      name,
      lastName,
      email,
      birthdate,
      turnamentNumber,
      country,
      cgu,
      newsletter
    }

    // console.log(allValues)
    validate(Object.entries(allValues))
    arrError = Object.entries(errors)
    displayError(arrError)
    console.log(arrError)

    if (arrError[0][1] === '' && arrError[1][1] === '' && arrError[2][1] === '' && arrError[3][1] === '' && arrError[5][1] === '' && arrError[6][1] === '' ) {
      const div = document.getElementById('modal-body');
      div.innerHTML = "Merci ! Votre réservation a été reçue."
    }

  } catch (e) {
    console.log(e);
  }
})