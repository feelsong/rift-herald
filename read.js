var fs = require("fs");
console.log("\n *START* \n");


var gameObjs = [];

[ ...Array(70).keys() ].forEach((n)=> {
  var content = fs.readFileSync(`match/${n}.json`);
  gameObjs.push( JSON.parse(JSON.parse(content)) );
});


console.log(gameObjs.length);

//BLUE => team id 100
//RED  => team id 200

var riftHeraldStats = gameObjs.reduce((x, y) => {
  console.log('numbers so far', x);
  console.log('game id', y.gameId);
  console.log('teams win', y.teams[0].win === 'Win' ? 'blue team win': 'red team win');
  let blueTeamWin = y.teams[0].win === 'Win';
  let redTeamWin = y.teams[1].win === 'Win';
  console.log('number of rift herald by blue', y.teams[0].riftHeraldKills);
  console.log('number of rift herald by red', y.teams[1].riftHeraldKills);
  console.log('total rift:', y.teams[0].riftHeraldKills + y.teams[1].riftHeraldKills);

  // return x + y.teams[0].riftHeraldKills;
  x.numRed += y.teams[1].riftHeraldKills;
  x.numBlue += y.teams[0].riftHeraldKills;
  x.numRedWin += redTeamWin;
  x.numBlueWin += blueTeamWin;
  return x;

},{numRed: 0, numBlue: 0, numRedWin: 0, numBlueWin: 0});

console.log('riftHeraldStats', riftHeraldStats);
