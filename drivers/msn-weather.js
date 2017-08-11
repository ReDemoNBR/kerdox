//external modules
const [fetch, {parseString: xmlParse}, {promisify}] = [require("node-fetch"), require("xml2js"), require("util")];

//internal modules
const [{SHA3_Hex}, {removeNonDigits, celsiusToKelvin: c2k}, {msnWeather}] = [require("../utils/digester"), require("../utils/number-treatment"), require("../credentials")];


function generateFetchUrl(latitude, longitude){
    return `${msnWeather.url}/?src=outlook&weadegreetype=C&weasearchstr=${latitude},${longitude}`;
}


module.exports = (latitude, longitude)=>fetch(generateFetchUrl(latitude, longitude)).then(res=>{
    if(!res.ok) return console.log("!res.ok msn weather 1") || console.log(res) || false;
    return res.text().then(xml=>promisify(xmlParse)(xml)).then(({weatherdata: {weather: [{current: [{$: weather}], forecast}]}})=>{
        let [{temperature, feelslike, humidity, windspeed}, i, precip] = [weather, 0];
        while(!precip && forecast[i]) precip = forecast[i++].$.precip;
        return SHA3_Hex(`${[temperature,feelslike].reduce((a,b)=>`${a}${removeNonDigits(c2k(b))}`, "")}${[humidity,windspeed,precip].reduce((a,b)=>`${a}${removeNonDigits(b)}`, "")}`);
    });
}).catch(e=>console.log(e) || false);