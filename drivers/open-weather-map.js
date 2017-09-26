//external modules
const fetch = require("node-fetch");

//internal modules
const [{SHA3_Hex}, {removeNonDigits}, {openWeatherMap}] = [require("../utils/digester"), require("../utils/number-treatment"), require("../credentials")];


function generateFetchUrl(latitude, longitude){
    return `${openWeatherMap.url}?appid=${openWeatherMap.appId}&lat=${latitude}&lon=${longitude}`;
}

//DONE: make Open Weather Map Driver use latitude and longitude instead of id
module.exports = (latitude, longitude)=>fetch(generateFetchUrl(latitude, longitude)).then(res=>{
    if(!res.ok) return console.log("!res.ok open weather map") || console.log(res) || false;
    return res.json().then(({main, clouds, wind, sys, rain, snow})=>SHA3_Hex([main.temp_max, main.temp_min, main.temp, main.sea_level, main.pressure, main.grnd_level,
        main.humidity, clouds.all, wind.speed, wind.deg, sys.sunrise, sys.sunset, rain && rain["3h"] || "", snow && snow["3h"] || ""].reduce((a,b)=>`${a}${removeNonDigits(b)}`, "")
    ));
}).catch(e=>console.log(e) || false);