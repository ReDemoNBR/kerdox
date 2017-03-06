const BigNumber = require("bignumber.js");
BigNumber.config({ERRORS: false});

let num1 = "7467.91719273938310187929128101209";
let num2 = "0.6";
let num3 = "662";
let num4 = "-1561.8483092373918178202";
let num5 = "-0.7";
let num6 = "-777";
let num7 = "13.00000000717292729281091";


function floorRound(number, places){
  let [int, decimalPlaces] = number.split(/\./);
  if(!places || places<0 || !decimalPlaces) return int;
  decimalPlaces = decimalPlaces.substring(0, places);
  while(decimalPlaces[--places]=="0") decimalPlaces = decimalPlaces.substring(0, places);
  return decimalPlaces && `${int}.${decimalPlaces}` || int;
}


function floor(number, places=0){
  if(number.toString()[0]=="-" && /\./.test(number.toString())){
    let decimalPlaces = number.toString().split(/\./)[1];
    if(decimalPlaces.length>=places)
      return BigNumber(floorRound(number, places), 10).minus(BigNumber(`1e-${places}`, 10));
  }
  return floorRound(number, places);
}


function ceil(number, places=0){
  let x = BigNumber(floor(abs(number), places), 10).add(BigNumber(`1e-${places}`, 10)).toString();
  return number[0]=="-" && `-${x}` || x;
}

function abs(number){
  number = number.toString();
  return number[0]=="-" && number.substring(1) || number;
}


function floor2(number, places=0){
  let [int, decimalPlaces] = number.split(/\./);
  if(!decimalPlaces) return int;
  if(int[0]=="-" && decimalPlaces && decimalPlaces.length>=places)
    return BigNumber(`${int}.${decimalPlaces.substring(0, places)}`, 10).minus(BigNumber(`1e-${places}`, 10)).toString();
  do{
    decimalPlaces = decimalPlaces.substring(0, places);
  }while(decimalPlaces[--places]=="0");
  return decimalPlaces && `${int}.${decimalPlaces}` || int;
}


function ceil2(number, places=0){
  let [int, decimalPlaces] = number.split(/\./);
  if(!decimalPlaces) return int;
  if(int[0]!="-" && decimalPlaces.length>=places)
    return BigNumber(`${int}.${decimalPlaces.substring(0, places)}`, 10).add(BigNumber(`1e-${places}`, 10)).toString();
  do{
    decimalPlaces = decimalPlaces.substring(0, places);
  }while(decimalPlaces[--places]=="0");
  return decimalPlaces && `${int}.${decimalPlaces}` || int;
}


function round2(number, places=0){
  let [int, decimalPlaces] = number.split(/\./);
  if(!decimalPlaces) return int;
  if(int[0]=="-") return Number(decimalPlaces[places])>=5 && floor2(number, places) || ceil2(number, places);
  return Number(decimalPlaces[places])>=5 && ceil2(number, places) || floor2(number, places);
}


function truncate2(number, places=0){
  let [int, decimalPlaces] = number.split(/\./);
  if(!decimalPlaces) return int;
  do{
    decimalPlaces = decimalPlaces.substring(0, places);
  }while(decimalPlaces[--places]=="0");
  return decimalPlaces && `${int}.${decimalPlaces}` || int;
}




function test(number){
  console.log(`number=${number} --> truncate2=${truncate2(number, 5)}`);
}


test(num1);
test(num2);
test(num3);
test(num4);
test(num5);
test(num6);
test(num7);
test(`-${num7}`);
console.log(ceil(num1));
