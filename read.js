var fs = require("fs");
console.log("\n *START* \n");


var gameObjs = [];

[ ...Array(70).keys() ].forEach((n)=> {
  var content = fs.readFileSync(`${n}.json`);
  gameObjs.push( JSON.parse(JSON.parse(content)) );
});


console.log(gameObjs.length);

var numberOfRiftHeralds = gameObjs.reduce((x, y) => {
  console.log('numbers so far', x);
  console.log('game id', y.gameId);
  console.log('number of rift herald by blue', y.teams[0].riftHeraldKills);
  console.log('number of rift herald by red', y.teams[1].riftHeraldKills);
  console.log('total rift:', y.teams[0].riftHeraldKills + y.teams[1].riftHeraldKills);

  return x + y.teams[0].riftHeraldKills;

},0);

console.log('numberOfRiftHeralds', numberOfRiftHeralds);
