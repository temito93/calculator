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
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(num2);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(num2);
  } else if (lastOperation === "÷") {
    result = parseFloat(result) / parseFloat(num2);
  }
}

equal.addEventListener("click", (e) => {
  if (!num1 || !num2) {
    return;
  }
  haveDot = false;
  mathOperation();
  clear();
  num1 = "";
  num2 = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButton(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    clickOperation(e.key);
  } else if (e.key == "Enter" || e.key == "=") {
    equal.click();
  }
});

function clickButton(key) {
  number.forEach((e) => {
    if (e.innerText === key) {
      e.click();
    }
  });
}
function clickOperation(key) {
  operator.forEach((e) => {
    if (e.innerText === key) {
      e.click();
    }
  });
}

ac.addEventListener("click", () => {
  num1 = "";
  num2 = "";
  lastOperation = "";
  firstDis.innerText = "";
  secondDis.innerText = 0;
});

deleteBtn.addEventListener("click", () => {
  let numbers2 = secondDis.innerText.toString();
  let result = numbers2.slice(0, -1);
  num2 = result;
  secondDis.innerText = result;
  if (secondDis.innerText == "") {
    secondDis.innerText = 0;
  }
});
