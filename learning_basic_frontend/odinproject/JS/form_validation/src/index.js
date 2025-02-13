import "./styles.css";
import { EmailValidator } from "./email_validation";
import { PostcodeValidator } from "./postcode_validation";
import { PasswordValidator } from "./password_validation";

document.addEventListener("DOMContentLoaded", () => {
  window.emailValidator = new EmailValidator();
  window.postcodeValidator = new PostcodeValidator();
  window.passwordValidator = new PasswordValidator();

  let form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (
      window.emailValidator.isValid() &&
      window.postcodeValidator.isValid() &&
      window.passwordValidator.isValid()
    ) {
      alert("Submitted!");
    }
  });
});
