import "./style.css";

const linkInput = document.getElementById("link-input");
const linkForm = document.getElementById("link-form");
const errMsg = document.getElementById("err-msg");
const linkSubmitBtn = document.getElementById("form-submit-btn");

function formSubmit(event) {
  event.preventDefault();

  if (linkInput.value === "") {
    errMsg.textContent = "Please enter something!";
    linkInput.style.borderColor = "red";
  } else if (!validateURL(linkInput.value)) {
    errMsg.textContent = "Please enter a valid URL!";
    linkInput.style.borderColor = "red";
  } else {
    linkInput.style.borderColor = "white";
    errMsg.textContent = "";
  }

  console.log(123);
}

function validateURL(url) {
  const urlRegex =
    /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/[\w\d-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  return urlRegex.test(url);
}

linkSubmitBtn.addEventListener("click", formSubmit);
