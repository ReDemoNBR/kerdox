const Kerdox = require("./kerdox");

const aerisWeather = {clientId: "IBZeRWusLOZrSpDJVPFrK", clientSecret: "x1tN7jRcXAHODvehnR9Znnc0UhdUau08J3dHfFcI"};
const openWeatherMap = {appId: "fec6564bce57336bcfe73274da90223d"};

Kerdox.config({aerisWeather, openWeatherMap});

console.log("initiating");
let initTime = Date.now();
Kerdox.init().then(()=>{
    initTime = Date.now()-initTime;
    console.log("initialized");
    const map = {};
    console.log("generating numbers...");
    let [i, sum, generateTime] = [100000, 0, Date.now()];
    while(i--){
        let kdx = Kerdox.RNG.int(0, 100);
        let str = kdx.toString();
        sum += kdx.toNumber();
        if(map[kdx]) map[kdx]++;
        else map[kdx] = 1;
    };
    generateTime = Date.now()-generateTime;
    console.log("numbers generated");
    require("fs").writeFileSync("./test.json", JSON.stringify(map, null, "\t"));
    console.log("map", map);
    console.log("initTime", initTime);
    console.log("generateTime", generateTime);
    console.log("average", sum/100000);
    process.exit("0");
}).catch(e=>console.log("err", e));