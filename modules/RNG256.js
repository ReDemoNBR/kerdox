const [BigNumber, storage, {SHA3: computeSHA3, Constants, seeder}] = [require("bignumber.js").another(), require("node-persist"), require("../utils")];

//init configs
BigNumber.config({ERRORS: false, DECIMAL_PLACES: 40, EXPONENTIAL_AT: 100});
storage.initSync();

//global variables
let _seed, _count, _tempSeed;

//TODO: use MAX_BIG_256 instead of MAX_BIG and check if Constants is used anywhere but in here.
function floatNumber(value, min, max){
  min = BigNumber(min, 10);
  // operation below: (value / (2 ** 127)) * (max - min) + min
  return BigNumber(value, 16).div(MAX_BIG).times(BigNumber(max, 10).minus(min)).plus(min).toString();
}


function getDecimalPlaces(){
  return BigNumber.config().DECIMAL_PLACES;
}


function intNumber(value, min, max){
  min = BigNumber(min, 10);
  // operation below: value % (max - min) + min
  return BigNumber(value, 16).mod(BigNumber(max, 10).minus(min)).plus(min).toString();
}


function randomNumber(min, max, type, ignoreCount=false){
  type = String(type).toLowerCase();
  type = type=="f" && "float" || type=="i" && "int";
  if(BigNumber(min, 10).comparedTo(BigNumber(max, 10))==1) [min, max] = [max, min];
  if(min==max) [min, max] = ["0", "1"];

  let seed;
  if(ignoreCount) seed = _tempSeed;
  else if(!_count){
    _count = storage.getItemSync("count");
    seed = _count<=0 && seeder() || _seed || storage.getItemSync("seed") || seeder();
  }
  let operation = SHA256(seed);

  if(!ignoreCount){
    _count--;
    _tempSeed = operation.substring(64);
    storage.setItemSync("count_256", _count);
  }
  else{
    _seed = operation.substring(64);
    storage.setItemSync("seed_256", _seed);
  }
  Utils.setKerdoxNumberDecimalPlaces(getDecimalPlaces());
  return Utils.generateKerdoxNumberObject(type=="float" && floatNumber(operation.substring(0, 64), min, max) || intNumber(operation.substring(0, 64), min, max));
}


function setDecimalPlaces(places){
  BigNumber.config({DECIMAL_PLACES: places});
}


function setTempSeed(seed){
  _tempSeed = seed;
  return _tempSeed;
}


module.exports = {
  getDecimalPlaces: getDecimalPlaces,
  randomNumber: randomNumber,
  setDecimalPlaces: setDecimalPlaces,
  setTempSeed: setTempSeed
};
