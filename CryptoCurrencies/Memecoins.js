function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

const coinNames = {
  bitcoin: "Bitcoin",
  ethereum: "Ethereum",
  "shiba-inu": "Shiba Inu",
  cardano: "Cardano",
  solana: "Solana",
};

function handleCoins(text) {
  const json = JSON.parse(text);
  for (const p in json) {
    document.getElementById(p).innerHTML =
      "<div class='cell'>" +
      coinNames[p] +
      "</div>" +
      "<div class='cell price'>" +
      json[p].usd +
      "</div>";
  }
}

httpGetAsync(
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cshiba-inu%2Cethereum%2Ccardano%2Csolana&vs_currencies=usd",
  handleCoins
);
