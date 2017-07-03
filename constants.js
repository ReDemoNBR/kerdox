const BigNumber = require("bignumber.js").another();
const credentials = require("./credentials");

BigNumber.config({ERRORS: false, EXPONENTIAL_AT: 100});


module.exports = {
    AERIS_WEATHER: {getFetchUrl: ()=>`${credentials.aerisWeather.url}&client_id=${credentials.aerisWeather.clientId}&client_secret=${credentials.aerisWeather.clientSecret}`},
    CITIES_JSON: "../static/cities-essentials-min.json",
    MAX_BIG: BigNumber("340282366920938463463374607431768211456", 10), // 2**128
    MIN_BIG: BigNumber("-340282366920938463463374607431768211456", 10),// -2**128
    MAX_BIG_256: BigNumber("115792089237316195423570985008687907853269984665640564039457584007913129639936", 10), // 2**256
    MIN_BIG_256: BigNumber("-115792089237316195423570985008687907853269984665640564039457584007913129639936", 10), // -2**256
    OPEN_WEATHER_MAP: {getFetchUrl: ()=>`${credentials.openWeatherMap.url}?APPID=${credentials.openWeatherMap.appId}`}
};
