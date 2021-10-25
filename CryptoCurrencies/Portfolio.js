const coins = [];

function addCoin() {
  let info = "";
  var select = document.getElementById("coins");
  var text = select.options[select.selectedIndex].text;
  var amount = document.getElementById("amount").value;
  if (amount != 0) {
    coins.push({ coin: text, amount: amount });
    for (let i = 0; i < coins.length; i++) {
      info += "<li>" + coins[i].coin + ": " + coins[i].amount + "</li>";
    }
    document.getElementById("portfolio").innerHTML = info;
    document.getElementById("amount").value = "";
  }
}
