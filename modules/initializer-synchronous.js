//external modules
const [storage, deasync] = [require("node-persist"), require("deasync-promise")];

//internal modules
const {populatePool, getPoolLength} = require("../utils/seeder");

//DONE:80 [sync init] add a flag to allow clearing or not the storage, so it can be force cleared or reused in case of reinitializations id:10
module.exports = options=>{
    storage.initSync();
    options && options.clear && storage.clearSync();
    storage.getItemSync("pool").length < getPoolLength() && deasync(populatePool());
};