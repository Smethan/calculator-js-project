/* 

*Display section*

*/

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
    let result;
    try {
        // try to evaluate expression with math.js evaluate
        result = math.evaluate(expression);
    } catch {
        // if math.evaluate throws a js error, return error
        // mostly used to handle strings being input into the calculator textbox
        result = "Error";
    }
    // if math.evaluate passes, but returns Infinity, returen error, else return the value
    // handles division by zero
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

/* 

*Button section*

*/

let buttons = Array.from(document.querySelectorAll(".button"));

//add event listeners to buttons
buttons.map((button) => {
    button.addEventListener("click", (e) => {
        switch (e.target.innerText) {
            case "C":
                display.innerText = "";
                break;
            case "=":
                display.innerText = evaluateMath(display.innerText);

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

            // todo: too many try catch blocks, should probably write separate functions to make it readable
            case "√":
                try {
                    // evaluate any expression inside the calc, then take the square root
                    display.innerText = math.sqrt(evaluateMath(display.innerText));
                } catch {
                    display.innerText = "Error";
                }
                break;
            case "𝑥²":
                // square the evaluated expression
                try {
                    display.innerText = math.pow(evaluateMath(display.innerText), 2);
                } catch {
                    display.innerText = "Error";
                }
                break;
            case "1/𝑥":
                // take the inverse square of the evaluated expression
                try {
                    display.innerText = math.pow(evaluateMath(display.innerText), -1);
                } catch {
                    display.innerText = "Error";
                }
                break;
            default:
                // adds the text inside the button to the display
                // todo: add regex to force numbers and symbols
                display.innerText += e.target.innerText;
        }
        setEndOfContenteditable(display);
    });
});
