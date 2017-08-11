//external modules
const [fetch, {parseString: xmlParse}, {promisify}] = [require("node-fetch"), require("xml2js"), require("util")];

//internal modules
const [{SHA3_Hex}, {removeNonDigits, celsiusToKelvin: c2k, metersPerSecToKilometersPerHour: mpsToKmh}, {yrNo}] = [
    require("../utils/digester"), require("../utils/number-treatment"), require("../credentials")
];


function generateFetchUrl(latitude, longitude){
    return `${yrNo.url}/?lat=${latitude};lon=${longitude}`;
}


module.exports = (latitude, longitude)=>fetch(generateFetchUrl(latitude, longitude)).then(res=>{
    if(!res.ok) return console.log("!res.ok yr-no") || console.log(res) || false;
    return res.text().then(xml=>promisify(xmlParse)(xml)).then(({weatherdata: {product: [{time: [{location: [weather]}]}]}})=>{
        let {
            temperature: [{$: {value: temperature}}],
            windDirection: [{$: {deg: windDir}}],
            windSpeed: [{$: {mps: windSpeed}}],
            humidity: [{$: {value: humidity}}],
            pressure: [{$: {value: pressure}}],
            cloudiness: [{$: {percent: cloudiness}}],
            fog: [{$: {percent: fog}}],
            lowClouds: [{$: {percent: lowClouds}}],
            mediumClouds: [{$: {percent: medClouds}}],
            highClouds: [{$: {percent: highClouds}}],
            dewpointTemperature: [{$: {value: dewPoint}}]
        } = weather;
        return SHA3_Hex(`${[temperature,dewPoint].reduce((a,b)=>`${a}${removeNonDigits(c2k(b))}`, "")}${[windDir,humidity,pressure,cloudiness,fog,lowClouds,medClouds,highClouds]
            .reduce((a,b)=>`${a}${removeNonDigits(b)}`, "")}${mpsToKmh(windSpeed)}`
        );
    });
}).catch(e=>console.log(e) || false);