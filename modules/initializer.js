//external modules
const storage = require("node-persist");

//internal modules
const [{populatePool, getPoolLength}, {setMaxCountBytes, setDecimalPlaces}, config] = [require("../utils/seeder"), require("./RNG"), require("./config")];


module.exports = (cb, options)=>{
    if(!options && typeof cb==="object") [options, cb] = [cb, options];
    if(options){
        options.maxCountBytes && setMaxCountBytes(options.maxCountBytes);
        options.decimalPlaces && setDecimalPlaces(options.decimalPlaces);
        options.config && config(options.config);
    }
    return storage.init().then(()=>(options && options.clear) && storage.clear() || new Promise(res=>res())).then(()=>storage.getItem("pool"))
        .then(pool=>pool && !pool.length < getPoolLength() && new Promise(res=>res()) || new Promise(res=>res(populatePool())))
        .then(()=>cb && typeof cb==="function" && cb() || new Promise(res=>res())).catch(e=>console.log("INIT ASYNC ERROR", e) || new Promise((res, rej)=>rej(e)));
};