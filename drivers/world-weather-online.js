//external modules
const fetch = require("node-fetch");

//internal modules
const [{SHA3_Hex}, {removeNonDigits, celsiusToKelvin}, {worldWeatherOnline}] = [require("../utils/digester"), require("../utils/number-treatment"), require("../credentials")];

const standardParams = "format=json&num_of_days=0&mca=no&fx24=no&tp=24";

function generateFetchUrl(latitude, longitude){
    return `${worldWeatherOnline.url}/${worldWeatherOnline.premium && "premium" || "free"}/v1/weather.ashx?key=${worldWeatherOnline.key}&q=${latitude},${longitude}&${standardParams}`;
}

module.exports = (latitude, longitude)=>fetch(generateFetchUrl(latitude, longitude)).then(res=>{
    if(!res.ok) return console.log("!res.ok world weather online") || console.log(res) || false;
    return res.json().then(({data: {current_condition: [current], weather: [{astronomy: [astronomy], uvIndex, totalSnow_cm, hourly: [extra]}]}})=>{
        let [
            {FeelsLikeC, cloudCover, humidity, precipMM, pressure, temp_C, visibility, winddirDegree, windspeedKmph},
            {sunrise, sunset, moonrise, moonset},
            {DewPointC, HeatIndex, WindChillC, WindGustKmph}
        ] = [current, astronomy, extra];
        return SHA3_Hex(`${[FeelsLikeC,temp_C,DewPointC,HeatIndex,WindChillC].reduce((a,b)=>`${a}${removeNonDigits(celsiusToKelvin(b))}`, "")}${[cloudCover,humidity,precipMM,pressure,
            visibility,winddirDegree,windspeedKmph,sunrise,sunset,moonrise,moonset,WindGustKmph,uvIndex,totalSnow_cm].reduce((a,b)=>`${a}${removeNonDigits(b)}`, "")}`
        );
    });
}).catch(e=>console.log(e) || false);