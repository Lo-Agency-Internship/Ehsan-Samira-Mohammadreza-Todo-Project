const form = document.querySelector('#create-account-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');

form.addEventListener('submit', (event) => {
event.preventDefault();
let valid = validateForm()
console.log(valid)
  if (!valid) {

    return false
  }


  let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []

  let inputs = {

    id: Date.now(),
    email: document.querySelector("#email").value,
    password1: document.querySelector("#password").value,
    password2: document.querySelector("#confirm-password").value
  }
  users.push(inputs)






  localStorage.setItem('users', JSON.stringify(users));







});



function validateForm() {
  //USERNAME
  if (usernameInput.value.trim() == '') {
  return  setError(usernameInput, 'Name can not be empty');

  } else if (usernameInput.value.trim().length < 5 || usernameInput.value.trim().length > 15) {
     return setError(usernameInput, 'Name must be min 5 and max 15 charecters');

  } else {
  return setSuccess(usernameInput);

  }
  //EMAIL
  if (emailInput.value.trim() == '') {
  return setError(emailInput, 'Provide email address');

  } else if (isEmailValid(emailInput.value)) {
  return setSuccess(emailInput);
  } else {
    return setError(emailInput, 'Provide valid email address');

  }

  //PASSWORD
  if (passwordInput.value.trim() == '') {
     return setError(passwordInput, 'Password can not be empty');


  } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
return setError(passwordInput, 'Password min 6 max 20 charecters');

  } else {
  return setSuccess(passwordInput);
  }
  //CONFIRM PASSWORD
  if (confirmPasswordInput.value.trim() == '') {
  return setError(confirmPasswordInput, 'Password can not be empty');

  } else if (confirmPasswordInput.value !== passwordInput.value) {
  return setError(confirmPasswordInput, 'Password does not match');

  } else {
  return setSuccess(confirmPasswordInput);
  }
}

function setError(element, errorMessage) {
  const parent = element.parentElement;
  if (parent.classList.contains('success')) {
    parent.classList.remove('success');
  }
  parent.classList.add('error');
  const paragraph = parent.querySelector('p');
  paragraph.textContent = errorMessage;
  return false
}

function setSuccess(element) {
  const parent = element.parentElement;
  if (parent.classList.contains('error')) {
    parent.classList.remove('error');
  }
  parent.classList.add('success');
  return true
}

function isEmailValid(email) {
  const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return reg.test(email);
}
