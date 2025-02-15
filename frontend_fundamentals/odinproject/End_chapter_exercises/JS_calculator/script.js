let mem_num = 0;
let mem_op = null;
let isLastPressSign = false;

// Buttons
const form_input = document.querySelector("#form-input");
const clear_btn = document.querySelector("#clear");
const add_btn = document.querySelector("#add");
const subtract_btn = document.querySelector("#subtract");
const multiply_btn = document.querySelector("#multiply");
const divide_btn = document.querySelector("#divide");
const equal_btn = document.querySelector("#equal");

form_input.value = '0'

for (let num = 0; num <= 9; num++) {
    let str_num = num.toString();
    const btn_elem = document.getElementById(str_num);
    btn_elem.addEventListener("click", (event) => appendNumToDisplay(str_num));
}

clear_btn.addEventListener("click", clear);
add_btn.addEventListener("click", (e) => parseOperator(add));
subtract_btn.addEventListener("click", (e) => parseOperator(subtract));
multiply_btn.addEventListener("click", (e) => parseOperator(multiply));
divide_btn.addEventListener("click", (e) => parseOperator(divide));
equal_btn.addEventListener("click", (e) => performCalculation());

// After an operator is pressed, the next number should overwrite
// the currently displayed number. -> use isLastPressSign
function appendNumToDisplay(num_str) {
    let current_num_str = form_input.value;
    if (current_num_str === '0') {
        if (num_str === '0') {
            return;
        } else {
            form_input.value = num_str;
        }
    } else {
        if (isLastPressSign) {
            isLastPressSign = false;
            form_input.value = num_str;
        } else {
            current_num_str = current_num_str + num_str;
            form_input.value = current_num_str;
        }
    }
}

function clear(event) {
    mem_num = 0;
    mem_op = null;
    form_input.value = '0';
}

function performCalculation() {
    let current_num = Number.parseInt(form_input.value);
    let result = mem_op(mem_num, current_num);
    form_input.value = result.toString();
    mem_num = 0;
    mem_op = null;
}

function parseOperator(operator_function) {
    if (mem_op !== null) {
        performCalculation();
    }
    mem_num = Number.parseInt(form_input.value);
    mem_op = operator_function;
    isLastPressSign = true;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}



