
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
  if(firstName.value.length < 2 || /^[a-zA-Z]+$/.test(firstName.value) == false){
      //Si le champ est non valide, affichage de l'erreur
      firstName.parentElement.setAttribute('data-error-visible', "true");
      //definition du message d'erreur
      firstName.parentElement.setAttribute('data-error','Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
      
      return false;
  }
  return true;
}
function lastNameValidation() {
  //Validation condition: Name longer than 2 characters
  if(lastName.value.length < 2 || /^[a-zA-Z]+$/.test(lastName.value) == false){
    //Si le champ est non valide, affichage de l'erreur
      lastName.parentElement.setAttribute('data-error-visible', "true");
      //definition du message d'erreur
      lastName.parentElement.setAttribute('data-error','Veuillez entrer 2 caractères ou plus pour le champ du nom.');
      
      return false;
  }
  return true;
}
function birthdateValidation() {
    if(Date.now() <= Date.parse(birthdate.value)){
    //Si le champ est non valide, affichage de l'erreur
    birthdate.parentElement.setAttribute('data-error-visible', "true");
    //definition du message d'erreur
    birthdate.parentElement.setAttribute('data-error','Vous devez entrer votre date de naissance.');
     
      return false;
  }
  return true;
}
function emailValidation() {
  if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email.value) == false){
      //Si le champ est non valide, affichage de l'erreur
      email.parentElement.setAttribute('data-error-visible', "true");
      //definition du message d'erreur
      email.parentElement.setAttribute('data-error','Veuillez entrer un email valide.');
   
    return false;
  }
  return true;
}
function quantityValidation() {
  if( isNaN(parseInt(quantity.value))){
      //Si le champ est non valide, affichage de l'erreur
      quantity.parentElement.setAttribute('data-error-visible', "true");
      //definition du message d'erreur
      quantity.parentElement.setAttribute('data-error','Veuillez entrer un nombre.');
    
    return false;
  }
  return true;
}
function cguValidation() {
  if(cgu.checked == false){
    //Si le champ est non valide, affichage de l'erreur
      cgu.parentElement.setAttribute('data-error-visible', "true");
      //definition du message d'erreur
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
  //selecting parent of first location element
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
  //hide error on all formdata 
  let formDatas = form.querySelectorAll(".formData");
  for(let formData of formDatas) {
    formData.setAttribute('data-error-visible', 'false');
  }
}

form.addEventListener('submit', (e) => {
  //prevent refresh on submit
  e.preventDefault();
  //remove error message 
  errorMessageCleanUp();
  if(formValidation()) {
    //hide form
    form.style.display = "none";
    //add Succes message
    document.querySelector(".modal-body").insertAdjacentHTML('afterbegin','<p style="padding:300px 0">Merci! Votre réservation a été reçue.</p>');
    //add close button
    document.querySelector(".modal-body").insertAdjacentHTML('beforeend',"<button id='fermer' class='btn-submit'> Fermer </button>");
    //bind close fuction to button
    document.getElementById('fermer').addEventListener("click",closeModal);
  }
})