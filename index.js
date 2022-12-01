let display = document.getElementById("calcDisplay");

// function to put cursor at the end of anything with 'conteneditable'
// shamelessly stolen from stackoverflow
// https://stackoverflow.com/a/69727327

function setEndOfContenteditable(elem) {
  let sel = window.getSelection();
  sel.selectAllChildren(elem);
  sel.collapseToEnd();
}

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
          // try to evaulate the expression using the math.js evaluate function
          display.innerText = math.evaluate(display.innerText);
          // if it is infinity, display error
          if (display.innerText === "Infinity") {
            display.innerText = "Error";
          }
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
