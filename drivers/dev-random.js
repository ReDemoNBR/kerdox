const {randomBytes} = require("crypto");

module.exports = ()=>new Promise(res=>res(randomBytes(64).toString("hex")));