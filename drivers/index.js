//DONE:100 convert celsius values to kelvin in all drivers id:13
//DONE:30 implement WorldWeatherOnline Driver id:12
//DONE:0 implement AccuWeather Driver id:14
//DONE:10 implement Apixu Driver id:15
//DONE:40 implement YQL (Yahoo! Query Language) Driver id:16
//DONE:20 implement MSN Weather Driver id:17
//DOING:30 implement DarkSky Driver id:18
//DONE:60 rename AerisWeather to just "Aeris" id:19
//DOING:20 implement /dev/random Driver id:21
//TODO:40 rename YQL to Yahoo Weather
//DOING:0 implement yr.no Driver
//TODO: keep an eye on Magic SeaWeed Weather API for the future
module.exports = {
    accuWeatherDriver: require("./accuweather"),
    aerisDriver: require("./aeris"),
    apixuDriver: require("./apixu"),
    darkSkyDriver: require("./dark-sky"),
    devRandomDriver: require("./dev-random"),
    msnWeatherDriver: require("./msn-weather"),
    openWeatherMapDriver: require("./open-weather-map"),
    weatherUndergroundDriver: require("./weather-underground"),
    worldWeatherOnlineDriver: require("./world-weather-online"),
    yahooWeatherDriver: require("./yahoo-weather"),
    yrNoDriver: require("./yr-no")
};