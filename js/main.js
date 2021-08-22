const number = document.querySelectorAll(".data-number");
const operator = document.querySelectorAll(".data-operator");
const equal = document.querySelector(".data-equals");
const ac = document.querySelector(".data-ac");
const deleteBtn = document.querySelector(".data-delete");
const firstDis = document.querySelector(".data-prev");
const secondDis = document.querySelector(".data-cur");

let num1 = "";
let num2 = "";
let result = null;
let lastOperation = "";
let haveDot = false;

number.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    num2 += e.target.innerText;
    secondDis.innerText = num2;
  });
});

operator.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!num2) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (num1 && num2 && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(num2);
    }
    clear(operationName);
    lastOperation = operationName;
    console.log(result);
  });
});

function clear(operationName = "") {
  num1 += num2 + " " + operationName + " ";
  firstDis.innerText = num1;
  secondDis.innerText = "";
  num2 = "";
  secondDis.innerText = result;
}

function mathOperation() {
  if (lastOperation === "*") {
    result = parseFloat(result) * parseFloat(num2);
  }
}
