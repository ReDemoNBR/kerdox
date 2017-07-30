const [{decode: base64Decode, encode: base64Encode}, decrypt, encrypt, CryptoJS, FS] = [
    require("../utils/base64"), require("../modules/decryption"), require("../modules/encryption"), require("crypto-js"), require("FS")
];

function KerdoxMessage(message){
    this.value = message;
}

// TODO:0 Rename "KerdoxMessage" to "KerdoxStream"
// KerdoxMessage shortcuts
const [K, P, PP] = [KerdoxMessage, KerdoxMessage.prototype, KerdoxMessage.prototype.__proto__];


// KerdoxMessage methods
// DOING:30 checksum of any stream
K.checksum = function(data, algorithm){
    return CryptoJS[algorithm.toUpperCase()]((typeof data!=="string" && !Buffer.isBufer(data) || Array.isArray(data)) && Buffer.from(data).toString("hex") || data);
};


// KerdoxMessage Prototype methods

// function save(path, filename, callback)
// function save(path, filename) --> returns Promise
// function save(location, callback) --> location contains the filename
// function save(location) --> returns Promise
P.save = P.saveToFile = P.writeFile = function(path, filename, callback){
    let location;
    if(!callback)
        if(!filename) location = path; //save(location);
        else if(typeof filename==="function") [location, callback] = [path, filename]; //save(location, callback);
        else location = `${path}${path.endsWith("/") && "" || "/"}${filename}`; //save(path, filename);
    else location = `${path}${path.endsWith("/") && "" || "/"}${filename}`; //save(path, filename, callback);
    return FS.writeFile(location, this.value, e=>!callback && new Promise((res, rej)=>e && rej(e) || res(this)) || callback(this, e));
};

// function saveSync(path, filename) --> returns undefined
// function saveSync(location) --> returns undefined
P.saveSync = P.saveToFileSync = P.writeFileSync = function(path, filename){
    let location = !filename && path || `${path}${path.endsWith("/") && "" || "/"}${filename}`;
    return FS.writeFileSync(location, this.value);
};

P.decrypt = function(key){
    return new KerdoxMessage(decrypt(this.value, key));
};

P.encrypt = function(key){
    return new KerdoxMessage(encrypt(this.value, key));
};

P.getMD5 = P.getMD5Sum = function(){
    return this.hash("MD5");
};

P.getSHA1 = P.getSHA1Sum = function(){
    return this.hash("SHA1");
};

P.getSHA224 = P.getSHA224Sum = function(){
    return this.hash("SHA224");
};

P.getSHA256 = P.getSHA256Sum = function(){
    return this.hash("SHA256");
};

P.getSHA384 = P.getSHA384Sum = function(){
    return this.hash("SHA384");
};

P.getSHA512 = P.getSHA512Sum = function(){
    return this.hash("SHA512");
};

P.getSHA3 = P.getSHA3Sum = function(){
    return this.hash("SHA13");
};

P.getHmacMD5 = P.getHmacMD5Sum = function(){
    return this.hmac("HmacMD5");
};

P.getHmacSHA1 = P.getHmacSHA1Sum = function(){
    return this.hmac("HmacSHA1");
};

P.getHmacSHA224 = P.getHmacSHA224Sum = function(){
    return this.hmac("HmacSHA224");
};

P.getHmacSHA256 = P.getHmacSHA256Sum = function(){
    return this.hmac("HmacSHA256");
};

P.getHmacSHA384 = P.getHmacSHA384Sum = function(){
    return this.hmac("HmacSHA384");
};

P.getHmacSHA512 = P.getHmacSHA512Sum = function(){
    return this.hmac("HmacSHA512");
};

P.getHmacSHA3 = P.getHmacSHA3Sum = function(){
    return this.hmac("HmacSHA3");
};

PP.hash = function(algorithm){
    if(!algorithm || typeof algorithm !== "string") throw Error(`${algorithm} is not a valid string identifier supported by CryptoJS. Read CryptoJS documentation for more information on supported digest algorithms`);
    return CryptoJS[algorithm.toUpperCase()](this.value).toString();
};

PP.hmac = function(algorithm, key){
    if(!algorithm || typeof algorithm !== "string") throw Error(`${algorithm} is not a valid string identifier supported by CryptoJS. Read CryptoJS documentation for more information on supported HMAC algorithms`);
    return CryptoJS[algorithm](this.value, key).toString();
};

P.toString = function(){
    return this.value.toString();
};

P.toBuffer = P.toNodeBuffer = function(){
    return Buffer.from(base64Decode(this.value));
};

P.toArrayBuffer = P.toByteArray = P.toUint8Array = P.toUInt8Array = function(){
    return Uint8Array.from(this.toBuffer().buffer);
};

P.toArray = P.toUntypedArray = function(){
    return Array.from(this.toByteArray());
};

P.valueOf = function(){
    return this.value;
};


module.exports = KerdoxMessage;