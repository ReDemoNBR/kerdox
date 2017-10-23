const [BigNumber, storage, Utils, {KerdoxNumber}, {MAX_BIG}] = [require("bignumber.js").another(), require("node-persist"), require("../utils"), require("../kerdox-types"), require("../constants")];

// shortcut
const SHA3 = Utils.computeSHA3;


//init configs
BigNumber.config({ERRORS: false, DECIMAL_PLACES: 40, EXPONENTIAL_AT: 100});

//global variables
let _seed, _count, _tempSeed, maxCount = 16;
const bits = 256;


function floatNumber(value, min, max){
    min = BigNumber(min, 10);
    // operation below: (value / (2 ** 256)) * (max - min) + min
    return BigNumber(value, 16).div(MAX_BIG).times(BigNumber(max, 10).minus(min)).plus(min).toString();
}


function getDecimalPlaces(){
    return BigNumber.config().DECIMAL_PLACES;
}


function getMaxCountBytes(){
    return Math.log2(maxCount);
}


function intNumber(value, min, max){
    min = BigNumber(min, 10);
    // operation below: value % (max - min) + min
    return BigNumber(value, 16).mod(BigNumber(max, 10).minus(min)).plus(min).toString();
}


function randomNumber(min, max, type, ignoreCount=false){
    type = String(type).toLowerCase();
    type = type.startsWith("f") && "float" || "int";
    if(BigNumber(min, 10).comparedTo(BigNumber(max, 10))==1) [min, max] = [max, min];
    if(min==max) [min, max] = ["0", "1"];
    const bitsLengthHex = bits/4;

    let seed;
    if(ignoreCount) seed = _tempSeed;
    else if(!_count){
        seed = (!_count || _count<=0) && Utils.seeder.consumePool(bits) || _seed || storage.getItemSync("seed") || Utils.seeder.consumePool(bits);
        _count = Number(storage.getItemSync("count")) || parseInt(Utils.seeder.consumePool(maxCount), 16);
    }
    else seed = _seed;
    let operation = SHA3(seed);

    if(!ignoreCount){
        _count--;
        _seed = operation.substring(bitsLengthHex);
        storage.setItemSync("seed", _seed);
        storage.setItemSync("count", _count);
    }
    else _tempSeed = operation.substring(bitsLengthHex);
    return new KerdoxNumber(type=="float" && floatNumber(operation.substring(0, bitsLengthHex), min, max) || intNumber(operation.substring(0, bitsLengthHex), min, max));
}

function setDecimalPlaces(places){
    KerdoxNumber.setDecimalPlaces(places);
}


function setMaxCountBytes(bytes){
    bytes >>= 0;
    maxCount = 2**(bytes*8);
    return getMaxCountBytes();
}


function setTempSeed(seed){
    _tempSeed = seed;
    return _tempSeed;
}


module.exports = {getDecimalPlaces, getMaxCountBytes, randomNumber, setDecimalPlaces, setMaxCountBytes, setTempSeed};