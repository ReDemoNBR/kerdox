//external modules
const [storage, deasync] = [require("node-persist"), require("deasync-promise")];

//internal modules
const [{populatePool, getPoolLength}, {setMaxCountBytes, setDecimalPlaces}, config] = [require("../utils/seeder"), require("./RNG"), require("./config")];


module.exports = options=>{
    if(options){
        options.maxCountBytes && setMaxCountBytes(options.maxCountBytes);
        options.decimalPlaces && setDecimalPlaces(options.decimalPlaces);
        options.config && config(options.config);
    }
    storage.initSync();
    options && options.clear && storage.clearSync();
    storage.getItemSync("pool").length < getPoolLength() && deasync(populatePool());
};