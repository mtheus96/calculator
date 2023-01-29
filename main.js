// pega os elementos do DOM
const input = document.querySelector("input");
const buttons = document.querySelectorAll("button");

// variáveis globais
let firstNumber = null;
let secondNumber = null;
let operator = null;
let tempNumber = "";
let result = null;

// calcula a operação
function operate(first, second, operation) {
    let result = null;
    switch(operation) {
        case "+":
            result = Number(first) + Number(second);
            break;
        case "-":
            result = Number(first) - Number(second);
            break;
        case "*":
            result = Number(first) * Number(second);   
            break;
        case "/":
            result = Number(first) / Number(second); 
            break;
    }
    return result;
}

// adiciona o conteúdo na UI
function addUI(content) {
    input.value = content;
}
// reseta todas as configurações
function clearAll() {
    addUI("");
    firstNumber = null;
    secondNumber = null;
    tempNumber = "";
    operator = null;
    result = null;
}

// percorre todos os botões e adiciona o evento quando o usuário clicar em algum deles
buttons.forEach(e => e.addEventListener("click", (e) => {

    /*  
        Verifica se o botão apertado é um número.
        Se for verifica se o input já tem mais de 15 números, se houver avisa no console.log() e não faz nada.
        Senão armazena o número temporariamente e coloca na UI.
    */
    if(e.target.classList.contains("number")) {
        if(input.value.length >= 15) {
            return console.log("input numbers exceeded.");
        }
        tempNumber += e.target.value;
        addUI(tempNumber);
    }

    /*
        Verifica se o button é um operador.
        se for verifica se é o primeiro operador entrado, caso seja armazena o operador e passa temp
        para o primeiro número e adiciona o número e o operador na UI.

        Se não for o primeiro operador entrado considera que o primeiro numero já está atribuido, armazena o valor de temp 
        como segundo numero, faz a operação, coloca o resultado como primeiro número e coloca o resultado e o operador na UI.
    */
    else if(e.target.classList.contains("op")) {
        if(operator == null) {
            operator = e.target.value;
            firstNumber = tempNumber;
            tempNumber = "";
            addUI(firstNumber + operator);
        }
        else {
            secondNumber = tempNumber;
            result = operate(firstNumber, secondNumber, operator);
            firstNumber = result;
            operator = e.target.value;
            tempNumber = "";
            addUI(firstNumber + operator);
        }
    }

    // Verifica se o botão apertado é o de limpar, caso seja chama a função de resetar.
    else if(e.target.classList.contains("btn-clear")) {
       clearAll();
    }

    // Remove o último número entrado tanto de temp quanto da UI.
    else if(e.target.classList.contains("backspace")) {
        tempNumber = tempNumber.slice(0,-1);
        addUI(input.value.slice(0,-1));
    }

    // Caso o botão seja o de igual, armazena o número digitado e adiciona como segundo número, faz a operação
    // e coloca o resultado na UI.
    else if(e.target.classList.contains("btn-equal")) {
        if(firstNumber != null) {
            secondNumber = tempNumber;
            result = operate(firstNumber, secondNumber, operator);
            addUI("= " + result);

            // debug
            console.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
        }
    }
}));