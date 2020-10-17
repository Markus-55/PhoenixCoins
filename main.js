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

  // Fetch the coin price url
  fetch(coinPriceUrl)
    // Then make a function with the result as an argument
    .then(res => {

      // Take the result and convert it to readable json
      // Then make a function with the data as an argument
      res.json().then(data => {

        // Make a constant variable coinTable = to the id coinTable
        const coinTable = $("#coinTable");

        // Make a function with the id and value as an argument
        function cryptos() {
          // The loop starts at i and ends at the maximum length of data
          for (let i = 0; i < 100; i++) {

            // Make a constant variable rank = to the market cap rank
            const rank = data[i].market_cap_rank;

            // Create a new img element
            let logo = new Image();
            // Set the sourse path
            logo.src = data[i].image;

            // Make a constant variable name = to the name
            const name = data[i].name;
            // Make a constant variable priceUsd = to the current price formated into USD
            const priceUsd = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(data[i].current_price);
            // Make a constant variable marketCapPrice = to the market cap formated into USD
            const marketCapPrice = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(data[i].market_cap);
            // Make a constant variable volumeUsd = to the total volume formated into USD
            const volumeUsd = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(data[i].total_volume);
            // Make a constant variable circulatingSupply = to the circulating supply
            const circulatingSupply = new Intl.NumberFormat().format(data[i].circulating_supply);
            // Make a constant variable priceChange24 = to the 24h price change
            const priceChange24 = data[i].price_change_24h;

            // Append this to the coin table
            coinTable.append(
              // Append this to the table row
              $("<tr></tr>").append(
                // Replace the html of the table data to the rank
                $("<td></td>").html(rank),
                // Replace the html of the table data to the logo
                $("<td></td>").html(logo),
                // Replace the html of the table data to the name
                $("<td></td>").html(name),
                // Replace the html of the table data to the market cap price
                $("<td></td>").html(marketCapPrice),
                // Replace the html of the table data to the usd price
                $("<td></td>").html(priceUsd),
                // Replace the html of the table data to the usd volume
                $("<td></td>").html(volumeUsd),
                // Replace the html of the table data to the circulating supply
                $("<td></td>").html(circulatingSupply),
                // Replace the html of the table data to the 24h price change
                $("<td></td>").html(priceChange24)
              )
            );
          }
        }

        // Call function cryptos
        cryptos();

      })

    })

    // Fetch the global url
    fetch(globalUrl)
      // Then make a function with the result as the argument
      .then(res => {
        // Take the result and convert it to readable json
        // Then make a finction with the data as the argument
        res.json().then(data => {

          // The constant variable totalMarketCap = total market cap data in usd formated to usd
          const totalMarketCap = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(data.data.total_market_cap.usd);
          // The constant variable markets = data markets
          const markets = data.data.markets;
          // The constant variable totalVolume = total volume data in usd formated to usd
          const totalVolume = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(data.data.total_volume.usd);
          // The constant variable btcDominance = market market cap percentage of bitcoin
          let btcDominance = data.data.market_cap_percentage.btc.toFixed(1);

          // Replace the html of the id totalMarketCap with the total market cap
          $("#totalMarketCap").html("Market Cap:" + " " + totalMarketCap);
          // Replace the html of the id markets with the markets
          $("#markets").html("Markets:" + " " + markets);
          // Replace the html of the id totalVolume with the total volume
          $("#totalVolume").html("Volume:" + " " + totalVolume);
          // Replace the html of the id btcDominance with the market cap percentage of bitcoin
          $("#btcDominance").html("BTC Dominance:" + " " + btcDominance + "%");

        })
      })

});
