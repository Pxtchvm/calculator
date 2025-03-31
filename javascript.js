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
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  }
}

let number;

let operator; // should remake this because the calculator display isn't limited to just one operator operating ie. `1+2-3+4`

let anotherNumber; // should remake this because the calculator display isn't limited to just two numbers being operated on ie. `1+2+3+4`

const display = document.querySelector("#calculator-display");

const resultDisplay = document.querySelector("#result-display");

const clearButton = document.querySelector("#clear-btn");

const backspaceButton = document.querySelector("#backspace-btn");

const equalsButton = document.querySelector("#equals-btn");

const funButton = document.querySelector("#fun-btn");

const digitButtons = document.querySelectorAll(".digit-btn");

const operatorButtons = document.querySelectorAll(".operator-btn");

clearButton.addEventListener("click", () => {
  number = undefined;
  operator = undefined;
  anotherNumber = undefined;
  display.textContent = "";
});

backspaceButton.addEventListener("click", () => {
  let text = display.textContent;
  let textLength = display.textContent.length;
  display.textContent = text.slice(0, textLength - 1);
});

funButton.addEventListener("click", () => {
  // implement something fun here!
  alert("calculator is fun isn't it?!")
});

equalsButton.addEventListener("click", () => {
  // implement equals functionality
});

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    display.textContent += button.textContent;
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    number = +display.textContent;
    display.textContent += button.textContent;
  });
});
