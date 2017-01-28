const random = require("./RNG").randomInt;

// function picker({Number} quantity, {Item} item1, {Item} item2, {Item} item3, ..., {Item} itemX)
// function picker({Array} list, {Number} quantity=1, {Boolean} repetition=false)
// function picker({Array} list, {Number} quantity=1)
// function picker({Array} list)
function picker(quantity, ...args){
  let list, repetition;
  if(typeof quantity==="number") [quantity, list, repetition] = [Math.floor(Math.abs(list)), args, false];
  else [list, quantity, repetition] = [quantity, Math.floor(Math.abs(args[0])) || 1, Boolean(args[1])];
  let result = [];
  if(repetition){
    let len = list.length;
    while(quantity--) result.push(list[random("0", len)])
    return result;
  }
  while(quantity--) result.push(list.splice(random("0", String(list.length), 1)));
  return result;
}
