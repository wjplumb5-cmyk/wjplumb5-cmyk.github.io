/* Locked filter applied to the full ESPN W2 slate. Action never adds a ticket. */
const TAKES = [
  {rank:1, line:"Under 66.5", juice:"ESPN", away:"UTSA", home:"Texas State", kick:"Sat 3:30p ET", why:"Highest total on the slate. Logged W2 card #1.", tag:"logged", key:"utsa"},
  {rank:2, line:"Under 59.5", juice:"ESPN", away:"Charlotte", home:"Ole Miss", kick:"Sat 7:45p ET", why:"Logged W2 card #2. Line came in from 61.5. Still >=55.", tag:"logged", key:"charlotte"},
  {rank:3, line:"Under 59.5", juice:"ESPN", away:"Louisiana", home:"USC", kick:"Sat 11:00p ET", why:"Logged W2 card #3. Still >=55.", tag:"logged", key:"louisiana"},
  {rank:4, line:"Under 58.5", juice:"ESPN", away:"Navy", home:"Florida Atlantic", kick:"Sat 7:30p ET", why:"Logged W2 card #4.", tag:"logged", key:"navy"},
  {rank:5, line:"Under 58.5", juice:"ESPN", away:"UNLV", home:"North Texas", kick:"Sat 3:45p ET", why:"Logged W2 card #6. Total pushed 56.5 to 58.5.", tag:"logged", key:"unlv"},
  {rank:6, line:"Under 56.5", juice:"ESPN", away:"App State", home:"East Carolina", kick:"Sat 12:00p ET", why:"Filter add. FBS-FBS, shopped total 56.5.", tag:"add", key:"appst"},
  {rank:7, line:"Under 56.5", juice:"ESPN", away:"California", home:"Syracuse", kick:"Sat 3:30p ET", why:"Filter add. Dome. Indoor is a tag on the same ticket.", tag:"add", key:"cal"},
  {rank:8, line:"Under 56.5", juice:"ESPN", away:"Southern Miss", home:"Auburn", kick:"Sat 7:45p ET", why:"Logged W2 card #7.", tag:"logged", key:"usm"},
  {rank:9, line:"Under 56.5", juice:"ESPN", away:"Middle Tennessee", home:"Marshall", kick:"Sat 7:00p ET", why:"Filter add. FBS-FBS at 56.5.", tag:"add", key:"mtsu"},
  {rank:10, line:"Under 55.5", juice:"ESPN", away:"Oregon", home:"Oklahoma State", kick:"Sat 12:00p ET", why:"Logged W2 card #5. Total came in from 57.5.", tag:"logged", key:"oregon"},
  {rank:11, line:"Under 55.5", juice:"ESPN", away:"Western Kentucky", home:"Georgia", kick:"Sat 12:45p ET", why:"Logged W2 card #8.", tag:"logged", key:"wku"},
  {rank:12, line:"Under 55.5", juice:"ESPN", away:"Rice", home:"Notre Dame", kick:"Sat 3:30p ET", why:"Logged W2 card #9.", tag:"logged", key:"rice"},
  {rank:13, line:"Under 55.5", juice:"ESPN", away:"Utah State", home:"Washington", kick:"Sat 3:30p ET", why:"Logged W2 card #10.", tag:"logged", key:"usu"},
  {rank:14, line:"Under 55.5", juice:"ESPN", away:"UCF", home:"Pittsburgh", kick:"Sat 3:30p ET", why:"Filter add. Shopped total now 55.5.", tag:"add", key:"ucf"},
  {rank:15, line:"Under 55.5", juice:"ESPN", away:"Tennessee", home:"Georgia Tech", kick:"Sat 7:00p ET", why:"Filter add. Floor total.", tag:"add", key:"tenn"},
  {rank:16, line:"Under 55.5", juice:"ESPN", away:"Memphis", home:"Boise State", kick:"Sat 6:00p ET", why:"Filter add. FBS-FBS at 55.5.", tag:"add", key:"mem"},
  {rank:17, line:"Under 55.5", juice:"ESPN", away:"Louisiana Tech", home:"LSU", kick:"Sat 7:30p ET", why:"Filter add. LA Tech is FBS.", tag:"add", key:"latech"},
  {rank:18, line:"Under 55.5", juice:"ESPN", away:"Georgia Southern", home:"Clemson", kick:"Sat 7:30p ET", why:"Filter add. Floor total.", tag:"add", key:"gaso"},
  {rank:19, line:"Under 55.5", juice:"ESPN", away:"Arkansas", home:"Utah", kick:"Sat 10:15p ET", why:"Filter add. Shopped total 55.5.", tag:"add", key:"ark"}
];
const WATCHES = [
  {rank:1, line:"North Texas +3.5", juice:"-110 FD", away:"UNLV", home:"North Texas", kick:"Sat 3:45p ET", why:"Public 66% UNLV. Money 59% UNT. UNLV -6.5 to -3.5. Reverse line move.", an:"Action 9/9 6:14p MT · 66% tix UNLV / 41% money", key:"unlv"},
  {rank:2, line:"Rutgers +3.5", juice:"-110 FD", away:"Rutgers", home:"Boston College", kick:"Final 21-28", why:"Public 67% BC. Money 53% Rutgers. Dog +6.5 to +3.5. Lost by 7.", an:"Action 9/9 · 33% tix Rutgers / 53% money", key:"rutgers", final:"21-28", result:"L"},
  {rank:3, line:"Purdue +3", juice:"-110 FD", away:"Wake Forest", home:"Purdue", kick:"Sat 12:00p ET", why:"41% tickets / 57% money on Purdue. Line held near a field goal.", an:"Action 9/9 · 59% tix Wake / 43% money", key:"purdue"},
  {rank:4, line:"Texas State +1.5", juice:"+101 FD", away:"UTSA", home:"Texas State", kick:"Sat 3:30p ET", why:"Tickets 60% UTSA, money 53% Texas State.", an:"Action 9/9 · 60% tix UTSA / 47% money", key:"utsa"},
  {rank:5, line:"Ohio State +2", juice:"-110 FD", away:"Ohio State", home:"Texas", kick:"Sat 7:30p ET", why:"58/66 on Ohio State +2 at Texas. Line held. ESPN now TEX -1.5.", an:"Action 9/9 · 58% tix Ohio State / 66% money", key:"ohiost"},
  {rank:6, line:"Kansas +3", juice:"-110 FD", away:"Missouri", home:"Kansas", kick:"Fri 8:00p ET", why:"76/87 on Missouri. Line -5.5 to -3 against that public.", an:"Action 9/9 · 76% tix Missouri / 87% money", key:"kansas"},
  {rank:7, line:"Mississippi State +1.5", juice:"-110 FD", away:"Mississippi State", home:"Minnesota", kick:"Sat 3:30p ET", why:"71/73 agree on Miss St. Follow, do not fade. Coin-toss only.", an:"Action 9/9 · 71% tix Miss St / 73% money", key:"msst"}
];
const CLERK = [
  {away:"Oklahoma", home:"Michigan", total:43.5, spread:"OU -5.5", why:"Total 43.5 < 55. Not on the frozen watch list. Action 82/91 on Oklahoma after +2.5 flipped to -5.5. Money on the steam side kills any lean.", an:"Action 9/9 · 82% tix OU / 91% money · 17,862 bets", key:"okla"},
  {away:"Arizona State", home:"Texas A&M", total:50.5, spread:"TA&M -14.5", why:"Total under the cut. Spread not on the frozen seven. Sit.", an:"Action 9/9 · ASU 28/60 vs TAMU 72/40"},
  {away:"Penn State", home:"Temple", total:51.5, spread:"PSU -24.5", why:"51.5 sits the under. Lay 24 is not a watch.", an:"Action 9/9 · PSU 54/85"},
  {away:"Washington State", home:"Kansas State", total:49.5, spread:"KSU -17.5", why:"Total under the cut. Sit."},
  {away:"Old Dominion", home:"Virginia Tech", total:47.5, spread:"VT -19.5", why:"Total under the cut. Sit."},
  {away:"Wake Forest", home:"Purdue", total:49.5, spread:"WAKE -3", why:"Under sits at 49.5. Spread is Watch #3 Purdue +3.", an:"See watch list."},
  {away:"South Florida", home:"Army", total:46.5, spread:"Army -3", why:"Total under the cut. Sit."},
  {away:"Alabama", home:"Kentucky", total:48.5, spread:"ALA -10", why:"48.5 sits the under. Laying 10 is a trap number on this desk.", an:"Action 9/9 · ALA 84/91"},
  {away:"Arizona", home:"BYU", total:48.5, spread:"BYU -7.5", why:"Total under the cut. Sit."},
  {away:"Mississippi State", home:"Minnesota", total:54.5, spread:"MSST -1.5", why:"54.5 is under the cut by half a point. Spread is Watch #7.", an:"See watch list."},
  {away:"Duke", home:"Illinois", total:51.5, spread:"ILL -6", why:"Total under the cut. Sit."},
  {away:"Eastern Michigan", home:"Michigan State", total:50.5, spread:"MSU -17.5", why:"Total under the cut. Sit."},
  {away:"Maryland", home:"UConn", total:52.5, spread:"MD -11.5", why:"Total under the cut. Sit."},
  {away:"UL Monroe", home:"UAB", total:54.5, spread:"UAB -9.5", why:"54.5 sits. Half a point short of the study."},
  {away:"Delaware", home:"Vanderbilt", total:54.5, spread:"VAN -21", why:"54.5 sits. Delaware is FBS. Still under the cut."},
  {away:"Buffalo", home:"FIU", total:47.5, spread:"FIU -10", why:"Total under the cut. Sit."},
  {away:"Jacksonville State", home:"Ohio", total:49.5, spread:"OHIO -2.5", why:"Total under the cut. Sit."},
  {away:"Tulsa", home:"Sam Houston", total:51.5, spread:"TLSA -13.5", why:"Total under the cut. Sit."},
  {away:"South Alabama", home:"Tulane", total:49.5, spread:"TULN -9.5", why:"Total under the cut. Sit."},
  {away:"Georgia State", home:"Kennesaw State", total:54.5, spread:"KENN -8.5", why:"54.5 sits. Both FBS."},
  {away:"San Diego State", home:"UCLA", total:54.5, spread:"UCLA -12.5", why:"54.5 sits. Half a point short."},
  {away:"Ohio State", home:"Texas", total:49.5, spread:"TEX -1.5", why:"Under sits at 49.5. Spread is Watch #5.", an:"See watch list."},
  {away:"Texas Tech", home:"Oregon State", total:52.5, spread:"TTU -25.5", why:"Total under the cut. Sit."},
  {away:"Iowa State", home:"Iowa", total:41.5, spread:"IOWA -14", why:"Lowest FBS-FBS total on the board. Sit."},
  {away:"New Mexico State", home:"Hawaii", total:50.5, spread:"HAW -7", why:"Total under the cut. Sit."},
  {away:"Bowling Green", home:"Nebraska", total:50.5, spread:"NEB -30.5", why:"Total under the cut. Sit."}
];
const FCS_SIT = [
  {away:"Howard", home:"Indiana", total:65.5, why:"FCS vs FBS. Price on the board, not a ticket."},
  {away:"Wagner", home:"James Madison", total:55.5, why:"FCS vs FBS. Sit."},
  {away:"Gardner-Webb", home:"Liberty", total:55.5, why:"FCS vs FBS. Sit."},
  {away:"UT Martin", home:"West Virginia", total:55.5, why:"FCS vs FBS. Sit."},
  {away:"Weber State", home:"Colorado", total:55.5, why:"FCS vs FBS. Sit."},
  {away:"UC Davis", home:"SMU", total:58.5, why:"FCS vs FBS. Sit."},
  {away:"Campbell", home:"Florida", total:65.5, why:"FCS vs FBS. Sit."},
  {away:"Southern", home:"Houston", total:60.5, why:"Southern University is SWAC / FCS. Sit."},
  {away:"Towson", home:"South Carolina", total:56.5, why:"FCS vs FBS. Sit."},
  {away:"Western Carolina", home:"Cincinnati", total:60.5, why:"FCS vs FBS. Sit."},
  {away:"Southern Utah", home:"Colorado State", total:56.5, why:"FCS vs FBS. Sit."},
  {away:"West Georgia", home:"Arkansas State", total:56.5, why:"FCS vs FBS. Sit."},
  {away:"Grambling", home:"TCU", total:55.5, why:"FCS vs FBS. Sit."},
  {away:"Prairie View", home:"Baylor", total:55.5, why:"FCS vs FBS. Sit."},
  {away:"Cal Poly", home:"San Jose State", total:56.5, why:"FCS vs FBS. Sit."},
  {away:"ETSU", home:"North Carolina", total:54.5, why:"FCS vs FBS, and under the cut besides."},
  {away:"Villanova", home:"Louisville", total:null, why:"FCS. Final 13-59."},
  {away:"Norfolk State", home:"Virginia", total:null, why:"FCS. Final 3-59."},
  {away:"Richmond", home:"NC State", total:null, why:"FCS. Final 0-73."},
  {away:"Florida A&M", home:"Miami", total:null, why:"FCS. Final 7-77."}
];
const NFL = [
  {rank:2, line:"Chicago -2.5", juice:"live overlay", away:"Chicago", home:"Carolina", kick:"Sun 1:00p ET", why:"Gap 21, no EDGE. 69/84 on Chicago. Line held at -2.5.", take:true},
  {rank:1, line:"Tampa Bay +3.5", juice:"live overlay", away:"Tampa Bay", home:"Cincinnati", kick:"Sun 1:00p ET", why:"Better OL is the dog. 55/70 on TB. Line held.", take:true},
  {rank:3, line:"Houston +1.5", juice:"live overlay", away:"Buffalo", home:"Houston", kick:"Sun 1:00p ET", why:"Buffalo has the OL. Houston has two top-10 EDGEs. Action 47/48.", take:true},
  {rank:4, line:"Philadelphia -4", juice:"live overlay", away:"Washington", home:"Philadelphia", kick:"Sun 4:25p ET", why:"Biggest OL gap. 60% tickets PHI.", take:true},
  {rank:null, line:"Sit", juice:"", away:"New England", home:"Seattle", kick:"Final 10-13", why:"Gap 2. Sit the opener.", take:false, final:"10-13"},
  {rank:null, line:"Sit", juice:"", away:"San Francisco", home:"Los Angeles", kick:"Final 27-7", why:"Gap 1. Sit Thursday.", take:false, final:"27-7"},
  {rank:null, line:"Sit", juice:"", away:"Minnesota", home:"Green Bay", kick:"Sun 4:25p ET", why:"Opened GB favorite. Market flipped. HANDLE_LATE.", take:false},
  {rank:null, line:"Sit", juice:"", away:"Arizona", home:"LA Chargers", kick:"Sun 4:25p ET", why:"Chargers laying 10.5. Trap stays dead.", take:false},
  {rank:null, line:"Sit", juice:"", away:"NY Jets", home:"Tennessee", kick:"Sun 1:00p ET", why:"Jets +22 money. Not an OL TAKE.", take:false}
];
const W1U = [["Oklahoma State @ Tulsa","u58.5","34","W"],["Coastal Carolina @ West Virginia","u56.5","55","W"],["UNLV @ Hawaii","u56.5","27","W"],["Texas State @ Texas","u60","66","L"],["Ball State @ Ohio State","u56.5","59","L"],["San Jose State @ Eastern Michigan","u55.5","48","W"],["Baylor @ Auburn","u59","33","W"],["North Texas @ Indiana","u57","68","L"],["FAU @ Florida","u59.5","87","L"]];
const W1S = [["Wyoming +3","13-35","L"],["Nevada +1.5","49-14","W"],["California +2","24-45","L"],["Liberty +6.5","13-20","L"],["Colorado +6.5","14-13","W"]];
