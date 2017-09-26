const BigNumber = require("bignumber.js"), [N, B] = [Number, BigNumber.another()];
B.config({ERRORS: false, EXPONENTIAL_AT: 100});


//constructor
function KerdoxNumber(number){
    this.value = number;
    this.__proto__.bigNumber = B(this.value, 10);
    this.__proto__.number = N(this.value);
}

// KerdoxNumber shortcuts
const [K, P, PP] = [KerdoxNumber, KerdoxNumber.prototype, KerdoxNumber.prototype.__proto__];


// KerdoxNumber functions
K.setDecimalPlaces = function(places){
    B.config({DECIMAL_PLACES: places});
};


// KerdoxNumber Prototype functions

//converts the value to absolute
P.absolute = P.abs = function(){
    return new K(this.bigNumber.abs().toString());
};

//converts the value to a BigNumber
P.BigNumber = P.toBigNumber = function(){
    return this.bigNumber;
};

//rounds up the value to the closest value with the ammount of places given or to the nearest integer
P.ceil = P.roundUp = function(places=0){
    let factor = B(10).pow(places);
    return new K(this.bigNumber.times(factor).ceil().div(factor).toString());
    //
    // let [int, DP] = this.value.split(/\./);
    // if(!DP) return K(int);
    // if(int[0]!="-" && DP.length>=places)
    //     return K(B(`${int}.${DP.substring(0, places)}`, 10).add(B(`1e-${places}`, 10)).toString());
    // do DP = DP.substring(0, places);
    // while(DP[--places]=="0");
    // return new K(DP && `${int}.${DP}` || int);
};

//rounds down the value to the closest value with the ammount of places given or to the nearest integer
P.floor = P.roundDown = function(places=0){
    let factor = B(10).pow(places);
    return new K(this.bigNumber.times(factor).floor().div(factor).toString());
    // let [int, DP] = this.value.toString().split(/\./);
    // if(!DP) return K(int);
    // if(int[0]=="-" && DP && DP.length>=places)
    //     return new K(B(`${int}.${DP.substring(0, places)}`, 10).minus(B(`1e-${places}`, 10)).toString());
    // do DP = DP.substring(0, places);
    // while(DP[--places]=="0");
    // return new K(DP && `${int}.${DP}` || int);
};

//rounds the value to the nearest single-precision float number
P.fround = P.floatRound = P.toSinglePrecision = function(){
    return new K(Math.fround(this.number).toString());
};

//checks if the value is negative
P.isNegative = P.isNeg = function(){
    return this.bigNumber.isNeg();
};

//checks if the value is positive
P.isPositive = P.isPos = function(){
    return !this.isNegative() && !this.bigNumber.isZero();
};

P.isZero = function(){
    return this.bigNumber.isZero();
};

//rounds the value to the closest value with the ammount of places given or to the nearest integer
P.round = function(places=0){
    let factor = B(10).pow(places);
    return new K(this.bigNumber.times(factor).round().div(factor).toString());
    // let [int, DP] = this.value.split(/\./);
    // if(!DP) return K(int);
    // if(int[0]=="-") return K(N(DP[places])>=5 && K.floor(places) || K.ceil(places));
    // return new K(N(DP[places])>=5 && K.ceil(places) || K.floor(places));
};

//returns the sign of the number
P.sign = function(){
    return this.bigNumber.s;
};

//converts the value to a string with an optional radix
P.toString = function(radix=10){
    return this.bigNumber.toString(radix);
};

//truncates the number by a specified ammount of places or to the nearest integer
P.trunc = P.truncate = P.floorRound = function(places=0){
    let factor = B(10).pow(places);
    return new K(this.bigNumber.times(factor).trunc().div(factor).toString());
    // let [int, DP] = this.value.split(/\./);
    // if(!DP) return K(int);
    // do DP = DP.substring(0, places);
    // while(DP[--places]=="0");
    // return new K(DP && `${int}.${DP}` || int);
};

//returns the value as a Number
PP.valueOf = P.toNumber = function(){
    return this.number;
};

module.exports = KerdoxNumber;
