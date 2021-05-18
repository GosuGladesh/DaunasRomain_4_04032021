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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
//---------------------------------------------------------------------------------------

//selecting close btn
const modalCloseBtn = document.querySelector(".close");
//binding event listener
modalCloseBtn.addEventListener("click",closeModal);
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//Element selection
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const cgu = document.getElementById("checkbox1");
const form = document.querySelector("[name=reserve]");


// Validation functions 
function firstNameValidation() {
  //Validation condition: Name longer than 2 characters
  if(firstName.value.length <= 2){
      //if invalide, insert html <p> with error message
      firstName.insertAdjacentHTML('afterend','<p class="error-message">Veuillez entrer 2 caractères ou plus pour le champ du prénom.</p>');
      return false;
  }
  return true;
}
function lastNameValidation() {
  if(lastName.value.length <= 2){
      lastName.insertAdjacentHTML('afterend','<p class="error-message">Veuillez entrer 2 caractères ou plus pour le champ du nom.</p>');
      return false;
  }
  return true;
}
function birthdateValidation() {
  if(birthdate.value == ""){
      birthdate.insertAdjacentHTML('afterend','<p class="error-message">Vous devez entrer votre date de naissance.</p>');
      return false;
  }
  return true;
}
function emailValidation() {
  if(email.value.includes("@") == false){
    email.insertAdjacentHTML('afterend','<p class="error-message">Vous devez entrer un email valide</p>');
    return false;
  }
  return true;
}
function quantityValidation() {
  if( isNaN(parseInt(quantity.value))){
    quantity.insertAdjacentHTML('afterend','<p class="error-message">Vous devez entrer un nombre</p>');
    return false;
  }
  return true;
}
function cguValidation() {
  if(cgu.checked == false){
    //selecting checkbox label for the error message placement
    let cguError = form.querySelector("[for=checkbox1]");
    cguError.insertAdjacentHTML('afterend', '<p class="error-message">Vous devez vérifier que vous acceptez les termes et conditions.</p>');
    return false;
  }    
  return true;
}
function locationValidation() {
  //selecting all radio button
  let locations = form.querySelectorAll('input[type=radio]');
  //iterating through radio and verifying check value  
  for (let location of locations) {
    if(location.checked) {
      return true;
    }
  }
  //selecting last radio label for the error message placement
  let locationElement = form.querySelector("[for=location6]")
  locationElement.insertAdjacentHTML('afterend', '<p class="error-message">Vous devez choisir une option.</p>');
  return false;
}



function formValidation() {

  //Comme true peut etre caster en 1, si tout les elements sont vrai on a 7*1 sinon si un element est faux, formulaire non valide
    if(
      firstNameValidation() +
      lastNameValidation() +
      emailValidation() +
      birthdateValidation() +
      quantityValidation() +
      locationValidation() +
      cguValidation() == 7
      ){
        return true;
      }
      return false;
}

//remove error message
function errorMessageCleanUp() {
  //select all error message
  let errorMessages = document.querySelectorAll(".error-message");
  for( let message of errorMessages) {
    message.remove();
  }
}

form.addEventListener('submit', (e) => {
  //prevent refresh on submit
  e.preventDefault();
  //remove error message 
  errorMessageCleanUp();
  if(formValidation()) {
    form[0].style.display = "none";
    document.querySelector(".modal-body").insertAdjacentHTML('afterbegin','<p>Merci! Votre réservation a été reçue.</p>')
  }
})

