//internal modules
const cred = require("../credentials");

//shortcuts
const {assign} = Object;

function defineActive({active}){
    return active!==undefined?Boolean(active):true;
}

module.exports = ({accuWeather, aeris, apixu, darkSky, devRandom, msnWeather, openWeatherMap, weatherUnderground, worldWeatherOnline, yahooWeather, yrNo})=>{
    if(accuWeather)
        if(!accuWeather.apiKey) throw new Error("AccuWeather requires an apiKey");
        else assign(cred.accuWeather, {apiKey: accuWeather.apiKey, active: defineActive(accuWeather)});
    if(aeris)
        if(!aeris.clientId || !aeris.clientSecret) throw new Error("Aeris requires a clientId and a clientSecret");
        else assign(cred.aeris, {clientId: aeris.clientId, clientSecret: aeris.clientSecret, active: defineActive(aeris)});
    if(apixu)
        if(!apixu.key) throw new Error("Apixu requires a key");
        else assign(cred.apixu, {key: apixu.key, active: defineActive(apixu)});
    if(darkSky)
        if(!darkSky.key) throw new Error("DarkSky requires a key");
        else assign(cred.darkSky, {key: darkSky.key, active: defineActive(darkSky)});
    if(devRandom) cred.devRandom.active = defineActive(devRandom);
    if(msnWeather) cred.msnWeather.active = defineActive(msnWeather);
    if(openWeatherMap)
        if(!openWeatherMap.appId) throw new Error("Open Weather Map requires an appId");
        else assign(cred.openWeatherMap, {appId: openWeatherMap.appId, active: defineActive(openWeatherMap)});
    if(weatherUnderground)
        if(!weatherUnderground.keyId) throw new Error("Weather Underground requires a keyId");
        else assign(cred.weatherUnderground, {keyId: weatherUnderground.keyId, active: defineActive(weatherUnderground)});
    if(worldWeatherOnline)
        if(!worldWeatherOnline.key) throw new Error("World Weather Online requires a key");
        else assign(cred.worldWeatherOnline, {key: worldWeatherOnline.key, premium: Boolean(worldWeatherOnline.premium), active: defineActive(worldWeatherOnline)});
    if(yahooWeather) cred.yahooWeather.active = defineActive(yahooWeather);
    if(yrNo) cred.yrNo.active = defineActive(yrNo);
};