//external modules
const [{readFile}, {promisify}] = [require("fs"), require("util")];

//internal modules
const {CITIES_JSON} = require("../constants");

module.exports = ()=>promisify(readFile(CITIES_JSON)).then(db=>JSON.parse(db)).catch(e=>console.log("error loading Cities JSON file", e));