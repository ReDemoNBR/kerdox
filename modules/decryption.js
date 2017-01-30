const RNG = require("./RNG");
const {computeSHA256, decodeBase64} = require("../utils");


function decrypt(message, key){
  let decoded = decodeBase64(message.toString()), byteArray = [];
  RNG.setTempSeed(convertToSHA256_Hex(key.toString()).substring(32));
  for(let i=0; i<decoded.length; i++)
    byteArray.push(decoded.charCodeAt(i));
  let fromCharCode = String.fromCharCode, decrypt = "";
  for(let i=0; i<byteArray.length; i++)
    decrypt += fromCharCode(byteArray[i]-RNG.randomNumber("-32768", "32768", "int", true));
  return decrypt;
}

module.exports = decrypt;
