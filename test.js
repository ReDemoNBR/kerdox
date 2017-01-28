/*const Kerdox = require("./kerdox");

let original = "hello world", cypher = "foo";
console.log(`${original}, ${cypher}`);
let encrypted = Kerdox.encrypt(original, cypher);
console.log("encrypted message", encrypted);
let decrypted = Kerdox.decrypt(encrypted, "bar");
console.log("decrypted message", decrypted);
*/

/*function pikachu(){
  return "Pika pika";
}

pikachu.attack = function(){
  return "Choque do trovão";
}
pikachu.defense = "PIKACHU DEFENSE PROP";
pikachu.toString = ()=>"Pikachu";
pikachu.valueOf = ()=>100;
console.log("//// TESTS ////");
console.log(`pikachu ${pikachu}`);
console.log(`pikachu() ${pikachu()}`);
console.log(`pikachu.attack() ${pikachu.attack()}`);
console.log(`pikachu.defense ${pikachu.defense}`);
console.log(`pikachu.toString() ${pikachu.toString()}`);
console.log(`pikachu < 10 ${pikachu<10}`);
console.log(`pikachu < 200 ${pikachu<200}`);
console.log(`pikachu-20 ${pikachu-20}`);
console.log(`pikachu-10 ${pikachu-10}`);
*/

/*let x = "200";
x.toString = ()=>String(x);
x.valueOf = ()=>Number(x);

console.log(`x = ${x}`);
console.log(`x.toString() = ${x.toString()}`);
console.log(`x < 100 = ${x<100}`);
console.log(`x < 300 = ${x<300}`);
*/

const storage = require("node-persist");
storage.initSync();
// storage.setItemSync("foo", "bar");
storage.clearSync();
console.log(storage.getItemSync("count"));
