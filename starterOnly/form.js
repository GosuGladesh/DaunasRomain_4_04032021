
//Element selection
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const cgu = document.getElementById("checkbox1");
const form = document.querySelector("[name=reserve]");
const locations = form.querySelectorAll('input[type=radio]');


// Validation functions 
function firstNameValidation() {
  //Validation condition: Name longer than 2 characters
  if(firstName.value.length <= 2){
      //if invalide, insert html <p> with error message
      firstName.parentElement.setAttribute('data-error-visible', "true");
      firstName.parentElement.setAttribute('data-error','Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
      firstName.style.borderColor = "red";
      return false;
  }
  return true;
}
function lastNameValidation() {
  if(lastName.value.length <= 2){
      lastName.parentElement.setAttribute('data-error-visible', "true");
      lastName.parentElement.setAttribute('data-error','Veuillez entrer 2 caractères ou plus pour le champ du nom.');
      lastName.style.borderColor = "red";
      return false;
  }
  return true;
}
function birthdateValidation() {
  if(birthdate.value == ""){
    birthdate.parentElement.setAttribute('data-error-visible', "true");
    birthdate.parentElement.setAttribute('data-error','Vous devez entrer votre date de naissance.');
      birthdate.style.borderColor = "red";
      return false;
  }
  return true;
}
function emailValidation() {
  if(email.value.includes("@") == false){
    email.parentElement.setAttribute('data-error-visible', "true");
      email.parentElement.setAttribute('data-error','Veuillez entrer un email valide.');
    email.style.borderColor = "red";
    return false;
  }
  return true;
}
function quantityValidation() {
  if( isNaN(parseInt(quantity.value))){
    quantity.parentElement.setAttribute('data-error-visible', "true");
      quantity.parentElement.setAttribute('data-error','Veuillez entrer un nombre.');
    quantity.style.borderColor = "red";
    return false;
  }
  return true;
}
function cguValidation() {
  if(cgu.checked == false){
      cgu.parentElement.setAttribute('data-error-visible', "true");
      cgu.parentElement.setAttribute('data-error','Vous devez vérifier que vous acceptez les termes et conditions.');
    return false;
  }    
  return true;
}
function locationValidation() {
  //iterating through radio and verifying check value  
  for (let location of locations) {
    if(location.checked) {
      return true;
    }
  }
  //selecting last radio label for the error message placement
  locations[0].parentElement.setAttribute('data-error-visible', "true");
  locations[0].parentElement.setAttribute('data-error','Vous devez choisir un lieu.');
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
   //select all text input
  let textInputs = document.querySelectorAll(".text-control");
  for( let textInput of textInputs) {
    //swap border color back to original
    textInput.style.borderColor = "#ccc";
  }
  firstName.parentElement.setAttribute('data-error-visible', 'false');
  lastName.parentElement.setAttribute('data-error-visible', 'false');
  email.parentElement.setAttribute('data-error-visible', 'false');
  birthdate.parentElement.setAttribute('data-error-visible', 'false');
  quantity.parentElement.setAttribute('data-error-visible', 'false');
  cgu.parentElement.setAttribute('data-error-visible', 'false');
  locations[0].parentElement.setAttribute('data-error-visible', 'false');
}

form.addEventListener('submit', (e) => {
  //prevent refresh on submit
  e.preventDefault();
  //remove error message 
  errorMessageCleanUp();
  if(formValidation()) {
    form.style.display = "none";
    document.querySelector(".modal-body").insertAdjacentHTML('afterbegin','<p>Merci! Votre réservation a été reçue.</p>');
    document.querySelector(".modal-body").insertAdjacentHTML('beforeend',"<button id='fermer' class='btn-submit'> Fermer </button>");
    document.getElementById('fermer').addEventListener("click",() => { modalbg.style.display = "none"});
  }
})