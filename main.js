// Make a constant variable usd object = currency: USD
const usdObj = {
 style: 'currency',
 currency: 'USD'
};

// Make a value of baseUrl = to the coingecko API
var baseUrl = "https://api.coingecko.com/api/v3";

// Make a value coinPrice = to coins markets link
var coinPrice = "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h";
// The coin price url = to base url + coin price
var coinPriceUrl = baseUrl + coinPrice;

// Make a value globalCrypto = to global link
var globalCrypto = "/global";
// The global url = to base url + global crypto
var globalUrl = baseUrl + globalCrypto;

// Ready the document
$(document).ready(function() {

  // Fetch the global url
  fetch(globalUrl)
    // Then make a function with the result as the argument
    .then(res => {
      // Take the result and convert it to readable json
      // Then make a function with the data as an argument
      res.json().then(data => {

        // Make a variable markets = data markets
        let markets = data.data.markets;
        // Make a variable activeCryptos = formated active cryptocurrencies
        let activeCryptos = new Intl.NumberFormat().format(data.data.active_cryptocurrencies);
        // Make a variable totalMarketCap = total market cap data in usd
        let totalMarketCap = data.data.total_market_cap.usd;

        // Make a variable totalVolume = total volume data in usd
        let totalVolume = data.data.total_volume.usd;
        // Make a variable btcDominance = market market cap percentage of bitcoin
        let btcDominance = data.data.market_cap_percentage.btc.toFixed(1);

        // Make a function upperStats with an id and a value
        function upperStats(id, value) {
          // Replace the html of the id with the value
          $(id).html(value);
        }

        // call the function upperStats with marketsNumb as the id and markets as the value
        upperStats("#marketsNumb", markets);
        // call the function upperStats with activeCryptosNumb as the id and activeCryptos as the value
        upperStats("#activeCryptosNumb", activeCryptos);
        // call the function upperStats with totalMarketCapNumb as the id and totalMarketCap as the value formated to USD
        upperStats("#totalMarketCapNumb", totalMarketCap.toLocaleString("en-US", usdObj));
        // call the function upperStats with totalVolumeNumb as the id and totalVolume as the value formated to USD
        upperStats("#totalVolumeNumb", totalVolume.toLocaleString("en-US", usdObj));
        // call the function upperStats with btcDominanceNumb as the id and btcDominance as the value
        upperStats("#btcDominanceNumb", btcDominance + " " + "%");
      })
    });

  // Fetch the coin price url
  fetch(coinPriceUrl)
    // Then make a function with the result as an argument
    .then(res => {

      // Take the result and convert it to readable json
      // Then make a function with the data as an argument
      res.json().then(data => {

        // Make a variable coinTable = to the id coinTable
        let coinTable = $("#coinTable");

        // Make a function cryptos
        function cryptos() {
          // The loop starts at i and ends at 100
          // every time there is a new loop add 1 to i
          for (let i = 0; i < 100; i++) {

            // Make a variable rank = to the market cap rank
            let rank = data[i].market_cap_rank;

            // Create a new img element
            let logo = new Image();
            // Set the sourse path
            logo.src = data[i].image;

            // Make a variable name = to the name of the coins
            let name = data[i].name;
            // Make a variable priceUsd = to the current price formated into USD
            let priceUsd = data[i].current_price;
            // Make a variable marketCapPrice = to the market cap formated into USD
            let marketCapPrice = data[i].market_cap;
            // Make a variable volumeUsd = to the total volume formated into USD
            let volumeUsd = data[i].total_volume;
            // Make a variable circulatingSupply = to the formated circulating supply
            let circulatingSupply = new Intl.NumberFormat().format(data[i].circulating_supply);
            // Make a variable priceChange24 = to the 24h price change
            let priceChange24 = data[i].price_change_percentage_24h_in_currency.toFixed(2);

            // Append this to the coin table
            coinTable.append(
              // Append this to the table row
              $("<tr></tr>").append(
                // Replace the html of the table data to the rank with the color black
                $("<th></th>").html(rank).css("color", "Black"),
                // Replace the html of the table data to the logo
                $("<td></td>").html(logo),
                // Replace the html of the table data to the name with the color orange
                $("<td></td>").html(name).css("color", "#ff9d00"),
                // Replace the html of the table data to the market cap price formated into english using the usdObj with the color orange
                $("<td></td>").html((marketCapPrice).toLocaleString("en-US", usdObj)).css("color", "#ff9d00"),
                // Replace the html of the table data to the usd price formated into english using the usdObj with the color orange
                $("<td></td>").html((priceUsd).toLocaleString("en-US", usdObj)).css("color", "#ff9d00"),
                // Replace the html of the table data to the usd volume formated into english using the usdObj with the color orange
                $("<td></td>").html((volumeUsd).toLocaleString("en-US", usdObj)).css("color", "#ff9d00"),
                // Replace the html of the table data to the circulating supply with color orange
                $("<td></td>").html(circulatingSupply).css("color", "#ff9d00"),
                // Call function color
                color()
              )
            );

            // Make a function color
            function color() {

              // If the 24h price change < 0
              if(priceChange24 < 0) {
                // Returns the data table with an id color replaced by the html to the 24h price change in red
                return $("<td id=`#color`></td>").html(`${priceChange24} %`).css("color", "#ff9696");
              }
              // else, returns the data table with an id color replaced by the html to the 24h price change in green
              else {
                return $("<td id=`#color`></td>").html(`${priceChange24} %`).css("color", "#78eb81");
              }
            }
          }
        }

        // Call function cryptos
        cryptos();

      })

    })

});
