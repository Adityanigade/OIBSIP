const display = document.getElementById("display");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const backBtn = document.querySelector(".back");
const decimal = document.querySelector(".decimal");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = null;

numbers.forEach(button => {

    button.addEventListener("click", () => {

        if(operator === ""){

            firstNumber += button.textContent;
            display.value = firstNumber;

        }else{

            secondNumber += button.textContent;
            display.value = firstNumber + " " + operator + " " + secondNumber;

        }

    });

});

decimal.addEventListener("click", () => {

    if(operator === ""){

        if(!firstNumber.includes(".")){

            if(firstNumber==="") firstNumber="0";

            firstNumber += ".";

            display.value = firstNumber;

        }

    }else{

        if(!secondNumber.includes(".")){

            if(secondNumber==="") secondNumber="0";

            secondNumber += ".";

            display.value = firstNumber + " " + operator + " " + secondNumber;

        }

    }

});

operators.forEach(button => {

    button.addEventListener("click", () => {

        if(firstNumber === "")
            return;

        if(operator !== "" && secondNumber !== ""){

            calculate();

        }

        operator = button.textContent;

        display.value = firstNumber + " " + operator;

    });

});

equal.addEventListener("click", () => {

    if(firstNumber !== "" && secondNumber !== "" && operator !== ""){

        calculate();

        operator = "";

    }

});

clearBtn.addEventListener("click", () => {

    firstNumber = "";
    secondNumber = "";
    operator = "";
    result = null;

    display.value = "";

});

backBtn.addEventListener("click", () => {

    if(secondNumber !== ""){

        secondNumber = secondNumber.slice(0,-1);

    }else if(operator !== ""){

        operator = "";

    }else{

        firstNumber = firstNumber.slice(0,-1);

    }

    let text = firstNumber;

    if(operator !== "")
        text += " " + operator;

    if(secondNumber !== "")
        text += " " + secondNumber;

    display.value = text;

});

function calculate(){

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    switch(operator){

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "×":
            result = num1 * num2;
            break;

        case "÷":

            if(num2 === 0){

                display.value = "Cannot divide by zero";

                firstNumber = "";
                secondNumber = "";
                operator = "";

                return;

            }

            result = num1 / num2;
            break;

    }

    result = Number(result.toFixed(10));

    display.value = result;

    firstNumber = result.toString();

    secondNumber = "";

}