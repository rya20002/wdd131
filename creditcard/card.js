const form = document.querySelector("#ccForm");
const errorsEl = document.querySelector(".errors");
const cardNumberInput = document.querySelector("#cardNumber");

function displayError(msg) {
  errorsEl.textContent = msg;
}

function onlyDigits(str) {
  return str.replace(/\D/g, "");
}

cardNumberInput.addEventListener("input", () => {
  const digits = onlyDigits(cardNumberInput.value).slice(0, 16);
  const parts = digits.match(/.{1,4}/g) || [];
  cardNumberInput.value = parts.join(" ");
});

function isCardNumberValid(number) {
  return number === "1234123412341234";
}

function isExpired(mm, yy) {
  const m = Number(mm);
  const y = Number(yy);

  if (!Number.isInteger(m) || !Number.isInteger(y)) return true;
  if (m < 1 || m > 12) return true;

  const now = new Date();
  const currentYY = now.getFullYear() % 100;
  const currentMM = now.getMonth() + 1;   

  if (y < currentYY) return true;
  if (y === currentYY && m < currentMM) return true;

  return false;
}

function submitHandler(event) {
  event.preventDefault();
  displayError("");

  let errorMsg = "";

  const cardNum = onlyDigits(document.querySelector("#cardNumber").value);
  if (!/^\d{16}$/.test(cardNum)) {
    errorMsg += "Card number must be 16 digits\n";
  } else if (!isCardNumberValid(cardNum)) {
    errorMsg += "Card number is not valid\n";
  }

  const expMonthRaw = document.querySelector("#month").value.trim();
  const expYearRaw = document.querySelector("#year").value.trim();

  if (!/^\d{2}$/.test(expMonthRaw)) errorMsg += "Expiration month must be 2 digits (MM)\n";
  if (!/^\d{2}$/.test(expYearRaw)) errorMsg += "Expiration year must be 2 digits (YY)\n";

  if (errorMsg === "" && isExpired(expMonthRaw, expYearRaw)) {
    errorMsg += "Card is expired\n";
  }

  if (errorMsg) {
    displayError(errorMsg);
    return;
  }

  form.innerHTML = "<h2>Payment accepted ✅</h2><p>Thanks! Your form was submitted successfully.</p>";
}

form.addEventListener("submit", submitHandler);