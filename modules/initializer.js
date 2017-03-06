const [fetch, seeder, storage] = [require("node-fetch"), require("../utils/seeder"), require("node-persist")];

// function init(cb){
//   let [len, url, array] = [10, "https://script.google.com/macros/s/AKfycbwL7RIptTjOcXnNlhoCQOQNRA_nE9qcKsVgS06pPi9e3xZszc9V/exec", []];
//   while(len--) array.push(fetch(`${url}?format=unix`).then(res=>{
//     if(!res.ok) return console.log("shit happened");
//     return res.text().then(text=>console.log(text) || text);
//   }));
//   return Promise.all(array).then(res=>{
//     storage.setItemSync("pool", res);
//     if(cb && typeof cb==="function") return cb(res);
//     return new Promise((resolve, reject)=>resolve(res));
//   });
// }

function init(cb){
  return Promise.resolve(seeder.generateEntropy()).then(ret=>{
    console.log(ret);
    console.log("init completed");
    if(cb && typeof cb==="function") return cb();
    return new Promise((res,rej)=>res());
  }).catch(e=>console.log("INIT") || console.log(e));
}


module.exports = init;