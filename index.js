let display = document.getElementById('calcDisplay');

function setEndOfContenteditable(elem) {
    let sel = window.getSelection();
    sel.selectAllChildren(elem);
    sel.collapseToEnd();
}


let buttons = Array.from(document.querySelectorAll('.button'));
console.log(buttons);

buttons.map(button => { 
    button.addEventListener('click', (e) => {
        switch (e.target.innerText) { 
            case 'C':
                display.innerText = '';
                break;
            case '=':
                try {
                    display.innerText = math.evaluate(display.innerText);
                    if (display.innerText === 'Infinity') {
                        display.innerText = 'Error';
                    }
                } catch {
                    display.innerText = 'Error';
                }
                break;
            case '←':
                if (display.innerText == 'Error') {
                    display.innerText = '';
                } else if (display.innerText) { 
                    display.innerText = display.innerText.slice(0, -1);
                }
                break;
            case '√':
                try {
                    display.innerText = math.sqrt(math.evaluate(display.innerText));
                } catch {
                    display.innerText = 'Error';
                }
                break;
            case '𝑥²':
                display.innerText = math.pow(math.evaluate(display.innerText), 2);
                break;
            case '1/𝑥':
                display.innerText = math.pow(math.evaluate(display.innerText), -1);
                break;
            default:
                display.innerText += e.target.innerText;
        }
        setEndOfContenteditable(display);
    });
})