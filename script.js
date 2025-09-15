const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let resetDisplay = false;

function updateDisplay() {
  display.textContent = currentInput || "0";
}

function calculateExpression() {
  try {
    // Replace symbols for JS eval
    let expr = currentInput.replace(/÷/g, "/")
                           .replace(/×/g, "*")
                           .replace(/−/g, "-");
    currentInput = eval(expr).toString();
    updateDisplay();
  } catch {
    display.textContent = "Error";
    currentInput = "";
  }
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      currentInput = "";
      updateDisplay();
    } else if (value === "=") {
      calculateExpression();
    } else {
      if (resetDisplay && !isNaN(value)) {
        currentInput = value;
        resetDisplay = false;
      } else {
        currentInput += value;
      }
      updateDisplay();
    }
  });
});

// Keyboard Support
document.addEventListener("keydown", e => {
  const key = e.key;

  if (!isNaN(key) || key === ".") {
    currentInput += key;
  } else if (["+", "-", "*", "/"].includes(key)) {
    currentInput += key.replace("*", "×")
                       .replace("/", "÷")
                       .replace("-", "−");
  } else if (key === "Enter") {
    calculateExpression();
    return;
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  } else if (key.toLowerCase() === "c") {
    currentInput = "";
  }
  updateDisplay();
});
