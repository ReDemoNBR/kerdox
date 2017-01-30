const fetch = require("node-fetch");
const Constants = require("./constants");
const NumberTreatment = require("./number-treatment");



function generateSeed(){
  let DB = JSON.parse(require("fs").readFileSync(Constants.CITIES_JSON)), rnd = BigNumber(_seed, 16).mod(BigNumber(DB.length, 10)).toNumber(), seed;
  let Seeder = require("./seeder");
  do{
    let city = DB[rnd];
    seed = Seeder.openWeatherMapSeed(city.id) || Seeder.aerisSeed(city.lat, city.lon);
  }while(!seed);

  seed = SHA256(seed);
  storage.setItemSync("count", parseInt(seed.substring(0, 4), 16));
  return BigNumber(seed.substring(32), 16).toString();
}


function openWeatherMapSeed(id){
  return fetch(`${Constants.OPEN_WEATHER_MAP.getFetchUrl()}&id=${id}`).then(res=>{
    if(!res.ok) return false;
    return res.json().then(weather=>{
      let {main, clouds, wind, sys, rain} = weather;
      return getValues([main.temp_max, main.temp_min, main.temp, main.sea_level, main.pressure, main.grnd_level, main.humidity, clouds.all,
        wind.speed, wind.deg, sys.sunrise, sys.sunset, rain["3h"]]);
    }).catch(e=>false)
  }).catch(e=>false);
}


function aerisSeed(latitude, longitude){
  return fetch(`${Constants.AERIS_WEATHER.getFetchUrl()}&p=${Math.round(latitude*100)/100},${Math.round(longitude*100)/100}`).then(res => {
    if(!res.ok) return false;
    return res.json().then(weather=>{
      return convertValuesToKelvin([weather.tempC, weather.dewpointC, weather.windchillC, weather.heatindexC])+getValues([weather.pressureMB,
        weather.altimeterMB, weather.spressureMB, weather.humidity, weather.sky, weather.windSpeedKPH, weather.windDirDEG, weather.sunriseISO,
        weather.sunsetISO, weather.precipMM, weather.solradMW2, weather.light, weather.visibilityKM, weather.ceilingM, weather.snowDepthCM]);
    }).catch(e=>false)
  }).catch(e=>false);
}


function convertValues(values){
  let chunk = "";
  for(let i=0; i<values.length; i++)
    chunk += NumberTreatment.removeNonDigits(values[i]);
  return chunk;
}


function convertValuesToKelvin(values){
  let chunk = "";
  for(let i=0; i<values.length; i++)
    chunk += NumberTreatment.celsiusToKelvin(NumberTreatment.removeNonDigits(values[i]));
  return chunk;
}


let out = generateSeed;
out.aerisSeed = aerisSeed;
out.openWeatherMapSeed = openWeatherMapSeed;

module.exports = out;
