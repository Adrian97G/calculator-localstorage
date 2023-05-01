window.addEventListener('load', function() {
    iniciar();
});

let operacion = "";

window.addEventListener("load", ()=> {
    const display = document.querySelector(".calculator-display");
    const keypadButtons = document.getElementsByClassName("keypad-button");

    const keypadButtonsArray = Array.from(keypadButtons);

    keypadButtonsArray.forEach( (button) => {
        button.addEventListener("click", ()=> {
            calculadora(button, display)
        })
    })
});


function calculadora(button, display) {
    switch (button.innerHTML) {
        case "C":
            borrar(display);
            break;

        case "=":
            calcular(display);
            break;   

        default:
            actualizar(display, button);
            break;  

    }
}


function calcular(display) {
    var resultado = eval(display.value);
    display.value = `${operacion} = ${resultado}`;
    operacion = "";
}

function actualizar(display, button) {
    if (display.value == 0) {
      display.value = "";
    }
    display.value += button.innerHTML;
    operacion += button.innerHTML;
}

function borrar(display) {
    display.value = "";
    operacion = "";
}

// LocalStorage

function iniciar() {
    var btnAgregar = document.querySelector(".button-grabar");
    if (btnAgregar) { // Verifica si btnAgregar no es null
        btnAgregar.addEventListener("click", clickBtnAgregar);
    }
    mostrarNotas();
}

function clickBtnAgregar() {
    var txtNota = document.querySelector(".nota");

    // Verificar si el valor del input no es nulo
    if (txtNota.value.trim() !== "") {
        var notas = [];
        if (localStorage.notas) {
            notas = JSON.parse(localStorage.notas);
        }

        notas.push(txtNota.value);
        localStorage.notas = JSON.stringify(notas);
        mostrarNotas();
    }
}

function mostrarNotas() {
    var divNotas = document.getElementById("divLocalStorage");
    var notas = [];
    if (localStorage.notas) {
        notas = JSON.parse(localStorage.getItem("notas"));
    }

    var html = "";
    for (var nota of notas) {
        html += nota + "<br/>";
    }
    divNotas.innerHTML = html;
}

localStorage.removeItem("notas");

function borrarNotas() {
    localStorage.removeItem("notas");
    mostrarNotas();
};
