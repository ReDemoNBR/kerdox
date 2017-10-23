const [{decryption, encryption, initialize, initializeSync, picker: pick, RNG, shuffle, config: configuration}, types] = [require("./modules"), require("./kerdox-types")];


//configures credentials for weather APIs
const config = configuration;


// decrypt({String} message, {String} key) --> decrypts a message that was encrypted in Kerdox with the given key
const decrypt = decryption;


// encrypt({String} message, {String} key) --> encrypts a message with the given key
const encrypt = encryption;


// getDecimalPlaces() --> gets the number of decimal places of the floating-point RNG
const getDecimalPlaces = RNG.getDecimalPlaces;


// getMaxCountBytes() --> gets the maximum number of values generated by the same seed before re-seeding
const getMaxCountBytes = RNG.getMaxCountBytes;


// isInitialized() --> returns a Boolean whether the system is initialized or not
function isInitialized(){
    const [storage, keys] = [require("node-persist"), ["pool", "count", "seed"]];
    return Boolean(storage.keys && storage.keys().every(key=>keys.includes(key)));
}

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
    return RNG.randomNumber(String(min), String(max), "int");
}


// setDecimalPlaces(places) --> set the number of decimal places of the 256-bit floating-point RNG
function setDecimalPlaces(places=40){
    RNG.setDecimalPlaces(places);
}


// setMaxCountBytes(bytes) --> set the number of bytes of the 256-bit RNG
const setMaxCountBytes = RNG.setMaxCountBytes;


// shuffler({Item} item1, {Item} item2, ..., {Item} itemX) --> returns an array with the shuffled items shuffled
// shuffler({Array} list) --> returns an array with a shuffled copy of the given array
function shuffler(...args){
    let list = !args[1] && Array.isArray(args[0]) && args[0] || args;
    return shuffle(list);
}


module.exports = {
    Cypher: {decrypt, encrypt},
    init: initialize,
    initialize,
    initSync: initializeSync,
    initializeSync,
    isInitialized,
    isInit: isInitialized,
    KerdoxNumber: types.KerdoxNumber,
    KerdoxStream: types.KerdoxStream,
    RNG: {
        config,
        float: randomFloat,
        getDecimalPlaces,
        getMaxCountBytes,
        int: randomInt,
        Picker: picker,
        setDecimalPlaces,
        setMaxCountBytes,
        Shuffler: shuffler
    }
};