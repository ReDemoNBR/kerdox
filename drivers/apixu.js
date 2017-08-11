//external modules
const fetch = require("node-fetch");

//internal modules
const [{SHA3_Hex}, {removeNonDigits, celsiusToKelvin}, {apixu}] = [require("../utils/digester"), require("../utils/number-treatment"), require("../credentials")];

function generateFetchUrl(latitude, longitude){
    return `${apixu.url}/current.json?key=${apixu.key}&q=${latitude},${longitude}`;
}

// apixu requires the following parameters enabled for the key: temp_c, wind_kph, wind_degree, pressure_mb, precip_mm, humidity, cloud, feelslike_c, vis_km


module.exports = (latitude, longitude)=>fetch(generateFetchUrl(latitude, longitude)).then(res=>{
    if(!res.ok) return console.log("!res.ok apixu") || console.log(res) || false;
    return res.json().then(({current: weather})=>{
        let {temp_c, wind_kph, wind_degree, pressure_mb, precip_mm, humidity, cloud, feelslike_c, vis_km} = weather;
        return SHA3_Hex(`${[temp_c,feelslike_c].reduce((a,b)=>`${a}${removeNonDigits(celsiusToKelvin(b))}`,"")}${[wind_kph,wind_degree,pressure_mb,precip_mm,humidity,cloud,vis_km]
            .reduce((a,b)=>`${a}${removeNonDigits(b)}`, "")}`
        );
    });
}).catch(e=>console.log(e) || false);