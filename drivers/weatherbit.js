//external modules
const fetch = require("node-fetch");

//internal modules
const [
    {SHA3_Hex}, {removeNonDigits, metersPerSecToKilometersPerHour: ms2Kmh}, {weatherBit}
] = [require("../utils/digester"), require("../utils/number-treatment"), require("../credentials")];


//DONE: implement driver for WeatherBit API ("units" query param already makes it come in kelvin)
module.exports = (latitude, longitude)=>fetch(`${weatherBit.url}/current?lat=${latitude}&lon=${longitude}&units=S&key=${weatherBit.key}`).then(res=>{
    if(!res.ok) return console.log("!res.ok weatherbit") || console.log(res) || false;
    return res.json().then(({data: [weather]})=>{
        //rh: relative humidity, vis: visibility, pres: pressure, slp: sea level pressure :D
        let {wind_spd, rh, app_temp, dewpt, vis, uv, pres, sunrise, precip3h, wind_dir, precip, slp, temp, sunset, clouds} = weather;
        return SHA3_Hex(`${ms2Kmh(wind_spd)}${[rh,app_temp,dewpt,vis,uv,pres,sunrise,precip3h,wind_dir,precip,slp,temp,sunset,clouds].reduce((a,b)=>`${a}${removeNonDigits(b)}`,"")}`);
    });
}).catch(e=>console.log(e) || false);