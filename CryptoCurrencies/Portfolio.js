const coins = [];
const prices = {};
const apiUrl =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cshiba-inu%2Cethereum%2Ccardano%2Csolana&vs_currencies=usd";

function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

function handleCoins(text) {
  const json = JSON.parse(text);
  for (const p in json) {
    prices[p] = json[p].usd;
  }
}

function addCoin() {
  var select = document.getElementById("coins");
  var text = select.options[select.selectedIndex].text;
  var amount = document.getElementById("amount").value;
  var id = select.options[select.selectedIndex].value;
  if (amount != 0) {
    coins.push({ coin: text, amount: Number(amount), id: id });
    drawList();
  }
  updateTotal();
}

function updateTotal() {
  let total = 0;
  for (let i = 0; i < coins.length; i++) {
    total += prices[coins[i].id] * coins[i].amount;
  }
  document.getElementById("total").innerText =
    "You have $" + total.toLocaleString();
}

function drawList() {
  let info = "";
  for (let i = 0; i < coins.length; i++) {
    info +=
      "<li>" +
      coins[i].coin +
      ": " +
      coins[i].amount.toLocaleString() +
      "  Subtotal: $" +
      (prices[coins[i].id] * coins[i].amount).toLocaleString() +
      "</li>";
  }
  document.getElementById("portfolio").innerHTML = info;
  document.getElementById("amount").value = "";
}

function checkCoin() {
  return coins.filter((e) => e.text);
}

httpGetAsync(apiUrl, handleCoins);
