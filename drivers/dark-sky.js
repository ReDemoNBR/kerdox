//external modules
const fetch = require("node-fetch");

//internal modules
const [{SHA3_Hex}, {removeNonDigits}, {darkSky}] = [require("../utils/digester"), require("../utils/number-treatment"), require("../credentials")];


function generateFetchUrl(latitude, longitude){
    return `${darkSky.url}/${darkSky.key}/${latitude},${longitude}?units=si&exclude=minutely,hourly,daily,alerts,flags`;
}


module.exports = (latitude, longitude)=>fetch(generateFetchUrl(latitude, longitude)).then(res=>{
    if(!res.ok) return console.log("!res.ok darksky") || console.log(res) || false;
    return res.json().then(({currently: weather})=>{
        let {
            precipIntensity,precipProbability,temperature,apparentTemperature,dewPoint,humidity,windSpeed,windGust,windBearing,visibility,cloudCover,pressure,ozone,uvIndex
        } = weather;
        return SHA3_Hex([precipIntensity,precipProbability,temperature,apparentTemperature,dewPoint,humidity,windSpeed,windGust,windBearing,visibility,cloudCover,pressure,
            ozone,uvIndex].reduce((a,b)=>`${a}${removeNonDigits(b)}`, "")
        );
    });
}).catch(e=>console.log(e) || false);