const [RNG, encryption, decryption] = [require("./modules/RNG"), require("./modules/encryption"), require("./modules/decryption")];


// decrypt({String} message, {String} key) --> decrypts a message that was encrypted in Kerdox with the given key
function decrypt(message, key){
  return decryption(message, key);
}


// encrypt({String} message, {String} key) --> encrypts a message with the given key
function encrypt(message, key){
  return encryption(message, key);
}


// randomFloat({String|Number} min, {String|Number} max) --> generates a random float number from the interval of [min, max[
// randomFloat({String|Number} max) --> generates a random float number from the interval of [0, max[
// randomFloat() --> generates a random float number from the interval of [0,1[
function randomFloat(min, max){
  if(!max){
    if(!min) [min, max] = ["0", "1"];
    else [min, max] = ["0", min];
  }
  console.log(`generating a random float: [${min}, ${max}[`);
  return RNG.randomNumber(String(min), String(max), "float");
}


// randomInt({String|Number} min, {String|Number} max) --> generates a random integer number from the interval of [min,max[
// randomInt({String|Number} max) --> generates a random integer number from the interval of [0, max[
// randomInt() --> generates a random integer number from the interval of [0, 4294967296[
function randomInt(min, max){
  if(!max){
    if(!min) [min, max] = ["0", "4294967296"];
    else [min, max] = ["0", min];
  }
  console.log(`generating a random integer: [${min}, ${max}[`);
  return out;
}

module.exports = {
  float: randomFloat,
  int: randomInt,
  encrypt: encrypt,
  decrypt: decrypt
}
