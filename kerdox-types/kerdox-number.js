const BN = require("bignumber.js");
const BigNumber = BN.another();
BigNumber.config({ERRORS: false, EXPONENTIAL_AT: 100});


function KerdoxNumber(number){
  // kdx is the true value and the rest are shortcuts
  let [kdx, K, P, N, B] = [String(number), this, this.prototype, Number, BigNumber];

  K.absolute = K.abs = function(){return new K(kdx.toString()=="-" && kdx.substring(1) || kdx.toString());};
  K.BigNumber = K.toBigNumber = function(){return BN(kdx, 10);};
  K.ceil = K.roundUp = function(places=0){
    let [int, DP] = kdx.split(/\./);
    if(!DP) return K(int);
    if(int[0]!="-" && DP.length>=places)
      return K(B(`${int}.${DP.substring(0, places)}`, 10).add(B(`1e-${places}`, 10)).toString());
    do DP = DP.substring(0, places);
    while(DP[--places]=="0");
    return new K(DP && `${int}.${DP}` || int);
  };
  K.floor = K.roundDown = function(places=0){
    let [int, DP] = kdx.toString().split(/\./);
    if(!DP) return K(int);
    if(int[0]=="-" && DP && DP.length>=places)
      return new K(B(`${int}.${DP.substring(0, places)}`, 10).minus(B(`1e-${places}`, 10)).toString());
    do DP = DP.substring(0, places);
    while(DP[--places]=="0");
    return new K(DP && `${int}.${DP}` || int);
  };
  K.round = function(places=0){
    let [int, DP] = kdx.split(/\./);
    if(!DP) return K(int);
    if(int[0]=="-") return K(N(DP[places])>=5 && floor2(kdx, places) || ceil2(kdx, places));
    return new K(N(DP[places])>=5 && ceil2(kdx, places) || floor2(kdx, places));
  };
  K.toString = function(radix=10){return B(kdx, 10).toString(radix);};
  K.truncate = K.floorRound = function(places=0){
    let [int, DP] = kdx.split(/\./);
    if(!DP) return K(int);
    do DP = DP.substring(0, places);
    while(DP[--places]=="0");
    return new K(DP && `${int}.${DP}` || int);
  };
  K.valueOf = K.toNumber = function(){return N(kdx);};
}

KerdoxNumber.setDecimalPlaces = function(places){
  BigNumber.config({DECIMAL_PLACES: places});
}


module.exports = KerdoxNumber;
