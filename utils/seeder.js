const [fetch, Const, NumberTreatment, {SHA3_Hex}, BigNumber, storage] = [require("node-fetch"), require("../constants"), require("./number-treatment"),
      require("./digester"), require("bignumber.js").another(), require("node-persist")], DB = require(Const.CITIES_JSON);
BigNumber.config({ERRORS: false});
storage.initSync();
let poolLength = 512;


/*async function openWeatherMapSeed(id, sync=true){
  if(sync){
    try{
      let res = await fetch(`${Const.OPEN_WEATHER_MAP.getFetchUrl()}&id=${id}`);
      // let res = await fetch("https://script.google.com/macros/s/AKfycbwL7RIptTjOcXnNlhoCQOQNRA_nE9qcKsVgS06pPi9e3xZszc9V/exec?format=unix");
      if(!res.ok) return false;
      let json = await res.json();
      // let json = await res.text();
      if(!json.success) return false;
      return genOpenWeatherMapSeed(json.response[0].ob);
      // return SHA3_Hex(json);
    }catch(e){return false;};
  }
  else return fetch(`${Const.OPEN_WEATHER_MAP.getFetchUrl()}&id=${id}`).then(res=>{
    if(!res.ok) return console.log(res) || false;
    return res.json().then(obj=>genOpenWeatherMapSeed(obj));
  }).catch(e=>console.log("OPEN WEATHER MAP") || console.log(e));;
  // else fetch("https://script.google.com/macros/s/AKfycbwL7RIptTjOcXnNlhoCQOQNRA_nE9qcKsVgS06pPi9e3xZszc9V/exec?format=unix").then(res=>res.ok && res.text()
  //   .then(text=>storage.setItemSync("pool", pool+=SHA3_Hex(text)))
  // );
}*/


function genOpenWeatherMapSeed({main, clouds, wind, sys, rain, snow}){
  return SHA3_Hex(convertValues([main.temp_max, main.temp_min, main.temp, main.sea_level, main.pressure, main.grnd_level, main.humidity, clouds.all,
    wind.speed, wind.deg, sys.sunrise, sys.sunset, rain && rain["3h"], snow && snow["3h"]]));
}


/*async function aerisSeed(latitude, longitude, sync=true){
  const round = Math.round;
  if(sync){
    try{
      let res = await fetch(`${Const.AERIS_WEATHER.getFetchUrl()}&p=${round(latitude*100)/100},${round(longitude*100)/100}`);
      // let res = await fetch("https://script.google.com/macros/s/AKfycbwL7RIptTjOcXnNlhoCQOQNRA_nE9qcKsVgS06pPi9e3xZszc9V/exec?format=iso");
      if(!res.ok) return false;
      let json = await res.json();
      // let text = await res.text();
      return genAerisSeed(json);
      // return SHA3_Hex(text);
    }catch(e){return false;};
  }
  else return fetch(`${Const.AERIS_WEATHER.getFetchUrl()}&p=${round(latitude*100)/100},${round(longitude*100)/100}`).then(res=>{
    if(!res.ok) return console.log(res) || false;
    return res.json().then(obj=>genAerisSeed(obj));
  }).catch(e=>console.log("AERISSEED") || console.log(e));
  // else fetch("https://script.google.com/macros/s/AKfycbwL7RIptTjOcXnNlhoCQOQNRA_nE9qcKsVgS06pPi9e3xZszc9V/exec?format=iso").then(res=>{
  //   res.ok && res.text().then(text=>storage.setItemSync("pool", pool+=SHA3_Hex(text)));
  // });
}*/


function genAerisSeed(weather){
  return SHA3_Hex(convertValuesToKelvinChunk([weather.tempC, weather.dewpointC, weather.windchillC, weather.heatindexC])+convertValues([weather.pressureMB,
    weather.altimeterMB, weather.spressureMB, weather.humidity, weather.sky, weather.windSpeedKPH, weather.windDirDEG, weather.sunriseISO,
    weather.sunsetISO, weather.precipMM, weather.solradMW2, weather.light, weather.visibilityKM, weather.ceilingM, weather.snowDepthCM]));
}


function getCryptoBytes(){
  return BigNumber(require("crypto").randomBytes(8).toString("hex"), 16).mod(BigNumber(DB.length)).toNumber();
}


// async function generateEntropy(sync=true){
//   let [DB, rnd] = [require(Const.CITIES_JSON), BigNumber(storage.getItemSync("seed") || getCryptoBytes())];
//   if(sync){
//     while(pool.length<poolLength){
//       let city = DB[rnd];
//       pool += await openWeatherMapSeed(city.id);
//       pool += await aerisSeed(city.lat, city.lon);
//     }
//     storage.setItemSync("pool", pool);
//   }
//   else{
//     let city = DB[rnd];
//     openWeatherMapSeed(city.id, sync);
//     aerisSeed(city.lat, city.lon, sync);
//   }
// }

function generateEntropy(){
  let [DB, i, array] = [require(Const.CITIES_JSON), 10, []];
  while(i--){
    let rnd = BigNumber(getCryptoBytes(), 16).mod(DB.length).toNumber();
    let city = DB[rnd];
    array.push(openWeatherMapSeed(city.id, false));
    array.push(aerisSeed(city.lat, city.long, false));
  }
  return Promise.all(array).then(resolved=>console.log(resolved) || storage.setItemSync(resolved.filter(a=>a).reduce((a,b)=>a+b)));
}


function getSeed(bits=128){
  let [hex, pool] = [bits/4, storage.getItemSync("pool")];
  seed = storage.getItemSync("pool").substring(0, hex);
  pool = pool.substring(hex);
  if(pool.length<poolLength) generateEntropy(false);
  return seed;
}


function generateSeeds(){
  const [storage, BigNumber] = [require("node-persist"), require("bignumber.js").another()];
  BigNumber.config({ERRORS: false});
  //TODO: _seed not coming from anywhere
  let DB = require(Const.CITIES_JSON), rnd = BigNumber(storage.getItemSync("seed") || require("crypto").randomBytes(16).toString("hex"), 16).mod(BigNumber(DB.length, 10)).toNumber(), seed;
  do{
    let city = DB[rnd];
    seed = openWeatherMapSeed(city.id) || aerisSeed(city.lat, city.lon);
  }while(!seed);
  seed = SHA256(seed);
  storage.setItemSync("count", parseInt(seed.substring(0, 4), 16));
  return BigNumber(seed.substring(32), 16).toString();
}


function openWeatherMapSeed(id){
  return fetch(`${Const.OPEN_WEATHER_MAP.getFetchUrl()}&id=${id}`).then(res=>{
    if(!res.ok) return console.log("!res.ok") || console.log(res) || false;
    return res.json().then(obj=>genOpenWeatherMapSeed(obj))
  }).catch(e=>console.log(e) || false);
}


function aerisSeed(latitude, longitude){
  return fetch(`${Const.AERIS_WEATHER.getFetchUrl()}&p=${Math.round(latitude*100)/100},${Math.round(longitude*100)/100}`).then(res=>{
    if(!res.ok) return console.log("!res.ok aeris") || console.log(res) || false;
    return res.json().then(weather=>genAerisSeed(weather))
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


let out = generateSeeds;
// let out = function(){};
out.aerisSeed = aerisSeed;
out.openWeatherMapSeed = openWeatherMapSeed;
out.setPoolLength = bitLength=>poolLength = Number(bitLength) || poolLength;
out.getPoolLength = ()=>poolLength;
out.generateEntropy = generateEntropy;
out.getSeed = getSeed;

module.exports = out;
