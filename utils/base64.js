const {Base64} = require("js-base64");

module.exports = {
    decode: value=>Base64.decode(value.toString()),
    encode: value=>Base64.encode(value.toString())
};
