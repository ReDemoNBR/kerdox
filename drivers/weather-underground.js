//external modules
const fetch = require("node-fetch");

//internal modules
const [{SHA3_Hex}, {removeNonDigits, celsiusToKelvin}, {weatherUnderground}] = [require("../utils/digester"), require("../utils/number-treatment"), require("../credentials")];


module.exports = (latitude, longitude)=>fetch(`${weatherUnderground.url}/${weatherUnderground.keyId}/conditions/q/${latitude},${longitude}.json`).then(res=>{
    if(!res.ok) return console.log("!res.ok weather underground") || console.log(res) || false;
    return res.json().then(({current_observation: weather})=>{
        let {temp_c, relative_humidity, wind_degrees, wind_kph, wind_gust_kph, pressure_mb, pressure_trend, dewpoint_c, heat_index_c, windchill_c,
            feelslike_c, visibility_km, solarradiation, UV: uv, precip_today_today_metric: precip} = weather;
        return SHA3_Hex(`${[temp_c,dewpoint_c,heat_index_c,windchill_c,feelslike_c].reduce((a,b)=>`${a}${removeNonDigits(celsiusToKelvin(b))}`,"")}${[relative_humidity,wind_degrees,
            wind_kph,wind_gust_kph,pressure_mb,pressure_trend,visibility_km,solarradiation,uv,precip].reduce((a,b)=>`${a}${removeNonDigits(b)}`, "")}`
        );
    });
}).catch(e=>console.log(e) || false);