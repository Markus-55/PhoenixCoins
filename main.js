let BASE_URL = "https://api.coingecko.com/api/v3";
let PRICE = "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

let url = BASE_URL + PRICE;

$(document).ready(function() {

  fetch(url)
  .then(res => {

    res.json().then(data => {
      $("#price").html(data)
      console.log(data);
    })
})

});
