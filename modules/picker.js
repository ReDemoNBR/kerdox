const {randomNumber: random} = require("./RNG");


function picker(list, quantity, repetition){
    let out = [];
    if(repetition){
        let len = String(list.length);
        while(quantity--) out.push(list[random("0", len, "int").toString()]);
        return out;
    }
    let listCopy = list.map(i=>i);
    while(quantity--) out.push(listCopy.splice(random("0", String(listCopy.length), "int").toString(), 1)[0]);
    return out;
}


module.exports = picker;