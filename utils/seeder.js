const [fetch, Const, NumberTreatment, {SHA3_Hex}, BigNumber, storage, credentials] = [require("node-fetch"), require("../constants"), require("./number-treatment"),
        require("./digester"), require("bignumber.js").another(), require("node-persist"), require("../credentials")], DB = require(Const.CITIES_JSON);

BigNumber.config({ERRORS: false});
storage.initSync();
let poolLength = 512;


function genOpenWeatherMapSeed({main, clouds, wind, sys, rain, snow}){
    return SHA3_Hex(convertValues([main.temp_max, main.temp_min, main.temp, main.sea_level, main.pressure, main.grnd_level, main.humidity, clouds.all,
        wind.speed, wind.deg, sys.sunrise, sys.sunset, rain && rain["3h"], snow && snow["3h"]]));
}


function genAerisSeed(weather){
    return SHA3_Hex(convertValuesToKelvinChunk([weather.tempC, weather.dewpointC, weather.windchillC, weather.heatindexC])+convertValues([weather.pressureMB,
        weather.altimeterMB, weather.spressureMB, weather.humidity, weather.sky, weather.windSpeedKPH, weather.windDirDEG, weather.sunriseISO,
        weather.sunsetISO, weather.precipMM, weather.solradMW2, weather.light, weather.visibilityKM, weather.ceilingM, weather.snowDepthCM]));
}


function getCryptoBits(bits=128){
    return require("crypto").randomBytes(bits && (bits/8) >> 0 || 8).toString("hex");
}


function populatePool(){
    let [i, promises] = [5, []];
    let {aerisWeather, openWeatherMap} = credentials;
    while(i--){
        // use OpenSSL to get a random city to get data from
        let rnd = BigNumber(getCryptoBits(), 16).mod(DB.length).toNumber();
        let city = DB[rnd];
        if(!aerisWeather.active && !openWeatherMap.active) getCryptoBits(512);
        aerisWeather.active && promises.push(openWeatherMapSeed(city.id, false));
        openWeatherMap.active && promises.push(aerisSeed(city.lat, city.long, false));
    }
    return Promise.all(promises).then(data=>{
        let newPool = data.filter(a=>a).reduce((a,b)=>`${a}${b}`, "") || getCryptoBits(512);
        storage.setItemSync("pool", `${storage.getItemSync("pool") || ""}${newPool}`);
    });
}


function consumePool(bits=128){
    let [hex, pool] = [bits/4, storage.getItemSync("pool")];
    let data = pool.substring(0, hex);
    storage.setItemSync("pool", pool.substring(hex));
    if(pool.length<poolLength) populatePool();
    return data;
}


function openWeatherMapSeed(id){
    return fetch(`${Const.OPEN_WEATHER_MAP.getFetchUrl()}&id=${id}`).then(res=>{
        if(!res.ok) return console.log("!res.ok") || console.log(res) || false;
        return res.json().then(obj=>genOpenWeatherMapSeed(obj));
    }).catch(e=>console.log(e) || false);
}


function aerisSeed(latitude, longitude){
    return fetch(`${Const.AERIS_WEATHER.getFetchUrl()}&p=${Math.round(latitude*100)/100},${Math.round(longitude*100)/100}`).then(res=>{
        if(!res.ok) return console.log("!res.ok aeris") || console.log(res) || false;
        return res.json().then(weather=>genAerisSeed(weather));
    }).catch(e=>console.log(e) || false);
}


function convertValues(values){
    let chunk = "";
    for(let i=0; i<values.length; i++) chunk += NumberTreatment.removeNonDigits(values[i]);
    return chunk;
}


function convertValuesToKelvinChunk(values){
    let chunk = "";
    for(let i=0; i<values.length; i++) chunk += NumberTreatment.celsiusToKelvin(NumberTreatment.removeNonDigits(values[i]));
    return chunk;
}

function setPoolLength(bitLength){
    return poolLength = Number(bitLength) || poolLength;
}

function getPoolLength(){
    return poolLength;
}


module.exports = {aerisSeed, openWeatherMapSeed, populatePool, consumePool, setPoolLength, getPoolLength};