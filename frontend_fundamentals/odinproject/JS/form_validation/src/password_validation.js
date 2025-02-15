export class PasswordValidator {
  static #regexSpecialChar = new RegExp('[!@#$%^&*(),.?":{}|<>]');
  static #regexNumber = new RegExp("\\d");
  static #regexUppercase = new RegExp("[A-Z]");
  static #regexLowercase = new RegExp("[a-z]");

  constructor() {
    this.form = document.querySelector("form");
    this.password = document.getElementById("password");
    this.confirmPassword = document.getElementById("confirm-password");
    this.passwordError = document.querySelector("#password + span.error");
    this.confirmPasswordError = document.querySelector(
      "#confirm-password + span.error"
    );

    // Password validity.
    this.password.addEventListener("input", (event) => {
      this.validatePassword();
      this.validateConfirmPassword();
    });

    // Confirm password validity.
    this.confirmPassword.addEventListener("input", (event) => {
      this.validateConfirmPassword();
    });

    // Prevent form submission if password fields are not valid.
    this.form.addEventListener("submit", (event) => {
      if (!this.passwordIsValid()) {
        this.showPasswordError();
        event.preventDefault();
      } else if (!this.confirmPasswordIsValid()) {
        this.showConfirmPasswordError();
        event.preventDefault();
      }
    });
  }

  isValid() {
    return this.passwordIsValid() && this.confirmPasswordIsValid();
  }

  validatePassword() {
    if (this.passwordIsValid()) {
      this.passwordError.textContent = "";
      this.passwordError.className = "error";
    } else {
      this.showPasswordError();
    }
  }

  validateConfirmPassword() {
    if (this.confirmPasswordIsValid()) {
      this.confirmPasswordError.textContent = "";
      this.confirmPasswordError.className = "error";
    } else {
      this.showConfirmPasswordError();
    }
  }

  validate() {
    if (this.isValid()) {
      this.postcodeError.textContent = "";
      this.postcodeError.className = "error";
    } else {
      this.showError();
    }
  }

  passwordIsValid() {
    return (
      PasswordValidator.#regexLowercase.test(this.password.value) &&
      PasswordValidator.#regexNumber.test(this.password.value) &&
      PasswordValidator.#regexSpecialChar.test(this.password.value) &&
      PasswordValidator.#regexUppercase.test(this.password.value) &&
      this.password.validity.valid
    );
  }

  confirmPasswordIsValid() {
    return this.password.value == this.confirmPassword.value;
  }

  showPasswordError() {
    // Handle password errors.
    if (this.password.validity.valueMissing) {
      this.passwordError.textContent = "You need to enter a password.";
    } else if (this.password.validity.tooShort) {
      this.passwordError.textContent =
        "Password needs to have minimum 10 characters.";
    } else if (this.password.validity.tooLong) {
      this.passwordError.textContent =
        "Password needs to have maximum 30 characters.";
    } else if (!PasswordValidator.#regexLowercase.test(this.password.value)) {
      this.passwordError.textContent =
        "Password needs to have at least one lowercase character.";
    } else if (!PasswordValidator.#regexUppercase.test(this.password.value)) {
      this.passwordError.textContent =
        "Password needs to have at least one uppercase character.";
    } else if (!PasswordValidator.#regexSpecialChar.test(this.password.value)) {
      this.passwordError.textContent =
        "Password needs to have at least one special character.";
    } else if (!PasswordValidator.#regexNumber.test(this.password.value)) {
      this.passwordError.textContent =
        "Password needs to have at least one number.";
    }
    this.passwordError.className = "error active";
  }

  showConfirmPasswordError() {
    // Handle confirm password error.
    this.confirmPasswordError.textContent = "Must match the password field.";
    this.confirmPasswordError.className = "error active";
  }
}
