const Kerdox = require("./kerdox");
const FS = require("fs");
const BigNumber = require("bignumber.js");
BigNumber.config({ERRORS: false});

const max = "115792089237316195423570985008687907853269984665640564039457584007913129639936"; //2**256
// const max = (2**32).toString();

const accuWeather = {appKey: "B6hDAdyn3gwkzuWPrJcaKfbuh3zxujju"};
const aerisWeather = {clientId: "IBZeRWusLOZrSpDJVPFrK", clientSecret: "x1tN7jRcXAHODvehnR9Znnc0UhdUau08J3dHfFcI"};
const openWeatherMap = {appId: "fec6564bce57336bcfe73274da90223d"};
const weatherUnderground = {apiKey: "5861e8fdd14b5364"};
const worldWeatherOnline = {key: "3a32c3ae1cd6475380e204630170608", premium: true};


// fetch("https://api.worldweatheronline.com/premium/v1/weather.ashx?q=40.73,-73&num_of_days=1&cc=yes&key=3a32c3ae1cd6475380e204630170608").then(res=>{
// 	if(!res.ok) return console.log(res);
// 	return res.json().then(console.log);
// });

Kerdox.config({accuWeather, aerisWeather, openWeatherMap, weatherUnderground, worldWeatherOnline});

console.log("initiating");
Kerdox.init().then(()=>{
    console.log("initialized");
    let i = 5000000;
    i--;
    const file = "./res/test-kerdox256.txt";
    FS.writeFileSync(file, Kerdox.RNG.int(max).toString());
    console.log("generating numbers...");
    while(i--) FS.appendFileSync(file, ` ${Kerdox.RNG.int(max).toString()}`);
    console.log("generated numbers");
}).catch(e=>console.log("err", e) || process.exit(1));