const [BigNumber, storage, SHA256, seeder] = [require("bignumber.js"), require("node-persist"), require("../utils").convertToSHA256_Hex, require("../libs/seeder")];

//init configs
BigNumber.config({ERRORS: false});
storage.initSync();

//global variables
let _seed, _count, _tempSeed;


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
  let operation = SHA256(seed);

  if(!ignoreCount){
    _count--;
    _tempSeed = operation.substring(32);
  }
  else _seed = operation.substring(32);

  let out = type=="float" && floatNumber(operation.substring(0, 32), min, max) || intNumber(operation.substring(0, 32), min, max);
  out.valueOf = ()=>Number(out);
  out.toString = (radix)=>Number(out).toString(radix);
  out.toNumber = out.valueOf;
  return out;
}


function floatNumber(value, min, max){
  min = BigNumber(min, 10);
  // operation below: (value / (2 ** 127)) * (max - min) + min
  return BigNumber(value, 16).div(MAX_BIG).times(BigNumber(max, 10).minus(min)).plus(min).toString();
}


function intNumber(value, min, max){
  min = BigNumber(min, 10);
  // operation below: value % (max - min) + min
  return BigNumber(value, 16).mod(BigNumber(max, 10).minus(min)).plus(min).toString();
}


module.exports = {
  randomFloat: randomFloat,
  randomInt: randomInt,
  setTempSeed: seed=>_tempSeed = seed
}
