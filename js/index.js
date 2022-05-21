const form = document.querySelector('#login-account-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', (event) => {

  validateForm()

  let userInfo = []

  let inputs = {

    id: Date.now(),
    email: document.querySelector("#email").value,
    password1: document.querySelector("#password").value,
  }
  userInfo.push(inputs)


  // Get current counter from LS and increment it
  let counterLogin = localStorage.getItem('counter Login');
  counterLogin++;

  // Put names in LS with a new counter id
  localStorage.setItem('user Login:' + counterLogin, JSON.stringify(userInfo));

  // Put back the incremented counter into LS
  localStorage.setItem('counter Login', counterLogin);


  event.preventDefault();








});



function validateForm() {

  //EMAIL
  if (emailInput.value.trim() == '') {
    setError(emailInput, 'Provide email address');

  } else if (isEmailValid(emailInput.value)) {
    setSuccess(emailInput);
  } else {
    setError(emailInput, 'Provide valid email address');
  }

  //PASSWORD
  if (passwordInput.value.trim() == '') {
    setError(passwordInput, 'Password can not be empty');
  } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
    setError(passwordInput, 'Password min 6 max 20 charecters');
  } else {
    setSuccess(passwordInput);
  }


  function setError(element, errorMessage) {
    const parent = element.parentElement;
    if (parent.classList.contains('success')) {
      parent.classList.remove('success');
    }
    parent.classList.add('error');
    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMessage;
  }

  function setSuccess(element) {
    const parent = element.parentElement;
    if (parent.classList.contains('error')) {
      parent.classList.remove('error');
    }
    parent.classList.add('success');
  }

  function isEmailValid(email) {
    const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return reg.test(email);
  }
}