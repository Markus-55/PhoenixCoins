const usdObj = {
 style: 'currency',
 currency: 'USD'
};
var baseUrl = "https://api.coingecko.com/api/v3";

var coinPrice = "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h";
var coinPriceUrl = baseUrl + coinPrice;

var globalCrypto = "/global";
var globalUrl = baseUrl + globalCrypto;

$(document).ready(function() {

  fetch(globalUrl)
    .then(res => {
      res.json().then(data => {
        let markets = data.data.markets;
        let activeCryptos = new Intl.NumberFormat().format(data.data.active_cryptocurrencies);
        let totalMarketCap = data.data.total_market_cap.usd;

        let totalVolume = data.data.total_volume.usd;
        let btcDominance = data.data.market_cap_percentage.btc.toFixed(1);

        function upperStats(id, value) {
          $(id).html(value);
        }

        upperStats("#marketsNumb", markets);
        upperStats("#activeCryptosNumb", activeCryptos);
        upperStats("#totalMarketCapNumb", totalMarketCap.toLocaleString("en-US", usdObj));
        upperStats("#totalVolumeNumb", totalVolume.toLocaleString("en-US", usdObj));
        upperStats("#btcDominanceNumb", btcDominance + " " + "%");
      })
    });

  fetch(coinPriceUrl)
    .then(res => {
      res.json().then(data => {
        let coinTable = $("#coinTable");

        function cryptos() {
          for (let i = 0; i < 100; i++) {
            let rank = data[i].market_cap_rank;
            logo.src = data[i].image;
            let name = data[i].name;
            let priceUsd = data[i].current_price;
            let marketCapPrice = data[i].market_cap;
            let volumeUsd = data[i].total_volume;
            let circulatingSupply = new Intl.NumberFormat().format(data[i].circulating_supply);
            let priceChange24 = new Intl.NumberFormat().format(data[i].price_change_percentage_24h_in_currency);

            coinTable.append(
              $("<tr></tr>").append(
                $("<th></th>").html(rank).css("color", "Black"),
                $("<td></td>").html(logo),
                $("<td></td>").html(name).css("color", "#ff9d00"),
                $("<td></td>").html((marketCapPrice).toLocaleString("en-US", usdObj)).css("color", "#ff9d00"),
                $("<td></td>").html((priceUsd).toLocaleString("en-US", usdObj)).css("color", "#ff9d00"),
                $("<td></td>").html((volumeUsd).toLocaleString("en-US", usdObj)).css("color", "#ff9d00"),
                $("<td></td>").html(circulatingSupply).css("color", "#ff9d00"),
                color()
              )
            );

            function color() {
              if(priceChange24 < 0) {
                return $("<td id=`#color`></td>").html(`${priceChange24} %`).css("color", "#ff9696");
              }
              else {
                return $("<td id=`#color`></td>").html(`${priceChange24} %`).css("color", "#78eb81");
              }
            }
          }
        }
        cryptos();
      })
    })
});
