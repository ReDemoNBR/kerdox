const BigNumber = require("bignumber.js").another();
BigNumber.config({ERRORS: false, EXPONENTIAL_AT: 100});


function generateKerdoxNumberObject(num){
  let kerdoxNumber = num;
  kerdoxNumber.valueOf = ()=>Number(kerdoxNumber);
  kerdoxNumber.toString = (radix=10)=>BigNumber(kerdoxNumber, 10).toString(radix);
  kerdoxNumber.floor = (places=0)=>{
    let [int, decimalPlaces] = kerdoxNumber.toString().split(/\./);
    if(!decimalPlaces) return generateKerdoxNumberObject(int);
    if(int[0]=="-" && decimalPlaces && decimalPlaces.length>=places)
      return generateKerdoxNumberObject(BigNumber(`${int}.${decimalPlaces.substring(0, places)}`, 10).minus(BigNumber(`1e-${places}`, 10)).toString());
    do decimalPlaces = decimalPlaces.substring(0, places);
    while(decimalPlaces[--places]=="0");
    return generateKerdoxNumberObject(decimalPlaces && `${int}.${decimalPlaces}` || int);
  };
  kerdoxNumber.ceil = (places=0)=>{
    let [int, decimalPlaces] = kerdoxNumber.split(/\./);
    if(!decimalPlaces) return generateKerdoxNumberObject(int);
    if(int[0]!="-" && decimalPlaces.length>=places)
      return generateKerdoxNumberObject(BigNumber(`${int}.${decimalPlaces.substring(0, places)}`, 10).add(BigNumber(`1e-${places}`, 10)).toString());
    do decimalPlaces = decimalPlaces.substring(0, places);
    while(decimalPlaces[--places]=="0");
    return generateKerdoxNumberObject(decimalPlaces && `${int}.${decimalPlaces}` || int);
  };
  kerdoxNumber.round = (places=0)=>{
    let [int, decimalPlaces] = number.split(/\./);
    if(!decimalPlaces) return generateKerdoxNumberObject(int);
    if(int[0]=="-") return generateKerdoxNumberObject(Number(decimalPlaces[places])>=5 && floor2(number, places) || ceil2(number, places));
    return generateKerdoxNumberObject(Number(decimalPlaces[places])>=5 && ceil2(number, places) || floor2(number, places));
  };
  kerdoxNumber.truncate = (places=0)=>{
    let [int, decimalPlaces] = number.split(/\./);
    if(!decimalPlaces) return generateKerdoxNumberObject(int);
    do decimalPlaces = decimalPlaces.substring(0, places);
    while(decimalPlaces[--places]=="0");
    return generateKerdoxNumberObject(decimalPlaces && `${int}.${decimalPlaces}` || int);
  };
  kerdoxNumber.absolute = ()=>generateKerdoxNumberObject(kerdoxNumber.toString()[0]=="-" && kerdoxNumber.substring(1) || kerdoxNumber.toString());
  //ALIASES
  kerdoxNumber.toNumber = kerdoxNumber.valueOf;
  kerdoxNumber.floorRound = kerdoxNumber.truncate;
  kerdoxNumber.roundUp = kerdoxNumber.ceil;
  kerdoxNumber.roundDown = kerdoxNumber.floor;
  kerdoxNumber.abs = kerdoxNumber.absolute;
  return kerdoxNumber;
}

function setDecimalPlaces(places){
  BigNumber.config({DECIMAL_PLACES: places});
}
