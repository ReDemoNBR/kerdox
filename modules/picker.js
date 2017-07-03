const random = require("./RNG").randomNumber;


function picker(list, quantity, repetition){
    let out = [];
    if(repetition){
        let len = String(list.length);
        while(quantity--) out.push(list[random("0", len, "int")]);
        return out;
    }
    while(quantity--) out.push(list.splice(random("0", String(list.length), "int"), 1));
    return out;
}


module.exports = picker;
