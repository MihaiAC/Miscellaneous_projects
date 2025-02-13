// Code taken from
// https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation#validating_forms_using_javascript

export class EmailValidator {
  constructor() {
    this.form = document.querySelector("form");
    this.email = document.getElementById("mail");
    this.emailError = document.querySelector("#mail + span.error");

    this.email.addEventListener("input", (event) => {
      if (this.email.validity.valid) {
        this.emailError.textContent = ""; // Remove the message content
        this.emailError.className = "error"; // Removes the `active` class
      } else {
        // If there is still an error, show the correct error
        this.showError();
      }
    });

    this.form.addEventListener("submit", (event) => {
      // if the email field is invalid
      if (!this.isValid()) {
        // display an appropriate error message
        this.showError();
        // prevent form submission
        event.preventDefault();
      }
    });
  }

  isValid() {
    return this.email.validity.valid;
  }

  showError() {
    if (this.email.validity.valueMissing) {
      // If empty
      this.emailError.textContent = "You need to enter an email address.";
    } else if (this.email.validity.typeMismatch) {
      // If it's not an email address,
      this.emailError.textContent =
        "Entered value needs to be an email address.";
    } else if (this.email.validity.tooShort) {
      // If the value is too short,
      this.emailError.textContent = `Email should be at least ${this.email.minLength} characters; you entered ${this.email.value.length}.`;
    }
    // Add the `active` class
    this.emailError.className = "error active";
  }
}
