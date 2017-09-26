//TODO: keep an eye on Magic SeaWeed Weather API for the future
module.exports = {
    accuWeatherDriver: require("./accuweather"),
    aerisDriver: require("./aeris"),
    apixuDriver: require("./apixu"),
    darkSkyDriver: require("./dark-sky"),
    devRandomDriver: require("./dev-random"),
    msnWeatherDriver: require("./msn-weather"),
    openWeatherMapDriver: require("./open-weather-map"),
    weatherBitDriver: require("./weatherbit"),
    weatherUndergroundDriver: require("./weather-underground"),
    worldWeatherOnlineDriver: require("./world-weather-online"),
    yahooWeatherDriver: require("./yahoo-weather"),
    yrNoDriver: require("./yr-no")
};