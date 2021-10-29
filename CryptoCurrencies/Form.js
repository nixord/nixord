let creditCardIsChecked = true;

function showCCardForm() {
  creditCardIsChecked = true;
  drawCurrentForm();
}
function showPaypalForm() {
  creditCardIsChecked = false;
  drawCurrentForm();
}

function drawCurrentForm() {
  document.getElementById("credit-card").style =
    "display: " + (creditCardIsChecked ? "block;" : "none;");
  document.getElementById("paypal").style =
    "display: " + (!creditCardIsChecked ? "block;" : "none;");
}

function isCardNameValid(cardName) {
  return /^[A-Za-z\s]+$/.test(cardName);
}

function isCardNumberValid(cardNumber) {
  if (cardNumber.length !== 16) {
    return false;
  }

  return isAllNumbers(cardNumber);
}

function isAllNumbers(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) < 48 || str.charCodeAt(i) > 57) {
      return false;
    }
  }
  return true;
}

function isExpirationValid(monthStr, yearStr) {
  if (monthStr.length !== 2 || yearStr.length !== 4) {
    return false;
  }

  if (!isAllNumbers(monthStr) || !isAllNumbers(yearStr)) {
    return false;
  }
  let month = parseInt(monthStr);
  let year = parseInt(yearStr);
  if (year < new Date().getFullYear()) {
    return false;
  }
  if (month < 1 || month > 12) {
    return false;
  }
  return true;
}

function isCVVValid(cvv) {
  return isAllNumbers(cvv) && cvv.length === 3;
}

function isEmailValid(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function verifyForm() {
  let cardName = document.getElementById("card-name").value;
  let cardNumber = document.getElementById("card-number").value;
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;
  let cvv = document.getElementById("cvv").value;
  let email = document.getElementById("email").value;
  if (creditCardIsChecked) {
    let cardNumberValid = isCardNumberValid(cardNumber);
    let cardNameValid = isCardNameValid(cardName);
    let expirationValid = isExpirationValid(month, year);
    let cvvValid = isCVVValid(cvv);
    document.getElementById("error-number").className = cardNumberValid
      ? "error-text-hidden"
      : "error-text";
    document.getElementById("error-name").className = cardNameValid
      ? "error-text-hidden"
      : "error-text";
    document.getElementById("error-date").className = expirationValid
      ? "error-text-hidden"
      : "error-text";
    document.getElementById("error-cvv").className = cvvValid
      ? "error-text-hidden"
      : "error-text";
    if (cardNumberValid && cardNameValid && expirationValid && cvvValid) {
      self.location = "success_payment.html";
    }
  } else {
    let emailValid = isEmailValid(email);
    document.getElementById("error-email").className = emailValid
      ? "error-text-hidden"
      : "error-text";
    if (emailValid) {
      self.location = "success_payment.html";
    }
  }
}
drawCurrentForm();
