const form = document.querySelector('#login-account-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', (event) => {

  event.preventDefault();
  let valid = validateForm()
  console.log(valid)
    if (!valid) {

      return false
    }









});



function validateForm() {

  //EMAIL
  if (emailInput.value.trim() == '') {
    return setError(emailInput, 'Provide email address');

  } else if (isEmailValid(emailInput.value)) {
    return setSuccess(emailInput);
  } else {
     setError(emailInput, 'Provide valid email address');
  }

  //PASSWORD
  if (passwordInput.value.trim() == '') {
    return setError(passwordInput, 'Password can not be empty');
  } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
    return setError(passwordInput, 'Password min 6 max 20 charecters');
  } else {
    return setSuccess(passwordInput);
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