//external modules
const [YQL, {promisify}] = [require("yql"), require("util")];

//internal modules
const [{SHA3_Hex}, {removeNonDigits, celsiusToKelvin: c2k}] = [require("../utils/digester"), require("../utils/number-treatment")];
const options = {ssl: true};


function generateWoeidSubQuery(latitude, longitude){
    return `SELECT woeid FROM geo.places WHERE text="(${latitude},${longitude})"`;
}


function generateWeatherQuery(latitude, longitude){
    return `SELECT wind, atmosphere, astronomy, item.condition.temp FROM weather.forecast WHERE woeid in (${generateWoeidSubQuery(latitude, longitude)}) AND u='c' LIMIT 1`;
}


YQL.prototype.execPromise = promisify(YQL.prototype.exec);


module.exports = (latitude, longitude)=>new YQL(generateWeatherQuery(latitude, longitude), options).execPromise().then(res=>{
    if(!res || !res.query || !res.query.results || !res.query.results.channel) return console.log("!res.query.results.channel") || false;
    let {query: {results: {channel: {
        wind: {chill, direction, speed},
        atmosphere: {humidity, pressure, rising, visibility},
        astronomy: {sunrise, sunset},
        item: {condition: {temp}}}}
    }} = res;
    let sha = SHA3_Hex(`${removeNonDigits(c2k(temp))}${[chill,direction,speed,humidity,pressure,rising,visibility,sunrise,sunset].reduce((a,b)=>`${a}${removeNonDigits(b)}`, "")}`);
    console.log("SHA3", sha);
    return sha;
}).catch(e=>console.log("error", e) || false);