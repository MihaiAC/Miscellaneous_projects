### Forms ###
- `label for="x"`;
- `id="x"` - must match the label
- `name` - name of the field submitted to backend;
- `method` - HTTP method to submit the form with;
- `type` - type of input; (`text|password|email|number|date`)
- `textarea` - for longer input;
- `options, optgroup`;
- radio buttons;
- checkboxes;
- submit button, reset button (`type=reset|submit|button`);
- `fieldset, legend` - to group up form inputs;
- Can use section to delimit different form sections.
- `required` attribute
- `minlength, maxlength, pattern` validation for text
- `min, max` validation for nums
- `placeholder`
- CSS: `input:valid, input:invalid`
Never trust frontend validation in the backend.
Front-end validation's purpose is to make a legitimate user input data in the way we want (PR "help the user not make mistakes when submitting the form").

[More controls](https://www.sitepoint.com/html-forms-constraint-validation-complete-guide/#whatisconstraintvalidation)