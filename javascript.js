// Basic arithmetic operations
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
  if (b === 0) return "NOPE";
  return a / b;
}

// Calculator state object to track the current expression
const calculatorState = {
  displayValue: "",
  maxLength: 12,  // Maximum number of digits for display
};

// DOM elements
const display = document.querySelector("#calculator-display");
const resultDisplay = document.querySelector("#result-display");
const clearButton = document.querySelector("#clear-btn");
const backspaceButton = document.querySelector("#backspace-btn");
const equalsButton = document.querySelector("#equals-btn");
const funButton = document.querySelector("#fun-btn");
const digitButtons = document.querySelectorAll(".digit-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");

// Helper functions
function formatNumberWithCommas(number) {
  // Split the number at decimal point
  const parts = number.toString().split('.');
  // Format the integer part with commas
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // Join back with decimal part if it exists
  return parts.join('.');
}

function updateDisplay() {
  // Format the display with commas but keep the raw value for calculations
  let formattedDisplay = calculatorState.displayValue;
  
  // Split by operators to format numbers individually
  const operators = ['+', '-', '×', '÷'];
  let currentNumber = "";
  let formattedResult = "";
  
  for (let i = 0; i < formattedDisplay.length; i++) {
    const char = formattedDisplay[i];
    if (operators.includes(char)) {
      // Format the number before the operator
      if (currentNumber) {
        formattedResult += formatNumberWithCommas(currentNumber);
        currentNumber = "";
      }
      formattedResult += char;
    } else {
      currentNumber += char;
    }
  }
  
  // Add the last number
  if (currentNumber) {
    formattedResult += formatNumberWithCommas(currentNumber);
  }
  
  // Format with line breaks for long expressions
  const formattedWithLineBreaks = formatWithLineBreaks(formattedResult);
  
  // Wrap the content in a span for proper display
  display.innerHTML = `<span>${formattedWithLineBreaks}</span>`;
  
  // Scroll to the bottom to show the latest input
  display.scrollTop = display.scrollHeight;
  
  // Update result display with real-time calculation result
  updateResultDisplay();
}

// Function to add line breaks after a certain number of characters
function formatWithLineBreaks(text) {
  const maxCharsPerLine = 16; // Adjust based on display width
  let result = '';
  let currentLineLength = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    // Add line break if we're at an operator and line is getting long
    if ((char === '+' || char === '-' || char === '×' || char === '÷') && currentLineLength > maxCharsPerLine / 2) {
      result += '\n' + char;
      currentLineLength = 1; // Just the operator
    } else {
      // If line is too long and we're not breaking at an operator, force break
      if (currentLineLength >= maxCharsPerLine) {
        result += '\n' + char;
        currentLineLength = 1;
      } else {
        result += char;
        currentLineLength++;
      }
    }
  }
  
  return result;
}

function updateResultDisplay() {
  const expression = calculatorState.displayValue;
  if (!expression) {
    resultDisplay.textContent = "";
    return;
  }
  
  // Only show result if there's an actual equation (contains operators)
  const hasOperator = /[+\-×÷]/.test(expression);
  if (!hasOperator) {
    resultDisplay.textContent = "";
    return;
  }
  
  try {
    const result = evaluateExpression(expression);
    if (result !== null && !isNaN(result)) {
      resultDisplay.textContent = formatNumberWithCommas(result);
    } else {
      resultDisplay.textContent = "";
    }
  } catch (error) {
    resultDisplay.textContent = "";
  }
}

// Function to tokenize the expression
function tokenizeExpression(expression) {
  const tokens = [];
  let currentNumber = "";
  
  // Replace × and ÷ with * and / for evaluation
  expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
  
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    
    if ("+-*/".includes(char)) {
      // If we have a number before the operator, add it to tokens
      if (currentNumber) {
        tokens.push(parseFloat(currentNumber));
        currentNumber = "";
      }
      tokens.push(char);
    } else {
      // Building a number
      currentNumber += char;
    }
  }
  
  // Add the last number
  if (currentNumber) {
    tokens.push(parseFloat(currentNumber));
  }
  
  return tokens;
}

// Expression evaluation following PEMDAS
function evaluateExpression(expression) {
  if (!expression) return null;
  
  // Check if expression ends with an operator
  if ("+-×÷".includes(expression[expression.length - 1])) {
    return null; // Don't evaluate if expression ends with operator
  }
  
  const tokens = tokenizeExpression(expression);
  
  // First pass: handle multiplication and division
  for (let i = 1; i < tokens.length - 1; i += 2) {
    if (tokens[i] === '*' || tokens[i] === '/') {
      const leftOperand = tokens[i - 1];
      const rightOperand = tokens[i + 1];
      let result;
      
      if (tokens[i] === '*') {
        result = multiply(leftOperand, rightOperand);
      } else {
        result = divide(leftOperand, rightOperand);
      }
      
      // Replace these tokens with the result
      tokens.splice(i - 1, 3, result);
      i -= 2; // Adjust the index to account for removed tokens
    }
  }
  
  // Second pass: handle addition and subtraction
  let result = tokens[0];
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const operand = tokens[i + 1];
    
    if (operator === '+') {
      result = add(result, operand);
    } else if (operator === '-') {
      result = subtract(result, operand);
    }
  }
  
  return result;
}

// Check if the last character is an operator
function lastCharIsOperator() {
  return "+-×÷".includes(calculatorState.displayValue.slice(-1));
}

// Check if current number being typed already has a decimal point
function currentNumberHasDecimal() {
  // Get the part after the last operator
  const parts = calculatorState.displayValue.split(/[+\-×÷]/);
  const currentNumber = parts[parts.length - 1];
  return currentNumber.includes('.');
}

// Event listeners
clearButton.addEventListener("click", () => {
  calculatorState.displayValue = "";
  updateDisplay();
});

backspaceButton.addEventListener("click", () => {
  calculatorState.displayValue = calculatorState.displayValue.slice(0, -1);
  updateDisplay();
});

funButton.addEventListener("click", () => {
  // You can implement something fun here
  alert("Calculator is fun!");
});

equalsButton.addEventListener("click", () => {
  try {
    const result = evaluateExpression(calculatorState.displayValue);
    if (result !== null) {
      calculatorState.displayValue = result.toString();
      updateDisplay();
    }
  } catch (error) {
    resultDisplay.textContent = "Error";
  }
});

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const digit = button.textContent;
    
    // Handle decimal point
    if (digit === '.' && currentNumberHasDecimal()) {
      return; // Skip if current number already has a decimal
    }
    
    // Check if current number exceeds max length
    const parts = calculatorState.displayValue.split(/[+\-×÷]/);
    const currentNumber = parts[parts.length - 1];
    
    // Only apply digit limit to the current number being entered (not the entire expression)
    if (currentNumber.length >= calculatorState.maxLength && !lastCharIsOperator()) {
      // If number is at max length, don't add more digits unless it's an operator
      return;
    }
    
    calculatorState.displayValue += digit;
    updateDisplay();
    
    // Ensure display scrolls to the right end to show the latest digit
    if (display.scrollWidth > display.clientWidth) {
      display.scrollLeft = 0; // Since we're using RTL, 0 will scroll to the rightmost
    }
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const operator = button.textContent;
    
    // If display is empty and it's not a minus sign (for negative numbers)
    if (calculatorState.displayValue === "" && operator !== "-") {
      return;
    }
    
    // If last char is an operator, replace it
    if (lastCharIsOperator()) {
      calculatorState.displayValue = calculatorState.displayValue.slice(0, -1) + operator;
    } else {
      calculatorState.displayValue += operator;
    }
    
    updateDisplay();
  });
});

// Initialize the display when the page loads
updateDisplay();
