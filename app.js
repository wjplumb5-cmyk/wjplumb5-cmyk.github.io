const live = {};
function card(p, kind) {
  const liveRow = p.key && live[p.key];
  const liveCls = liveRow && !p.final ? " live" : "";
  const sitCls = kind === "sit" || kind === "fcs" ? " sit" : "";
  const rankCls = kind === "watch" ? "rank watch" : kind === "sit" || kind === "fcs" ? "rank sit" : p.result === "L" ? "rank loss" : "rank";
  const badge = p.result === "L" ? "Final · L" : p.result === "W" ? "Final · W" : kind === "watch" ? "Watch" : kind === "take" ? "Take" : kind === "fcs" ? "Sit · FCS" : "Sit";
  const rank = p.rank ? badge + " · Rank " + p.rank : badge;
  const time = liveRow && !p.final ? "Live" : (p.kick || "");
  const line = p.line || (p.total != null ? "Under " + p.total + " · " + (p.spread || "spread sit") : "Sit");
  return '<button type="button" class="ticket' + liveCls + sitCls + '">' +
    '<div class="row"><span class="' + rankCls + '">' + rank + '</span><span class="meta">' + time + '</span></div>' +
    '<div class="pick"><strong>' + line + '</strong><span class="juice">' + (p.juice||"") + '</span></div>' +
    '<p class="match">' + p.away + ' <span>@</span> ' + p.home + '</p>' +
    (p.tag ? '<p class="tag">' + (p.tag === "logged" ? "On the original logged card" : "Filter add · current shopped total >= 55") + '</p>' : '') +
    (liveRow && !p.final ? '<p class="score">Live ' + liveRow.pts + ' · ' + liveRow.clock + ' — no grade until final</p>' : '') +
    (p.final ? '<p class="score">Final ' + p.final + (p.result ? " · " + p.result : "") + '</p>' : '') +
    (p.an ? '<p class="score">' + p.an + '</p>' : '') +
    '<p class="why">' + p.why + '</p></button>';
}
function renderUnders() {
  const logged = TAKES.filter(t => t.tag === "logged").length;
  const added = TAKES.filter(t => t.tag === "add").length;
  document.getElementById("underBoard").innerHTML =
    '<div class="note"><p class="lbl take">Take · the study, full slate</p><p class="body">Filter ran on every Week 2 game. ' + TAKES.length + ' FBS–FBS unders clear 55. ' + logged + ' were on the original logged card. ' + added + ' cleared after we stopped capping the list. Correlation cap is still 3.0u Saturday — warn, do not auto-drop. Action week-2 totals splits were not on the 9/9 file, so nothing here is PAPER for over-money.</p></div>' +
    '<p class="season">' + TAKES.length + ' takes · 10 logged + ' + added + ' filter adds · cap 3.0u</p>' +
    '<p class="day">Saturday, Sep 12 · ranked by total</p><div class="stack">' + TAKES.map(r => card(r, "take")).join("") + '</div>';
}
function renderWatches() {
  const open = WATCHES.filter(w => !w.final);
  document.getElementById("watchBoard").innerHTML =
    '<div class="note"><p class="lbl watch">Watch · not a ticket</p><p class="body">Frozen seven only. The rest of the spread board is on the Clerk tab. Action never mints a TAKE. Rutgers is final L. Kansas is not graded until the clock hits zeroes.</p></div>' +
    '<p class="season">' + open.length + ' watches still open · 1 final L · Action 6:14p MT 9/9</p>' +
    '<p class="day">Friday / Saturday</p><div class="stack">' + WATCHES.map(r => card(r, "watch")).join("") + '</div>';
}
function renderClerk() {
  document.getElementById("sitBoard").innerHTML =
    '<div class="note"><p class="lbl sit">Clerk · every other game</p><p class="body">These were analyzed. They did not clear the filter. Totals under 55 sit. FCS sits even at 65. Spreads that are not on the frozen seven sit. Oklahoma / Michigan is the example: 82/91 on the steam side after an eight-point move is a kill, not a ticket.</p></div>' +
    '<p class="season">' + CLERK.length + ' FBS–FBS sits · ' + FCS_SIT.length + ' FCS sits · ' + TAKES.length + ' takes live on the other tab</p>' +
    '<p class="day">FBS vs FBS · total under 55 or spread not frozen</p><div class="stack">' + CLERK.map(r => card(r, "sit")).join("") + '</div>' +
    '<p class="day">FCS vs FBS · never a ticket</p><div class="stack">' + FCS_SIT.map(r => card(r, "fcs")).join("") + '</div>';
}
renderUnders(); renderWatches(); renderClerk();
document.getElementById("nfl").innerHTML =
  '<div class="note"><p class="lbl take">Take · OL / EDGE</p><p class="body">Sibling card. Totals stay sit. Four Sunday takes. Jets money and Chargers laying a touchdown do not mint tickets.</p></div>' +
  '<p class="season">4 of 4 Sunday takes · Action 6:08p MT 9/9</p><p class="day">Sunday, Sep 13</p><div class="stack">' +
  NFL.filter(g=>g.take).sort((a,b)=>a.kick.localeCompare(b.kick) || a.rank-b.rank).map(g=>card(g,"take")).join("") +
  '</div><p class="day">Already final / handle sits</p><div class="stack">' +
  NFL.filter(g=>!g.take).map(g=>card(g,"sit")).join("") + '</div>';
document.getElementById("notes").insertAdjacentHTML("beforeend",
  '<h2>Week 1 results</h2><p>Totals 5–4. Watches 2–3.</p><ol>' +
  W1U.map(r=>'<li>'+r[0]+' '+r[1]+' → '+r[2]+' <strong>'+r[3]+'</strong></li>').join('') +
  '</ol><ol>' + W1S.map(r=>'<li>'+r[0]+' → '+r[1]+' <strong>'+r[2]+'</strong></li>').join('') + '</ol>');
function show(which) {
  document.getElementById("btnCfb").classList.toggle("on", which==="cfb"||which==="watch"||which==="sit");
  document.getElementById("btnNfl").classList.toggle("on", which==="nfl");
  document.getElementById("tabPicks").classList.toggle("on", which==="cfb"||which==="watch"||which==="sit");
  document.getElementById("tabNflDock").classList.toggle("on", which==="nfl");
  document.getElementById("tabNotes").classList.toggle("on", which==="notes");
  document.getElementById("tabResults").classList.toggle("on", which==="notes");
  document.getElementById("cfb").classList.toggle("hidden", which!=="cfb" && which!=="watch" && which!=="sit");
  document.getElementById("nfl").classList.toggle("hidden", which!=="nfl");
  document.getElementById("notes").classList.toggle("hidden", which!=="notes");
  document.getElementById("leagueKicker").textContent = which==="nfl" ? "NFL W1" : which==="notes" ? "Desk" : "CFB W2";
  document.getElementById("pageTitle").textContent = which==="nfl" ? "Spread picks" : which==="notes" ? "Notes + results" : "Full slate";
}
function setMarket(which) {
  document.getElementById("btnUnders").classList.toggle("on", which==="under");
  document.getElementById("btnWatch").classList.toggle("on", which==="watch");
  document.getElementById("btnSits").classList.toggle("on", which==="sit");
  document.getElementById("underBoard").classList.toggle("hidden", which!=="under");
  document.getElementById("watchBoard").classList.toggle("hidden", which!=="watch");
  document.getElementById("sitBoard").classList.toggle("hidden", which!=="sit");
  show(which==="under" ? "cfb" : which);
}
document.getElementById("btnUnders").onclick = function(){ setMarket("under"); };
document.getElementById("btnWatch").onclick = function(){ setMarket("watch"); };
document.getElementById("btnSits").onclick = function(){ setMarket("sit"); };
document.getElementById("btnCfb").onclick = function(){ setMarket("under"); };
document.getElementById("btnNfl").onclick = function(){ show("nfl"); };
document.getElementById("tabPicks").onclick = function(){ setMarket("under"); };
document.getElementById("tabNflDock").onclick = function(){ show("nfl"); };
document.getElementById("tabNotes").onclick = function(){ show("notes"); };
document.getElementById("tabResults").onclick = function(){ show("notes"); };
const KEYS = { rutgers:["Rutgers","Boston College"], kansas:["Missouri","Kansas"], unlv:["UNLV","North Texas"], utsa:["UTSA","Texas State"], purdue:["Wake Forest","Purdue"], ohiost:["Ohio State","Texas"], msst:["Mississippi State","Minnesota"], okla:["Oklahoma","Michigan"], oregon:["Oregon","Oklahoma State"], charlotte:["Charlotte","Ole Miss"], louisiana:["Louisiana","USC"], navy:["Navy","Florida Atlantic"], appst:["App State","East Carolina"], cal:["California","Syracuse"], usm:["Southern Miss","Auburn"], mtsu:["Middle Tennessee","Marshall"], wku:["Western Kentucky","Georgia"], rice:["Rice","Notre Dame"], usu:["Utah State","Washington"], ucf:["UCF","Pittsburgh"], tenn:["Tennessee","Georgia Tech"], mem:["Memphis","Boise State"], latech:["Louisiana Tech","LSU"], gaso:["Georgia Southern","Clemson"], ark:["Arkansas","Utah"] };
async function refreshLive() {
  try {
    const r = await fetch("https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?dates=20260910-20260914&limit=300");
    const d = await r.json();
    for (const ev of d.events || []) {
      const st = ev.status && ev.status.type || {};
      const teams = ev.competitions && ev.competitions[0] && ev.competitions[0].competitors || [];
      const away = teams.find(t => t.homeAway === "away");
      const home = teams.find(t => t.homeAway === "home");
      if (!away || !home) continue;
      const an = away.team.displayName, hn = home.team.displayName;
      const pts = away.score + "-" + home.score;
      const clock = st.shortDetail || "";
      for (const key of Object.keys(KEYS)) {
        const pair = KEYS[key];
        if (an.indexOf(pair[0].split(" ")[0]) >= 0 && hn.indexOf(pair[1].split(" ")[0]) >= 0) {
          live[key] = { pts: pts, clock: clock, state: st.state };
        }
      }
    }
    const ru = live.rutgers;
    if (ru && /final/i.test(ru.clock || "")) {
      const w = WATCHES.find(x => x.key === "rutgers");
      if (w) { w.final = ru.pts; w.result = "L"; w.kick = "Final " + ru.pts; }
    }
    renderUnders(); renderWatches(); renderClerk();
  } catch (e) {}
}
refreshLive();
setInterval(refreshLive, 45000);
