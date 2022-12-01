let display = document.getElementById("calcDisplay");

// function to put cursor at the end of anything with 'conteneditable'
// shamelessly stolen from stackoverflow
// https://stackoverflow.com/a/69727327

function setEndOfContenteditable(elem) {
  let sel = window.getSelection();
  sel.selectAllChildren(elem);
  sel.collapseToEnd();
}

function evaluateMath(expression) {
  //evaluate expression with math.js evaluate
  let result = math.evaluate(expression);
  // if error, return error, else return result
  return result === "Infinity" ? "Error" : result;
}

// add event listener to display to prevent default enter key behavior
// without this, pressing enter will create a new line in the display
// that makes the math function return an array, and hides text if you press enter
display.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    display.innerText = evaluateMath(display.innerText);
    setEndOfContenteditable(display);
  }
});

let buttons = Array.from(document.querySelectorAll(".button"));

//add event listeners to buttons
buttons.map((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "C":
        display.innerText = "";
        break;
      case "=":
        try {
          // try to evaulate the expression
          display.innerText = evaluateMath(display.innerText);
        } catch {
          // catch all, if something goes wrong, display error
          display.innerText = "Error";
        }
        break;
      case "←":
        // if it says error, delete the entire string for convenience
        if (display.innerText == "Error") {
          display.innerText = "";
        } else if (display.innerText) {
          // remove last character
          display.innerText = display.innerText.slice(0, -1);
        }
        break;
      case "√":
        try {
          // evaluate any expression inside the calc, then take the square root
          display.innerText = math.sqrt(math.evaluate(display.innerText));
        } catch {
          display.innerText = "Error";
        }
        break;
      case "𝑥²":
        // square the evaluated expression
        display.innerText = math.pow(math.evaluate(display.innerText), 2);
        break;
      case "1/𝑥":
        // take the inverse square of the evaluated expression
        display.innerText = math.pow(math.evaluate(display.innerText), -1);
        break;
      default:
        // adds the text inside the button to the display, could be more secure
        display.innerText += e.target.innerText;
    }
    setEndOfContenteditable(display);
  });
});
