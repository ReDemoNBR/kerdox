//external modules
const storage = require("node-persist");

//internal modules
const {populatePool, getPoolLength} = require("../utils/seeder");

//DONE:70 [async init] add a flag to allow clearing or not the storage, so it can be force cleared or reused in case of reinitializations id:11

//DONE:90 make init async script use async calls to "clear" and "init" node-persist for better async performance id:7
module.exports = (cb, options)=>{
    if(!options && typeof cb==="object") [options, cb] = [cb, options];
    return storage.init().then(()=>(options && options.clear) && storage.clear() || new Promise(res=>res())).then(()=>storage.getItem("pool"))
        .then(pool=>pool && !pool.length < getPoolLength() && new Promise(res=>res()) || new Promise(res=>res(populatePool())))
        .then(()=>cb && typeof cb==="function" && cb() || new Promise(res=>res())).catch(e=>console.log("INIT ASYNC ERROR", e) || new Promise((res, rej)=>rej(e)));
};