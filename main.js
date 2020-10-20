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
      // Then make a finction with the data as the argument
      res.json().then(data => {

        // Make a variable markets = data markets
        var markets = data.data.markets;
        // Make a variable activeCryptos = active cryptocurrencies
        var activeCryptos = new Intl.NumberFormat().format(data.data.active_cryptocurrencies);
        // Make a variable totalMarketCap = total market cap data in usd formated to usd
        var totalMarketCap = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(data.data.total_market_cap.usd);
        // Make a variable totalVolume = total volume data in usd formated to usd
        var totalVolume = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(data.data.total_volume.usd);
        // Make a variable btcDominance = market market cap percentage of bitcoin
        var btcDominance = data.data.market_cap_percentage.btc.toFixed(1);

        // Replace the html of the id marketsNumb with the markets
        $("#marketsNumb").html(markets);
        // Replace the html of the id activeCryptosNumb with the Active Cryptocurrencies
        $("#activeCryptosNumb").html(activeCryptos)
        // Replace the html of the id totalMarketCapNumb with the total market cap
        $("#totalMarketCapNumb").html(totalMarketCap);
        // Replace the html of the id totalVolumeNumb with the total volume
        $("#totalVolumeNumb").html(totalVolume);
        // Replace the html of the id btcDominanceNumb with the market cap percentage of bitcoin
        $("#btcDominanceNumb").html(`${btcDominance} %`);
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
        var coinTable = $("#coinTable");

        // Make a function with the id and value as an argument
        function cryptos() {
          // The loop starts at i and ends at the maximum length of data
          for (let i = 0; i < 100; i++) {

            // Make a variable rank = to the market cap rank
            var rank = data[i].market_cap_rank;

            // Create a new img element
            var logo = new Image();
            // Set the sourse path
            logo.src = data[i].image;

            // Make a variable name = to the name
            var name = data[i].name;
            // Make a variable priceUsd = to the current price formated into USD
            var priceUsd = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(data[i].current_price);
            // Make a variable marketCapPrice = to the market cap formated into USD
            var marketCapPrice = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(data[i].market_cap);
            // Make a variable volumeUsd = to the total volume formated into USD
            var volumeUsd = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(data[i].total_volume);
            // Make a variable circulatingSupply = to the circulating supply
            var circulatingSupply = new Intl.NumberFormat().format(data[i].circulating_supply);
            // Make a variable priceChange24 = to the 24h price change
            var priceChange24 = data[i].price_change_percentage_24h_in_currency.toFixed(2);

            // Append this to the coin table
            coinTable.append(
              // Append this to the table row
              $("<tr></tr>").append(
                // Replace the html of the table data to the rank
                $("<th></th>").html(rank).css("color", "Black"),
                // Replace the html of the table data to the logo
                $("<td></td>").html(logo),
                // Replace the html of the table data to the name with color orange
                $("<td></td>").html(name).css("color", "#ff9d00"),
                // Replace the html of the table data to the market cap price with color orange
                $("<td></td>").html(marketCapPrice).css("color", "#ff9d00"),
                // Replace the html of the table data to the usd price with color orange
                $("<td></td>").html(priceUsd).css("color", "#ff9d00"),
                // Replace the html of the table data to the usd volume with color orange
                $("<td></td>").html(volumeUsd).css("color", "#ff9d00"),
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
