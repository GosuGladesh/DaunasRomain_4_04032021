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

//Element fetching
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const cgu = document.getElementById("checkbox1");
const form = document.getElementsByName("reserve");


// Validation functions 
function firstNameValidation() {
  if(firstName.value.length > 2){
      firstName.insertAdjacentHTML('afterend','<p>Veuillez entrer 2 caractères ou plus pour le champ du prénom.</p>');
      return false;
  }
  return true;
}
function lastNameValidation() {
  if(lastName.value.length > 2){
      lastName.insertAdjacentHTML('afterend','<p>Veuillez entrer 2 caractères ou plus pour le champ du nom.</p>');
      return false;
  }
  return true;
}
function birthdateValidation() {
  if(birthdate.value == ""){
      birthdate.insertAdjacentHTML('afterend','<p>Vous devez entrer votre date de naissance.</p>');
      return false;
  }
  return true;
}
function emailValidation() {
  if(email.value.includes("@") == false){
    email.insertAdjacentHTML('afterend','<p>Vous devez entrer un email valide</p>');
    return false;
  }
  return true;
}
function quantityValidation() {
  if( isNaN(parseInt(quantity.value))){
    quantity.insertAdjacentHTML('afterend','<p>Vous devez entrer un nombre</p>');
    return false;
  }
  return true;
}
function cguValidation() {
  if(cgu.checked == false){
    cgu.insertAdjacentHTML('afterend', '<p>Vous devez vérifier que vous acceptez les termes et conditions.</p>');
    return false;
  }    
  return true;
}
function locationValidation() {
  let locations = document.querySelectorAll('input[type=radio]');  
  for (let location of locations) {
    if(location.checked) {
      return true;
    }
  }
  let locationElement = document.getElementById("location6")
  locationElement.insertAdjacentHTML('afterend', '<p>Vous devez choisir une option.</p>');
  return false;
}

function formValidation() {

    if(
      firstNameValidation() &&
      lastNameValidation() &&
      emailValidation() &&
      birthdateValidation() &&
      quantityValidation() &&
      locationValidation() &&
      cguValidation()
      ){
        return true;
      }
      return false;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(formValidation()) {
    form.style.display = "none";
    form.insertAdjacentHTML('beforestart','<p>Merci ! Votre réservation a été reçue.</p>')
  }
})

