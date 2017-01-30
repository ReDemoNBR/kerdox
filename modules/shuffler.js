const random = require("./RNG").randomNumber;


function shuffle(list){
  let out = [];
  while(list.length) out.push(list.splice(random("0", String(list.length), "int"), 1));
  return out;
}


module.exports = shuffle;
