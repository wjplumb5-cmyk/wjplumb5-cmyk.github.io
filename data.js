/* Action 3:18p MT 9/12 clerk. Spreads are the board. Filter decides the count. */
const TAKES = [
  {rank:1, line:"Under 66", juice:"-110 FD", away:"UTSA", home:"Texas State", kick:"Sat 3:30p ET", why:"Highest total. Filter TAKE.", tag:"logged", key:"utsa"},
  {rank:2, line:"Under 59.5", juice:"-110 FD", away:"Navy", home:"Florida Atlantic", kick:"Sat 7:30p ET", why:"FBS–FBS, shopped total >=55.", tag:"logged", key:"navy"},
  {rank:3, line:"Under 59.5", juice:"-110 FD", away:"Charlotte", home:"Ole Miss", kick:"Sat 7:45p ET", why:"FBS–FBS, shopped total >=55.", tag:"logged", key:"charlotte"},
  {rank:4, line:"Under 58.5", juice:"-110 FD", away:"UNLV", home:"North Texas", kick:"Sat 3:45p ET", why:"FBS–FBS, shopped total >=55.", tag:"logged", key:"unlv"},
  {rank:5, line:"Under 58.5", juice:"-110 FD", away:"Louisiana", home:"USC", kick:"Sat 11:00p ET", why:"FBS–FBS, shopped total >=55.", tag:"logged", key:"louisiana"},
  {rank:6, line:"Under 58", juice:"-110 FD", away:"Utah State", home:"Washington", kick:"Final 14-16", why:"52 total. Under 58.", tag:"logged", key:"usu", final:"14-16", result:"W"},
  {rank:7, line:"Under 57.5", juice:"-110 FD", away:"California", home:"Syracuse", kick:"Sat 3:30p ET", why:"Filter add.", tag:"add", key:"cal"},
  {rank:8, line:"Under 56.5", juice:"-110 FD", away:"App State", home:"East Carolina", kick:"Final 27-24", why:"51 total.", tag:"add", key:"appst", final:"27-24", result:"W"},
  {rank:9, line:"Under 56.5", juice:"-110 FD", away:"Southern Miss", home:"Auburn", kick:"Sat 7:45p ET", why:"Filter TAKE.", tag:"logged", key:"usm"},
  {rank:10, line:"Under 55.5", juice:"-110 FD", away:"Oregon", home:"Oklahoma State", kick:"Final 31-39", why:"70 total. Favorite lost and both sides scored.", tag:"logged", key:"oregon", final:"31-39", result:"L"},
  {rank:11, line:"Under 55.5", juice:"-110 FD", away:"Western Kentucky", home:"Georgia", kick:"Final 20-70", why:"90 total. Power home favorite hung 50+.", tag:"logged", key:"wku", final:"20-70", result:"L"},
  {rank:12, line:"Under 55.5", juice:"-110 FD", away:"UCF", home:"Pittsburgh", kick:"Sat 3:30p ET", why:"Filter add.", tag:"add", key:"ucf"},
  {rank:13, line:"Under 55.5", juice:"-110 FD", away:"Georgia State", home:"Kennesaw State", kick:"Sat 7:00p ET", why:"Filter add.", tag:"add", key:"gsu"},
  {rank:14, line:"Under 55.5", juice:"-110 FD", away:"Middle Tennessee", home:"Marshall", kick:"Sat 7:00p ET", why:"Filter add.", tag:"add", key:"mtsu"},
  {rank:15, line:"Under 55.5", juice:"-110 FD", away:"Louisiana Tech", home:"LSU", kick:"Sat 7:30p ET", why:"Filter TAKE. Steam on LSU is a spread sit, not a total paper.", tag:"add", key:"latech"},
  {rank:16, line:"Under 55.5", juice:"-110 FD", away:"Arkansas", home:"Utah", kick:"Sat 10:15p ET", why:"Filter add.", tag:"add", key:"ark"},
  {rank:17, line:"Under 55.5", juice:"-110 FD", away:"Rice", home:"Notre Dame", kick:"Final 0-52", why:"52 total. Under 55.5.", tag:"logged", key:"rice", final:"0-52", result:"W"}
];
const WATCHES = [
  {rank:1, line:"North Texas +3", juice:"-110 FD", away:"UNLV", home:"North Texas", kick:"Sat 3:45p ET", why:"Public 63% UNLV. Line -6.5 → -3 against them. Money 12 off tickets on North Texas.", an:"Action 3:18p MT · 63% tix UNLV / 51% money · RLM+MONEY", key:"unlv", source:"action"},
  {rank:2, line:"Florida Atlantic +3.5", juice:"-110 FD", away:"Navy", home:"Florida Atlantic", kick:"Sat 7:30p ET", why:"Public 72% Navy. Line -6.5 → -3.5 against them. Reverse line move.", an:"Action 3:18p MT · 72% tix Navy / 61% money · RLM", key:"navy", source:"action"},
  {rank:3, line:"Rutgers +3", juice:"-110 FD", away:"Rutgers", home:"Boston College", kick:"Final 21-28", why:"Money 21 off tickets on Rutgers. Follow the money. Lost by 7.", an:"Action 3:18p MT · 44% tix Rutgers / 65% money · MONEY", key:"rutgers", source:"action", final:"21-28", result:"L"},
  {rank:4, line:"UTSA +2.5", juice:"-110 FD", away:"UTSA", home:"Texas State", kick:"Sat 3:30p ET", why:"Money 12 off tickets on UTSA.", an:"Action 3:18p MT · 54% tix UTSA / 66% money · MONEY", key:"utsa", source:"action"},
  {rank:5, line:"Buffalo +10", juice:"-110 FD", away:"Buffalo", home:"Florida International", kick:"Sat 6:00p ET", why:"Money 20 off tickets on Buffalo. Extended handle.", an:"Action 3:18p MT · 50% tix Buffalo / 70% money · MONEY", key:"buf", source:"action"},
  {rank:6, line:"New Mexico State +7", juice:"-110 FD", away:"New Mexico State", home:"Hawaii", kick:"Sat 11:59p ET", why:"Money 21 off tickets on New Mexico State.", an:"Action 3:18p MT · 50/71 on NMSU · MONEY", key:"nmsu", source:"action"},
  {rank:7, line:"Mississippi State PK", juice:"-110 FD", away:"Mississippi State", home:"Minnesota", kick:"Final 38-13", why:"77% tickets and 82% money on Miss St at a coin-toss number. Follow, do not fade. Covered PK 38-13.", an:"Action 3:18p MT · 77/82 · FOLLOW", key:"msst", source:"action", final:"38-13", result:"W"},
  {rank:8, line:"Memphis +9.5", juice:"-110 FD", away:"Memphis", home:"Boise State", kick:"Sat 6:00p ET", why:"Money 15 off tickets on Memphis. Extended handle.", an:"Action 3:18p MT · 50/65 · MONEY", key:"mem", source:"action"}
];
const SAT_KEPT = [
  {rank:null, line:"Purdue +3", juice:"-110 FD", away:"Wake Forest", home:"Purdue", kick:"Final 38-36 2OT", why:"3:18 clerk sat (58/50, gap 8). We kept the 9/9 logged side. Won by covering +3.", an:"Clerk sat · we kept it", key:"purdue", source:"sat", final:"38-36", result:"W"},
  {rank:null, line:"Kansas +3", juice:"-110 FD", away:"Missouri", home:"Kansas", kick:"Final 38-21", why:"3:18 clerk sat (69/56, |4| outside toss). We kept the 9/9 logged side. Lost.", an:"Clerk sat · we kept it", key:"kansas", source:"sat", final:"38-21", result:"L"}
];
const FADE = [
  {rank:null, line:"Army -3.5", juice:"-110 FD", away:"South Florida", home:"Army", kick:"Final 28-24", why:"USF was 75% tickets / 70% money at a coin-toss number. Clerk faded that follow and laid Army. USF won outright. Follow now vetoes reverse line move.", an:"Faded a 65/65 follow", key:"army", source:"fade", final:"28-24", result:"L"}
];
const STEAM = [
  {away:"Oklahoma", home:"Michigan", why:"81% of the money on Oklahoma after they moved +2.5 → -5. Steam chase. Sit both sides. Michigan 17-10.", an:"Action 3:18p MT · 79/81 · 98,020 bets", key:"okla", final:"10-17"},
  {away:"Oregon", home:"Oklahoma State", why:"78% of the money on Oregon after they moved -17.5 → -24. Steam chase. Sit both sides. Not a dog ticket. Oregon lost 31-39.", an:"Action 3:18p MT · 68/78", key:"oregon", final:"31-39"},
  {away:"Bowling Green", home:"Nebraska", why:"99% of the money on Nebraska after +25.5 → +30.5. Steam chase. Sit.", an:"Action 3:18p MT"},
  {away:"Louisiana Tech", home:"LSU", why:"91% of the money on LSU after +31.5 → +34.5. Steam chase. Sit.", an:"Action 3:18p MT"}
];
const CLERK = [
  {away:"Ohio State", home:"Texas", spread:"OSU +2", why:"3:18 even 35/36. No RLM, no money gap. Sit. Old frozen +2 is dead.", an:"Action 3:18p MT · 35% tix / 36% money", key:"ohiost"},
  {away:"Alabama", home:"Kentucky", spread:"ALA -8", why:"79/66 on Alabama. Laying 8 is outside the toss. Sit.", an:"Action 3:18p MT · 79/66"},
  {away:"Wake Forest", home:"Purdue", spread:"WAKE -3", why:"58/50. Gap 8. Flat. Sit.", an:"See sat-kept Purdue."},
  {away:"Missouri", home:"Kansas", spread:"MIZ -4", why:"69/56. |4| outside toss, gap 13 < 15. Flat. Sit.", an:"See sat-kept Kansas."}
];
const NFL = [
  {rank:2, line:"Chicago -3", juice:"-106", away:"Chicago", home:"Carolina", kick:"Sun 1:00p ET", why:"Gap 21, no EDGE. 69/84 on Chicago.", take:true},
  {rank:1, line:"Tampa Bay +4", juice:"-111", away:"Tampa Bay", home:"Cincinnati", kick:"Sun 1:00p ET", why:"Better OL is the dog. 55/70 on TB.", take:true},
  {rank:3, line:"Houston +1", juice:"-101", away:"Buffalo", home:"Houston", kick:"Sun 1:00p ET", why:"Buffalo has the OL. Houston has two top-10 EDGEs. Action 47/48.", take:true},
  {rank:4, line:"Philadelphia -5.5", juice:"-104", away:"Washington", home:"Philadelphia", kick:"Sun 4:25p ET", why:"Biggest OL gap. 60% tickets PHI.", take:true},
  {rank:null, line:"Sit", juice:"", away:"New England", home:"Seattle", kick:"Final 10-13", why:"Gap 2. Sit the opener.", take:false, final:"10-13"},
  {rank:null, line:"Sit", juice:"", away:"San Francisco", home:"Los Angeles", kick:"Final 27-7", why:"Gap 1. Sit Thursday.", take:false, final:"27-7"},
  {rank:null, line:"Sit", juice:"", away:"Minnesota", home:"Green Bay", kick:"Sun 4:25p ET", why:"Opened GB favorite. Market flipped. HANDLE_LATE.", take:false},
  {rank:null, line:"Sit", juice:"", away:"Arizona", home:"LA Chargers", kick:"Sun 4:25p ET", why:"Chargers laying a touchdown. Trap stays dead.", take:false},
  {rank:null, line:"Sit", juice:"", away:"NY Jets", home:"Tennessee", kick:"Sun 1:00p ET", why:"Jets +22 money. Not an OL TAKE.", take:false}
];
const W1U = [["Oklahoma State @ Tulsa","u58.5","34","W"],["Coastal Carolina @ West Virginia","u56.5","55","W"],["UNLV @ Hawaii","u56.5","27","W"],["Texas State @ Texas","u60","66","L"],["Ball State @ Ohio State","u56.5","59","L"],["San Jose State @ Eastern Michigan","u55.5","48","W"],["Baylor @ Auburn","u59","33","W"],["North Texas @ Indiana","u57","68","L"],["FAU @ Florida","u59.5","87","L"]];
const W1S = [["Wyoming +3","13-35","L"],["Nevada +1.5","49-14","W"],["California +2","24-45","L"],["Liberty +6.5","13-20","L"],["Colorado +6.5","14-13","W"]];
