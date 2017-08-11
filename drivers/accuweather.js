//external modules
const fetch = require("node-fetch");

//internal modules
const [{SHA3_Hex}, {removeNonDigits, celsiusToKelvin}, {accuWeather}] = [require("../utils/digester"), require("../utils/number-treatment"), require("../credentials")];


function generateFetchKeyUrl(latitude, longitude){
    return `${accuWeather.url}/locations/v1/cities/geoposition/search?apikey=${accuWeather.apiKey}&q=${latitude},${longitude}`;
}

function generateFetchUrl(Key){
    return `${accuWeather.url}/currentcondition/v1/${Key}?apikey=${accuWeather.apiKey}&details=true`;
}

module.exports = (latitude, longitude)=>fetch(generateFetchKeyUrl(latitude, longitude)).then(res=>{
    if(!res.ok) return console.log("!res.ok accuweather 1") || console.log(res) || false;
    return res.json().then(({Key: key})=>key && fetch(generateFetchUrl(key) || new Promise((res, rej)=>rej())).then(res=>{
        if(!res || !res.ok) return console.log("!res.ok accuweather 2") || console.log(res) || false;
        return res.json().then(([weather])=>{
            let {
                Temperature: {Metric: {Value: temp}},
                RealFeelTemperature: {Metric: {Value: realFeelTemp}},
                RealFeelTemperatureShade: {Metric: {Value: realFeelTempShade}},
                RelativeHumidity: humidity,
                DewPoint: {Metric: {Value: dewPoint}},
                Wind: {Direction: {Degrees: windDirection}, Speed: {Metric: {Value: windSpeed}}},
                WindGust: {Speed: {Metric: {Value: windGustSpeed}}},
                UVIndex,
                Visibility: {Metric: {Value: visibility}},
                CloudCover: cloudCover,
                Ceiling: {Metric: {Value: ceiling}},
                Pressure: {Metric: {Value: pressure}},
                ApparentTemperature: {Metric: {Value: apparentTemp}},
                WindChillTemperature: {Metric: {Value: windChillTemp}},
                WetBulbTemperature: {Metric: {Value: wetBulbTemp}},
                PrecipitationSummary: {Past3Hours: {Metric: {Value: precip}}}
            } = weather;
            return SHA3_Hex(`${[temp,realFeelTemp,realFeelTempShade,dewPoint,apparentTemp,windChillTemp,wetBulbTemp].reduce((a,b)=>`${a}${removeNonDigits(celsiusToKelvin(b))
            }`, "")}${[humidity,windDirection,windSpeed,windGustSpeed,UVIndex,visibility,cloudCover,ceiling,pressure,precip].reduce((a, b)=>`${a}${removeNonDigits(b)}`, "")}`);
        });
    }) || false);
}).catch(e=>console.log(e) || false);