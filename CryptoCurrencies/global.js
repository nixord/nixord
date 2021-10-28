let apiUrlGlobal = "https://api.coingecko.com/api/v3/global";
let arrangedGlobal = {
  cryptocurrencies: 0,
  exchanges: 0,
  totalMarketCap: 0,
  dailyVol: 0,
  dominance: { bitcoin: 0, ethereum: 0 },
};

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
  arrangedGlobal.cryptocurrencies = json.data.active_cryptocurrencies;
  arrangedGlobal.exchanges = json.data.markets;
  arrangedGlobal.totalMarketCap = Number(
    json.data.total_market_cap.usd
  ).toLocaleString();
  arrangedGlobal.dailyVol = Number(json.data.total_volume.usd).toLocaleString();
  arrangedGlobal["dominance"].bitcoin = Number(
    json.data.market_cap_percentage.btc
  ).toFixed(1);
  arrangedGlobal["dominance"].ethereum = Number(
    json.data.market_cap_percentage.eth
  ).toFixed(1);
  let globalDivs = document.getElementsByClassName("global-container");
  for (let i = 0; i < globalDivs.length; i++) {
    document.getElementsByClassName("global-container")[i].innerHTML =
      "<div class = 'global-text'>" +
      "Coins: " +
      arrangedGlobal.cryptocurrencies +
      " Exchanges: " +
      arrangedGlobal.exchanges +
      " Market Cap: $" +
      arrangedGlobal.totalMarketCap +
      " 24hs Vol: $" +
      arrangedGlobal.dailyVol +
      " Dominance: BTC: " +
      arrangedGlobal.dominance.bitcoin +
      "% ETH: " +
      arrangedGlobal.dominance.ethereum +
      "%</div>";
    document.getElementsByClassName("global-container")[i].className =
      "global-container global";
  }
}

httpGetAsync(apiUrlGlobal, handleCoins);
