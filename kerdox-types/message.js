const [{decode: base64Decode, encode: base64Encode}, decrypt, encrypt] = [require("../utils/base64"), require("../modules/decryption"), require("../modules/encryption")];

function KerdoxMessage(message){
    this.value = message;
}

const K = KerdoxMessage.prototype;

// function save(path, filename, callback)
// function save(path, filename) --> returns Promise
// function save(location, callback) --> location contains the filename
// function save(location) --> returns Promise
K.save = K.saveToFile = K.toFile = K.write = K.writeFile = function(path, filename, callback){
    let location;
    if(!callback)
        if(!filename) location = path; //save(location);
        else if(typeof filename==="function") [location, callback] = [path, filename]; //save(location, callback);
        else location = `${path}${path.endsWith("/") && "" || "/"}${filename}`; //save(path, filename);
    else location = `${path}${path.endsWith("/") && "" || "/"}${filename}`; //save(path, filename, callback);
    return require("fs").writeFile(location, this.value, e=>!callback && new Promise((res, rej)=>e && rej(e) || res(this)) || callback(this, e));
};

K.decrypt = function(key){
    return new KerdoxMessage(decrypt(this.value, key));
};

K.encrypt = function(key){
    return new KerdoxMessage(encrypt(this.value, key));
};

K.toString = function(){
    return this.value.toString();
};

K.toBuffer = K.toNodeBuffer = function(){
    return Buffer.from(base64Decode(this.value));
};

K.toArrayBuffer = K.toByteArray = K.toUint8Array = K.toUInt8Array = function(){
    return Uint8Array.from(this.toBuffer().buffer);
};

K.toArray = K.toUntypedArray = function(){
    return Array.from(K.toByteArray());
};

K.valueOf = function(){
    return this.value;
};


module.exports = KerdoxMessage;