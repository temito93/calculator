const number = document.querySelectorAll(".data-number");
const operator = document.querySelectorAll(".data-operator");
const equal = document.querySelector(".data-equals");
const ac = document.querySelector(".data-ac");
const deleteBtn = document.querySelector(".data-delete");
const firstDis = document.querySelector(".data-prev");
const secondDis = document.querySelector(".data-cur");
const neg = document.querySelector(".data-negative");
const sqroot = document.querySelector(".square-root");
const dotN = document.querySelector(".data-number2");

let num1 = "";
let num2 = "";
let result = null;
let lastOperation = "";
let haveDot = false;
let err = "Error";
let negative = false;
let firstClick = true;
let checkNeg = num2.includes("-");
let operationName;

number.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }

    num2 = num2 + e.target.innerText;

    if (num2 && haveDot) {
      secondDis.innerText = num2;
    } else if (num2 && !haveDot) {
      secondDis.innerText = getFromattedNumber(num2);
    }
  });
});

dotN.addEventListener("click", () => {
  if (num2 && !haveDot) {
    haveDot = true;
    num2 = num2 + dotN.innerText;
    secondDis.innerText = num2;
  }

  if (secondDis.innerText == 0 && !haveDot) {
    haveDot = true;
    num2 = 0 + dotN.innerText;
    secondDis.innerText = num2;
  }
});

sqroot.addEventListener("click", (e) => {
  if (num2 && !negative) {
    firstDis.innerText = num2 + sqroot.innerText;
    secondDis.innerText = Math.sqrt(num2);
    num2 = "";
  } else if (num2 && negative) {
    secondDis.innerText = "Error";
  }
});

neg.addEventListener("click", () => {
  if (firstClick && !negative && !checkNeg) {
    if (!checkNeg && !negative) {
      let number2 = secondDis.innerText;
      let number3 = "-";
      num2 = number3 + number2;
      secondDis.innerText = num2;
      console.log("--");
      checkNeg = true;
      negative = true;
    }

    firstClick = false;
  } else {
    if (checkNeg && negative && !firstClick) {
      if (num2.includes("-")) {
        let num3 = num2.slice(1, num2.length);
        negResult = num3;
        secondDis.innerText = num3;
      } else if (!num2.includes("-")) {
        let number2 = secondDis.innerText;
        let number3 = "-";
        num2 = number3 + number2;
        secondDis.innerText = num2;
        firstClick = true;
      }
      negative = false;
      checkNeg = false;
      firstClick = true;
    }
  }
});

operator.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!num2) return;
    haveDot = false;
    operationName = e.target.innerText;

    if (num1 && num2 && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(num2);
    }
    if (dotN) {
      let newNum3 = num2.toString();
      for (let i = newNum3.length - 1; i > newNum3.length - 2; i--) {
        if (newNum3[i] == "." && operationName) {
          let numResult7 = newNum3.substring(0, newNum3.length - 1);
          num2 = numResult7;
        }
      }
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
  secondDis.innerText = getFromattedNumber(result);
}

function mathOperation() {
  let result2;

  if (lastOperation === "*") {
    result2 = parseFloat(result) * parseFloat(num2);
    countValidation(result2, result2);
  } else if (lastOperation === "+") {
    result2 = parseFloat(result) + parseFloat(num2);
    countValidation(result2, result2);
  } else if (lastOperation === "-") {
    result2 = parseFloat(result) - parseFloat(num2);
    countValidation(result2, result2);
  } else if (lastOperation === "÷") {
    result2 = parseFloat(result) / parseFloat(num2);
    countValidation(result2, result2);
  } else if (lastOperation === "^") {
    result2 = parseFloat(result) ^ parseFloat(num2);
    countValidation(result2, result2);
  }
}

function countValidation(x, n) {
  let element = x.toString();
  if (element.length > 10) {
    let newResult = element.split("", 10);
    let newResult2 = newResult.join("");
    return (result = newResult2);
  } else {
    return (result = n);
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
  let numbers2 = secondDis.innerText;
  let result = numbers2.slice(0, -1);
  num2 = result;
  secondDis.innerText = num2;
  if (secondDis.innerText == "") {
    secondDis.innerText = 0;
  }
});

function getFromattedNumber(num) {
  let n = parseFloat(num);
  let value = n.toLocaleString("EN");
  return value;
}
