const BigNumber = require("bignumber.js").another();
BigNumber.config({ERRORS: false, EXPONENTIAL_AT: 100})


module.exports = {
  AERIS_WEATHER: {
    clientId: "IBZeRWusLOZrSpDJVPFrK",
    clientSecret: "x1tN7jRcXAHODvehnR9Znnc0UhdUau08J3dHfFcI",
    url: "https://api.aerisapi.com/observations/",
    getFetchUrl: function(){return this.url+"?client_id="+this.clientId+"&client_secret="+this.clientSecret;}
  },
  CITIES_JSON: "../static/cities-essentials-min.json",
  MAX_BIG: BigNumber("340282366920938463463374607431768211456", 10),
  MIN_BIG: BigNumber("-340282366920938463463374607431768211456", 10),
  MAX_BIG_256: BigNumber("115792089237316195423570985008687907853269984665640564039457584007913129639936", 10),
  MIN_BIG_256: BigNumber("-115792089237316195423570985008687907853269984665640564039457584007913129639936", 10),
  OPEN_WEATHER_MAP: {
    appid: "9e881ec45fdc6dc694f7ed25d593b14a",
    url: "http://api.openweathermap.org/data/2.5/weather",
    getFetchUrl: function(){return this.url+"?APPID="+this.appid;}
  }
}
