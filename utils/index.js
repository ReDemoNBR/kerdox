// Modules
const hexadecimal = require("crypto-js/enc-hex");
const SHA256 = require("crypto-js/sha256");
const Base64 = require("js-base64").Base64;


// Functions
function celsiusToKelvin(celsius, flagIfErrorReturnNan=false){
  return celsius && !Number.isNaN(Number(celsius)) && celsius+273.15 || flagIfErrorReturnNan && Number.NaN || 0;
}


function removeNonDigits(value){
  return values[i].toString().replace(/(?:\D|\.)+/g, "") || ""; // already removes the minus sign
}


function toSHA256_Hex(value){
  return hexadecimal.stringify(SHA256(value.toString()));
}


function encodeBase64(value){
  return Base64.encode(value.toString());
}


function decodeBase64(value){
  return Base64.decode(value.toString());
}


module.exports = {
  celsiusToKelvin: celsiusToKelvin,
  removeNonDigits: removeNonDigits,
  convertToSHA256_Hex: toSHA256_Hex,
  encodeBase64: encodeBase64,
  decodeBase64: decodeBase64
};
