export class PostcodeValidator {
  static #constraints = {
    UK: [
      "^[A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2}$",
      "Please input a valid UK postcode.",
    ],
    NL: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Valid NL postcodes must have 4 digits, followed by 2 letters except SA, SD and SS.",
    ],
  };

  constructor() {
    this.form = document.querySelector("form");
    this.country = document.getElementById("country");
    this.postcode = document.getElementById("postcode");
    this.postcodeError = document.querySelector("#postcode + span.error");
    this.constraint = new RegExp(
      PostcodeValidator.#constraints[this.country.value][0],
      ""
    );

    // On country selection change, update the constraint value.
    this.country.addEventListener("change", () => {
      this.constraint = new RegExp(
        PostcodeValidator.#constraints[this.country.value][0],
        ""
      );
      this.validate();
    });

    // Check postcode validity while the user is typing it.
    this.postcode.addEventListener("input", (event) => {
      this.validate();
    });

    // Prevent form submission if postcode is not valid.
    this.form.addEventListener("submit", (event) => {
      if (!this.isValid()) {
        this.showError();
        event.preventDefault();
      }
    });
  }

  validate() {
    if (this.isValid()) {
      this.postcodeError.textContent = "";
      this.postcodeError.className = "error";
    } else {
      this.showError();
    }
  }

  isValid() {
    return (
      this.constraint.test(this.postcode.value) && this.postcode.validity.valid
    );
  }

  showError() {
    if (this.postcode.validity.valueMissing) {
      this.postcodeError.textContent = "You need to enter a postcode.";
    } else {
      this.postcodeError.textContent =
        PostcodeValidator.#constraints[this.country.value][1];
    }
    this.postcodeError.className = "error active";
  }
}
