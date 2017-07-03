const RNG = require("./RNG");
const {computeSHA256, encodeBase64} = require("../utils");

function encrypt(message, key){
    RNG.setTempSeed(computeSHA256(key.toString()).substring(32));
    let [encrypt, fromCharCode] = ["", String.fromCharCode];
    message = message.toString();
    for(let i=0; i<message.length; i++)
        encrypt += fromCharCode(message.charCodeAt(i)+RNG.randomNumber("-32768", "32768", "int", true));
    return encodeBase64(encrypt);
}

module.exports = encrypt;
