const BigNumber = require("bignumber.js");


module.exports = {
  AERIS_WEATHER: {
    clientId: "IBZeRWusLOZrSpDJVPFrK",
    clientSecret: "x1tN7jRcXAHODvehnR9Znnc0UhdUau08J3dHfFcI",
    url: "https://api.aerisapi.com/observations/",
    getFetchUrl: function(){return this.url+"?client_id="+this.clientId+"&client_secret="+this.clientSecret;}
  },
  OPEN_WEATHER_MAP: {
    appid: "9e881ec45fdc6dc694f7ed25d593b14a",
    url: "http://api.openweathermap.org/data/2.5/weather",
    getFetchUrl: function(){return this.url+"?APPID="+this.appid;}
  },
  CITIES_JSON: "./cities-essentials.json",
  MAX_BIG: BigNumber("340282366920938463463374607431768211456"),
  MIN_BIG: BigNumber("-340282366920938463463374607431768211456")
}
