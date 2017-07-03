const BN = require("bignumber.js"), BigNumber = BN.another();
BigNumber.config({ERRORS: false, EXPONENTIAL_AT: 100});

//constructor
function KerdoxNumber(number){
    this.value = number;
}

//shortcuts
const [K, P, N, B] = [KerdoxNumber, KerdoxNumber.prototype, Number, BigNumber];


K.setDecimalPlaces = function(places){
    BigNumber.config({DECIMAL_PLACES: places});
};


// KerdoxNumber Prototype functions

//converts the value to absolute
P.absolute = P.abs = function(){
    return new K(this.value.toString().startsWith("-") && this.value.substring(1) || this.value.toString());
};

//converts the value to a BigNumber
P.BigNumber = P.toBigNumber = function(){
    return BN(this.value, 10);
};

//rounds up the value to the closest value with the ammount of places given or to the nearest integer
P.ceil = P.roundUp = function(places=0){
    let [int, DP] = this.value.split(/\./);
    if(!DP) return K(int);
    if(int[0]!="-" && DP.length>=places)
        return K(B(`${int}.${DP.substring(0, places)}`, 10).add(B(`1e-${places}`, 10)).toString());
    do DP = DP.substring(0, places);
    while(DP[--places]=="0");
    return new K(DP && `${int}.${DP}` || int);
};

//rounds down the value to the closest value with the ammount of places given or to the nearest integer
P.floor = P.roundDown = function(places=0){
    let [int, DP] = this.value.toString().split(/\./);
    if(!DP) return K(int);
    if(int[0]=="-" && DP && DP.length>=places)
        return new K(B(`${int}.${DP.substring(0, places)}`, 10).minus(B(`1e-${places}`, 10)).toString());
    do DP = DP.substring(0, places);
    while(DP[--places]=="0");
    return new K(DP && `${int}.${DP}` || int);
};

//rounds the value to the nearest single-precision float number
P.fround = P.floatRound = P.toSinglePrecision = function(){
    return new K(Math.fround(N(this.value)).toString());
};

//rounds the value to the closest value with the ammount of places given or to the nearest integer
P.round = function(places=0){
    let [int, DP] = this.value.split(/\./);
    if(!DP) return K(int);
    if(int[0]=="-") return K(N(DP[places])>=5 && K.floor(places) || K.ceil(places)); //TODO: test if K.floor and K.ceil work in here
    return new K(N(DP[places])>=5 && K.ceil(places) || K.floor(places));
};

//converts the value to a string with an optional radix
P.toString = function(radix=10){
    return B(this.value, 10).toString(radix);
};

//truncates the number by a specified ammount of places or to the nearest integer
P.truncate = P.floorRound = function(places=0){
    let [int, DP] = this.value.split(/\./);
    if(!DP) return K(int);
    do DP = DP.substring(0, places);
    while(DP[--places]=="0");
    return new K(DP && `${int}.${DP}` || int);
};

//returns the value as a Number
P.valueOf = P.toNumber = function(){
    return N(this.value);
};


module.exports = KerdoxNumber;
