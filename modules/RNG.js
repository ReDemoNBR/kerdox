const [BigNumber, storage, {SHA256: computeSHA256, Constants, seeder}] = [require("bignumber.js").another(), require("node-persist"), require("../utils")];

//init configs
BigNumber.config({ERRORS: false, DECIMAL_PLACES: 20, EXPONENTIAL_AT: 100});
storage.initSync();

//global variables
let _seed, _count, _tempSeed;


function floatNumber(value, min, max){
  min = BigNumber(min, 10);
  // operation below: (value / (2 ** 127)) * (max - min) + min
  return BigNumber(value, 16).div(Constants.MAX_BIG).times(BigNumber(max, 10).minus(min)).plus(min).toString();
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
    _tempSeed = operation.substring(32);
    storage.setItemSync("count", _count);
  }
  else{
    _seed = operation.substring(32);
    storage.setItemSync("seed", _seed);
  }
  Utils.setKerdoxNumberDecimalPlaces(getDecimalPlaces());
  return Utils.generateKerdoxNumberObject(type=="float" && floatNumber(operation.substring(0, 32), min, max) || intNumber(operation.substring(0, 32), min, max));
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
