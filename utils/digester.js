const toHex = require("crypto-js/enc-hex").stringify;

module.exports = {
  SHA256_Hex: value=>toHex(require("crypto-js/sha256")(value.toString())),
  SHA512_Hex: value=>toHex(require("crypto-js/sha512")(value.toString())),
  SHA3_Hex: value=>toHex(require("crypto-js/sha3")(value.toString()))
};
