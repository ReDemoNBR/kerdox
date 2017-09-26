//external modules
const [BigNumber, storage, {resolve}, {readFileSync}] = [require("bignumber.js").another(), require("node-persist"), require("path"), require("fs")];

//internal modules
const [Const, credentials] = [require("../constants"), require("../credentials")];


//drivers
const [{
    accuWeatherDriver, aerisDriver, apixuDriver, darkSkyDriver, devRandomDriver, msnWeatherDriver, openWeatherMapDriver,
    weatherBitDriver, weatherUndergroundDriver, worldWeatherOnlineDriver, yahooWeatherDriver, yrNoDriver
}, {
    accuWeather, aeris, apixu, darkSky, devRandom, msnWeather, openWeatherMap,
    weatherBit, weatherUnderground, worldWeatherOnline, yahooWeather, yrNo
}] = [require("../drivers"), credentials];


BigNumber.config({ERRORS: false});
storage.initSync();
let [poolLength, populatePoolCalls, populating, DB] = [1024, 5, false];
loadCitiesJSON();


function getCryptoBits(bits=128){
    return require("crypto").randomBytes(bits && (Number(bits)/8) >> 0 || 8).toString("hex");
}


function loadCitiesJSON(){
    DB = JSON.parse(readFileSync(resolve(__dirname, Const.CITIES_JSON)));
}


function allDisabled(){
    return Object.values(credentials).every(api=>!api.active);
}


function populatePool(){
    if(populating) return;
    populating = true;
    let [i, promises] = [populatePoolCalls, []];
    while(i--){
        // use OpenSSL to get a random city to get data from
        let {lat, lon} = DB[BigNumber(getCryptoBits(), 16).mod(DB.length).toNumber()];
        if(allDisabled()) getCryptoBits(512);
        else{
            accuWeather.active && promises.push(accuWeatherDriver(lat, lon));
            aeris.active && promises.push(aerisDriver(lat, lon));
            apixu.active && promises.push(apixuDriver(lat, lon));
            darkSky.active && promises.push(darkSkyDriver(lat, lon));
            devRandom.active && promises.push(devRandomDriver());
            msnWeather.active && promises.push(msnWeatherDriver(lat, lon));
            openWeatherMap.active && promises.push(openWeatherMapDriver(lat, lon));
            weatherBit.active && promises.push(weatherBitDriver(lat, lon));
            weatherUnderground.active && promises.push(weatherUndergroundDriver(lat, lon));
            worldWeatherOnline.active && promises.push(worldWeatherOnlineDriver(lat, lon));
            yahooWeather.active && promises.push(yahooWeatherDriver(lat, lon));
            yrNo.active && promises.push(yrNoDriver(lat, lon));
        }
        //TODO:60 Seek for more free Weather APIs [INFINITE ] id:4
    }
    return Promise.all(promises).then(data=>{
        let newPool = data.filter(a=>a).reduce((a,b)=>`${a}${b}`, "") || getCryptoBits(512);
        return storage.getItem("pool").then(pool=>storage.setItem("pool", `${pool || ""}${newPool}`)).then(()=>populating = false);
    }).catch(e=>{
        console.log("storage error", e);
        populating = false;
    });
}


function consumePool(bits=128){
    let [hex, pool] = [bits/4, storage.getItemSync("pool")];
    let data = pool.substring(0, hex);
    storage.setItemSync("pool", pool.substring(hex));
    if(pool.length<poolLength) populatePool();
    return data;
}


function setPoolLength(bitLength){
    return poolLength = Number(bitLength) || poolLength;
}


function getPoolLength(){
    return poolLength;
}


function getPopulatePoolCalls(){
    return populatePoolCalls;
}

function setPopulatePoolCalls(value=5){
    return populatePoolCalls = Math.abs(value);
}


module.exports = {populatePool, consumePool, setPoolLength, getPoolLength, getPopulatePoolCalls, setPopulatePoolCalls};