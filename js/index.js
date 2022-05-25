const form = document.querySelector("#login-account-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let valid = validateForm();
  console.log(valid);
  if (!valid) {
    return false;
  }
  canLogin();

});

function validateForm() {
  //EMAIL
  if (emailInput.value.trim() == "") {
    return setError(emailInput, "Provide email address");
  } else if (isEmailValid(emailInput.value)) {
return    setSuccess(emailInput);
  } else {
    return setError(emailInput, "Provide valid email address");
  }

  //PASSWORD
  if (passwordInput.value.trim() == '') {
  return  setError(passwordInput, 'Password can not be empty');
  } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
  return  setError(passwordInput, 'Password min 6 max 20 charecters');
  } else {
  return  setSuccess(passwordInput);
  }

function canLogin() {
  let users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  users.find(search);
}

function search(item) {
  let userEmail = emailInput.value.trim();
  let userPassword = passwordInput.value.trim();
  if (userEmail == item.email && userPassword == item.password1) {
    console.log("im here");
    location.replace("todo.html");
    return setSuccess(passwordInput);
    return true;
  } else {
    console.log("password wrong");
    return setError(passwordInput, "Wrong password or email");

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
  if (parent.classList.contains("error")) {
    parent.classList.remove("error");
  }
  parent.classList.add("success");
  return true;
}

function isEmailValid(email) {
  const reg =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return reg.test(email);
}

