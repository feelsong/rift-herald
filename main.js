const axios = require('axios');
const puppeteer = require('puppeteer');
const fs = require('fs');

var matchs = [
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT06/1170847?gameHash=2e7e73269d0dabea",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT06/1170837?gameHash=faf5972d70505a1d",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT06/1170778?gameHash=80d7ff8f4dd3375a",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT06/1170767?gameHash=cf956dbd7cb0aebb",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT06/1170753?gameHash=d944a6616b58dbb8",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT06/1170738?gameHash=34d1f165c86cc6d2",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1334696?gameHash=1febcd089ab78547",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1334671?gameHash=b85934dfba1d1627",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1334645?gameHash=35568c480ea8ff4b",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1334618?gameHash=64776d769c7db475",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1332066?gameHash=62a9c341a0c34fe1",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1332030?gameHash=a89d3f034667b825",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1331601?gameHash=b043623e0f47777e",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1331568?gameHash=11acd6708c7cad7a",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1331545?gameHash=3418aa32bce7a282",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1331501?gameHash=8fad6129ef19933a",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1331220?gameHash=10f35076996a6621",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1331198?gameHash=865cf8f4c9a9ff5c",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1331180?gameHash=5a0ddcebc0229bc3",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT03/1331160?gameHash=8aa6d0250be2f5c6",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1295398?gameHash=586d92ddc8df44c0",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1295365?gameHash=ee7e9294ecd6b500",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1294954?gameHash=2f3df3a57727a752",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1294934?gameHash=886bd129f922d05d",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1294908?gameHash=9a87881608cf40ae",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1294879?gameHash=f3bae7317006aaf7",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1294512?gameHash=f25ed08dc759d124",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1294500?gameHash=49adcc216aa5302a",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1294482?gameHash=edd94a211f54bb4a",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1294462?gameHash=34bd51d69a3d105c",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1292006?gameHash=6e37b7c491e66e62",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1291972?gameHash=a60dff3eb8156c50",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1281605?gameHash=e0c56dfd764b897f",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1281574?gameHash=4020853380946f25",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1281549?gameHash=619121e0c8b1a5bb",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1281506?gameHash=c4160f449b403895",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1281322?gameHash=e961b42dd7bcd270",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1281307?gameHash=3270b681b90ee794",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1281281?gameHash=6be05d6df4ef6b82",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1281254?gameHash=a1b1aebb5ed0af3a",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1295402?gameHash=560c984fc1ba1168",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1295383?gameHash=072ee1028f03f4c9",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1304785?gameHash=13054e8f14fcae76",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1304768?gameHash=6ed6e9d7108f27e0",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1304739?gameHash=b80bb99cbce5bd71",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1304700?gameHash=b50bc9265ac35f9f",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1304399?gameHash=2536b98ac19e617d",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1304391?gameHash=72ad86120a14eb54",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1304374?gameHash=175112ba57cbce5e",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1304356?gameHash=fc584c5143087c0b",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1292354?gameHash=79845cdf9a6e88db",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1292345?gameHash=6f86444cce429244",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1291835?gameHash=a75ab48a22470022",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1291812?gameHash=e540d208bbc69bb3",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1291789?gameHash=51e5ed28085fd299",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1291748?gameHash=7a3c085cf703d7bd",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1291458?gameHash=49cc14d02ccd0674",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1291442?gameHash=28f7b485f710168f",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1291426?gameHash=83c7c51530ea074e",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT01/1291406?gameHash=5220923eb35c42c6",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1271104?gameHash=20332c0660059ff8",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1271091?gameHash=d31d642fb546e43e",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1270874?gameHash=d22ded3c46abb9b8",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1270866?gameHash=ff717fb95b6a5131",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1270857?gameHash=33123e45a2046e53",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1270837?gameHash=66974bf071ea38eb",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1270607?gameHash=e51fbfc18213ad87",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1270592?gameHash=7fa61eb33bd32bfc",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1270576?gameHash=a054564b4232b1fc",
          "https://acs.leagueoflegends.com/v1/stats/game/ESPORTSTMNT02/1270555?gameHash=48cc4673e669584b",
];

var cookie = process.env.cookie; //ACCESS COOKIE & API_KEY




matchs.forEach((match, i)=> {
  console.log(`getting ${i} matches: `, match);
  setTimeout(()=> {
    axios.request({
         url: match,
         method: "get",
         headers:{
             Cookie: cookie
           }
    }).then((res)=> {
      console.log('got responese from ' + i);
      // console.log(JSON.stringify(res.data));
      const content = JSON.stringify(res.data);
        fs.writeFile(`${i}.json`, JSON.stringify(content),'utf-8',()=> {
            console.log('done writing');
        });
    });
  }, 3000*i);

})
