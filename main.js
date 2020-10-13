// Make the value of url = the coingecko API
let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h";

// Ready the document
$(document).ready(function() {

  // Fetch the document
  fetch(url)
    // Then make a function with the result as an argument
    .then(res => {

      // Take the result and convert it to readable json
      // Then make a function with the data as an argument
      res.json().then(data => {

        // The value of index is = 0
        var index = 0;
        // The value of rank is = to the data index market cap rank
        var rank = data[index].market_cap_rank;
        // // The value of name is = to the data index name
        var name = data[index].name;
        // The value of mark cap is = to the data index market cap
        var market_cap = data[index].market_cap;
        // The value of price is = to the data index current price
        var price = data[index].current_price;
        // The value of volume 24 is = to the data index market total volume
        var volume_24 = data[index].total_volume;
        // The value of circulating supply is = to the data index circulating supply
        var circulating_supply = data[index].circulating_supply;
        // The value of change 24 is = to the data index price change 24h
        var change_24 = data[index].price_change_24h;

        var table_row = $("#table_row");

        // Make a function with the id and value as an argument
        function cryptos(id, value) {

          // The loop starts at i and ends at the maximum length of data
          for (var i = 0; i < data.length; i++) {
            // Index+1
            index++;
            // Replace the html of the id to the value
            $(id).html(value);
          }
        }

        cryptos("#rank", rank);
        cryptos("#name", name);
        cryptos("#market_cap", market_cap);
        cryptos("#price", price);
        cryptos("#volume_24", volume_24);
        cryptos("#circulating_supply", circulating_supply);
        cryptos("#change_24", change_24);

        console.log(data);

      })

    })

});
