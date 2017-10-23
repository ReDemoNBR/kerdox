const {randomNumber: random} = require("./RNG");


function shuffle(list){
    let [out, listCopy] = [[], list.map(i=>i)];
    while(listCopy.length) out.push(listCopy.splice(random("0", String(listCopy.length), "int"), 1)[0]);
    return out;
}


module.exports = shuffle;