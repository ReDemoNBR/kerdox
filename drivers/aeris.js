//external modules
const fetch = require("node-fetch");

//internal modules
const [{SHA3_Hex}, {removeNonDigits, celsiusToKelvin}, {aeris}] = [require("../utils/digester"), require("../utils/number-treatment"), require("../credentials")];


function generateFetchUrl(latitude, longitude){
    return `${aeris.url}&clientId=${aeris.clientId}&client_secret=${aeris.clientSecret}&p=${latitude},${longitude}`;
}


module.exports = (latitude, longitude)=>fetch(generateFetchUrl(latitude, longitude)).then(res=>{
    if(!res.ok) return console.log("!res.ok aeris") || console.log(res) || false;
    return res.json().then(weather=>{
        let {tempC, dewpointC, windchillC, heatindexC, pressureMB, altimeterMB, spressureMB, humidity, sky, windSpeedKPH, windDirDEG,
            sunriseISO, sunsetISO, precipMM, solradMW2, light, visibilityKM, ceilingM, snowDepthCM} = weather;
        return SHA3_Hex(`${[tempC,dewpointC,windchillC,heatindexC].reduce((a,b)=>`${a}${celsiusToKelvin(removeNonDigits(b))}`, "")}${[pressureMB,altimeterMB,spressureMB,humidity,
            sky,windSpeedKPH,windDirDEG,sunriseISO,sunsetISO,precipMM,solradMW2,light,visibilityKM,ceilingM,snowDepthCM].reduce((a,b)=>`${a}${removeNonDigits(b)}`, "")}`
        );
    });
}).catch(e=>console.log(e) || false);