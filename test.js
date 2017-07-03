const Kerdox = require("./kerdox");

const aerisWeather = {clientId: "IBZeRWusLOZrSpDJVPFrK", clientSecret: "x1tN7jRcXAHODvehnR9Znnc0UhdUau08J3dHfFcI"};
const openWeatherMap = {appId: "fec6564bce57336bcfe73274da90223d"};

Kerdox.config({aerisWeather, openWeatherMap});

Kerdox.init().then(()=>{
    const array = [];
    // let i=1000;
    // while(i--) array.push(Kerdox.RNG.int(0, 100).toString());
    // console.log(array);
    // require("fs").writeFileSync("./test.json", JSON.stringify(array, null, "\t"));
    console.log("number", Kerdox.RNG.int(0, 100));
    console.log("done");
    process.exit("0");
}).catch(e=>console.log("err", e));