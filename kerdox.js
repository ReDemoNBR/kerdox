const [{decryption, encryption, initialize, picker: pick, RNG, shuffle}, credentials] = [require("./modules"), require("./credentials")];


//configures credentials for Aeris Weather and/or Open Weather Map
function config({aerisWeather, openWeatherMap}){
    if(aerisWeather){
        const {clientId, clientSecret, active} = aerisWeather;
        if(!clientId || !clientSecret) throw new Error("Aeris Weather requires clientId and clientSecret");
        [credentials.aerisWeather.clientId, credentials.aerisWeather.clientSecret, credentials.aerisWeather.active] = [clientId, clientSecret, active!==undefined && active || true];
    }
    if(openWeatherMap)
        if(!openWeatherMap.appId) throw new Error("Open Weather Map requires an appId");
        else [credentials.openWeatherMap.appId, credentials.openWeatherMap.active] = [openWeatherMap.appId, openWeatherMap.active!==undefined && openWeatherMap.active || true];
}


// decrypt({String} message, {String} key) --> decrypts a message that was encrypted in Kerdox with the given key
function decrypt(message, key){
    return decryption(message, key);
}


// encrypt({String} message, {String} key) --> encrypts a message with the given key
function encrypt(message, key){
    return encryption(message, key);
}


// gets the number of decimal places of the 128-bit floating-point RNG
function getDecimalPlaces(){
    return RNG.getDecimalPlaces();
}


// gets the number of decimal places of the 256-bit floating-point RNG
// function getDecimalPlaces256(){
//     return RNG256.getDecimalPlaces();
// }



// function picker({Number} quantity, {Item} item1, {Item} item2, ..., {Item} itemX) --> Randomly picks a given quantity of items that were passed. If quantity is greater than the number of items, then it will allow repetition
// function picker({Array} list, {Number} quantity, {Boolean} repetition) --> Randomly picks a given a given quantity of items from a given list, allowing or not repetition
// function picker({Array} list, {Number} quantity) --> Randomly picks a given quantity of items from a given list, without repetition.
// function picker({Array} list) --> Randomly picks one item from a given list.
function picker(quantity, ...args){
    let list, repetition;
    if(typeof quantity==="number") [quantity, list, repetition] = [Math.floor(Math.abs(list)), args, quantity>args.length && true || false];
    else [list, quantity, repetition] = [quantity, Math.floor(Math.abs(args[0])) || 1, Boolean(args[1])];
    let out = pick(list, quantity, repetition);
    return args[0] && out || out[0];
}


// randomFloat({String|Number} min, {String|Number} max) --> generates a random float number from the interval of [min, max[
// randomFloat({String|Number} max) --> generates a random float number from the interval of [0, max[
// randomFloat() --> generates a random float number from the interval of [0,1[
function randomFloat(min, max){
    if(!max){
        if(!min) [min, max] = ["0", "1"];
        else [min, max] = ["0", min];
    }
    console.log(`generating a random float: [${min}, ${max}[`);
    return RNG.randomNumber(String(min), String(max), "float");
}


// randomInt({String|Number} min, {String|Number} max) --> generates a random integer number from the interval of [min,max[
// randomInt({String|Number} max) --> generates a random integer number from the interval of [0, max[
// randomInt() --> generates a random integer number from the interval of [0, 4294967296[
function randomInt(min, max){
    if(!max){
        if(!min) [min, max] = ["0", "4294967296"];
        else [min, max] = ["0", min];
    }
    console.log(`generating a random integer: [${min}, ${max}[`);
    return RNG.randomNumber(String(min), String(max), "int");
}


// setDecimalPlaces(places) --> set the number of decimal places of the 256-bit floating-point RNG
function setDecimalPlaces(places=40){
    RNG.setDecimalPlaces(places);
}


// shuffler({Item} item1, {Item} item2, ..., {Item} itemX) --> returns an array with the shuffled items shuffled
// shuffler({Array} list) --> returns an array with a shuffled copy of the given array
function shuffler(...args){
    let list = !args[1] && Array.isArray(args[0]) && args[0] || args;
    return shuffle(list);
}


module.exports = {
    config,
    Cypher: {decrypt, encrypt},
    init: initialize,
    initialize,
    RNG: {
        float: randomFloat,
        getDecimalPlaces,
        int: randomInt,
        setDecimalPlaces
    },
    Picker: picker,
    Shuffler: shuffler
};