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

function operate(operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "×") {
    return multiply(a, b);
  } else if (operator === "÷") {
    return divide(a, b);
  }
}

let number;
let operator;
let anotherNumber;
let state = 0;
let result = 0;

const display = document.querySelector("#calculator-display");
const clearButton = document.querySelector("#clear-btn");
const backspaceButton = document.querySelector("#backspace-btn");
const digitButtons = document.querySelectorAll(".digit-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const equalsButton = document.querySelector("#equals-btn");
const funButton = document.querySelector("#fun-btn");

clearButton.addEventListener("click", () => {
  number = undefined;
  operator = undefined;
  anotherNumber = undefined;
  result = undefined;
  display.textContent = "";
});

backspaceButton.addEventListener("click", () => {
  let text = display.textContent;
  let textLength = display.textContent.length;
  display.textContent = text.slice(0, textLength - 1);
});

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (state === 0) {
      // Entering first number "12"
      display.textContent += button.textContent;
      number = +display.textContent;
      console.log(number);
    } else if (state === 1) {
      // An operator is pressed, entering second number "123+"
      display.textContent += button.textContent;
      anotherNumber = +display.textContent.split(/[+\-×÷]/)[1];
      console.log(anotherNumber);
    }
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => 
    // There should be a check here to check the state of the display
    // The operator could be pressed in the following states:
    // 1+2+     => let's call this twoNumber state
    // 3+       => let's call this oneNumber state
    // A check could be to check if anotherNumber already exists
    if (/[+\-×÷]/.test(display.textContent) && anotherNumber) {
      // if display.textContent has an operator already, and anotherNumber exists:
      // calculate result if anotherNumber exists already (1+2+) = (3+)
      // First, find the operator that exists between the two numbers and store it in operator
      operator = undefined; // code to find the operator (ie. the "plus" in 1+2)
      result = operate(operator, number, anotherNumber);
      // Update the display to result + the operator pressed ie. "3+"
      // replace the existing
    }
    number = +display.textContent;
    display.textContent += button.textContent;
)});

equalsButton.addEventListener("click", () => {
  // implement equals functionality
});

funButton.addEventListener("click", () => {
  alert("calculator is fun isn't it?!");
});
