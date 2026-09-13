const live = {};
function card(p, kind) {
  const liveRow = p.key && live[p.key];
  const liveCls = liveRow && !p.final && liveRow.state !== "post" ? " live" : "";
  const sitCls = kind === "sit" || kind === "fcs" || kind === "steam" ? " sit" : "";
  const rankCls = kind === "watch" ? "rank watch" : kind === "sit" || kind === "steam" ? "rank sit" : p.result === "L" ? "rank loss" : "rank";
  const badge = p.result === "L" ? "Final · L" : p.result === "W" ? "Final · W" : kind === "watch" ? "Watch" : kind === "take" ? "Take" : kind === "steam" ? "Steam · sit" : kind === "sat" ? "Sat · kept" : kind === "fade" ? "Fade · L" : "Sit";
  const rank = p.rank ? badge + " · Rank " + p.rank : badge;
  const time = liveRow && !p.final && liveRow.state !== "post" ? "Live" : (p.kick || "");
  const line = p.line || (p.total != null ? "Under " + p.total : "Sit");
  const score = liveRow && !p.final && liveRow.state !== "post"
    ? '<p class="score">Live ' + liveRow.pts + " · " + liveRow.clock + " — no grade until final</p>"
    : (p.final ? '<p class="score">Final ' + p.final + (p.result ? " · " + p.result : "") + "</p>" : "");
  return '<button type="button" class="ticket' + liveCls + sitCls + '">' +
    '<div class="row"><span class="' + rankCls + '">' + rank + '</span><span class="meta">' + time + "</span></div>" +
    '<div class="pick"><strong>' + line + '</strong><span class="juice">' + (p.juice || "") + "</span></div>" +
    '<p class="match">' + p.away + " <span>@</span> " + p.home + "</p>" +
    (p.an ? '<p class="score">' + p.an + "</p>" : "") +
    score +
    '<p class="why">' + p.why + "</p></button>";
}
function renderUnders() {
  const open = TAKES.filter(t => !t.result);
  document.getElementById("underBoard").innerHTML =
    '<div class="note"><p class="lbl take">Take · the study</p><p class="body">FBS–FBS under if any shopped total is 55 or higher. Skip −115. Paper if 65%+ of Action money is on the over. Filter decides the count.</p></div>' +
    '<p class="season">' + open.length + " unders still open · card of " + TAKES.length + "</p>" +
    '<p class="day">Saturday, Sep 12</p><div class="stack">' + TAKES.filter(t => !t.result).map(r => card(r, "take")).join("") + "</div>" +
    (TAKES.some(t => t.result) ? '<p class="day">Already final</p><div class="stack">' + TAKES.filter(t => t.result).map(r => card(r, "take")).join("") + "</div>" : "");
}
function renderWatches() {
  const open = WATCHES.filter(w => !w.result);
  const n = WATCHES.length;
  document.getElementById("watchBoard").innerHTML =
    '<div class="note"><p class="lbl watch">Spreads · Action handles</p><p class="body">Ticket %, money %, reverse line move. Toss ≤3.5 on RLM / money ≥12 / follow ≥65/65. If follow and RLM disagree, follow wins. Extended ≤10.5 with gap ≥15 and 5,000+ bets. Steam sits both sides — it does not mint the dog. Action 3:18p MT 9/12. Watch, not a 56.4% TAKE.</p></div>' +
    '<p class="season">' + open.length + " watches still open · card of " + n + " · Action clerk</p>" +
    '<p class="day">Sat · steam</p><div class="stack">' + STEAM.map(r => card(r, "steam")).join("") + "</div>" +
    '<p class="day">Action watches</p><div class="stack">' + open.map(r => card(r, "watch")).join("") + "</div>" +
    '<p class="day">Action clerk · already final</p><div class="stack">' + WATCHES.filter(w => w.result).map(r => card(r, "watch")).join("") + "</div>" +
    '<p class="day">Clerk sat · we kept it</p><div class="stack">' + SAT_KEPT.map(r => card(r, "sat")).join("") + "</div>" +
    '<p class="day">Faded a 65/65 follow</p><div class="stack">' + FADE.map(r => card(r, "fade")).join("") + "</div>";
}
function renderClerk() {
  document.getElementById("sitBoard").innerHTML =
    '<div class="note"><p class="lbl sit">Clerk · sat</p><p class="body">Ohio State +2 is dead — 3:18 was 35/36 even. Steam is on the Spreads tab. Mixed 3–6 is not the Action rate.</p></div>' +
    '<p class="day">Flat / trap</p><div class="stack">' + CLERK.map(r => card(r, "sit")).join("") + "</div>";
}
function recordLine(rows) {
  const w = rows.filter(r => r.result === "W").length;
  const l = rows.filter(r => r.result === "L").length;
  const p = rows.filter(r => r.result === "P").length;
  return p ? w + "–" + l + "–" + p : w + "–" + l;
}
function paintSeason() {
  const mixed = W1S.map(r => ({ result: r[2] })).concat(SAT_KEPT, FADE, WATCHES);
  const unders = W1U.map(r => ({ result: r[3] })).concat(TAKES);
  const nflTakes = NFL.filter(g => g.take);
  const el = document.getElementById("seasonLine");
  if (el) {
    el.innerHTML = "Season <span style=\"color:var(--watch)\">Action " + recordLine(WATCHES) + "</span> <span>Mixed " + recordLine(mixed) + "</span> <span>Unders " + recordLine(unders) + "</span> <span>NFL " + recordLine(nflTakes) + "</span>";
  }
}
function renderResults() {
  const action = WATCHES.filter(w => w.result);
  const unders = TAKES.filter(t => t.result);
  const nflTakes = NFL.filter(g => g.take);
  const nflOpen = NFL.filter(g => !g.take && !g.final);
  const nflSitDone = NFL.filter(g => !g.take && g.final);
  const el = document.getElementById("resultsBoard");
  if (!el) return;
  el.innerHTML =
    '<div class="note"><p class="lbl watch">Results · both leagues</p><p class="body">Action clerk is the CFB spread tab. NFL OL takes are a sibling book, 0u paper. Circa is the NFL check so Action’s sample cannot strand us. Do not quote mixed 3–6 as the clerk.</p></div>' +
    '<p class="season">CFB Action ' + recordLine(WATCHES) + " · NFL OL " + recordLine(nflTakes) + " · sat-kept " + recordLine(SAT_KEPT) + " · faded follow " + recordLine(FADE) + "</p>" +
    '<p class="day">NFL OL takes · graded</p><div class="stack">' + nflTakes.map(r => card(r, "take")).join("") + "</div>" +
    '<p class="day">NFL tonight · sit</p><div class="stack">' + nflOpen.map(r => card(r, "sit")).join("") + "</div>" +
    '<p class="day">NFL sits that finished · not on the rate</p><div class="stack">' + nflSitDone.map(r => card(r, "sit")).join("") + "</div>" +
    '<p class="day">Action clerk · graded</p><div class="stack">' + (action.length ? action.map(r => card(r, "watch")).join("") : "") + "</div>" +
    '<p class="day">Clerk sat · we kept it</p><div class="stack">' + SAT_KEPT.map(r => card(r, "sat")).join("") + "</div>" +
    '<p class="day">Faded a 65/65 follow</p><div class="stack">' + FADE.map(r => card(r, "fade")).join("") + "</div>" +
    (unders.length ? '<p class="day">Week 2 unders · graded</p><div class="stack">' + unders.map(r => card(r, "take")).join("") + "</div>" : "") +
    "<div class=\"prose\"><h2>Week 1 unders 5–4</h2><ol>" + W1U.map(r => "<li>" + r[0] + " " + r[1] + " → " + r[2] + " <strong>" + r[3] + "</strong></li>").join("") + "</ol>" +
    "<h2>Week 1 spreads 2–3 · no Action</h2><ol>" + W1S.map(r => "<li>" + r[0] + " → " + r[1] + " <strong>" + r[2] + "</strong></li>").join("") + "</ol></div>";
}
renderUnders(); renderWatches(); renderClerk();
function renderNfl() {
  const takes = NFL.filter(g => g.take).sort((a,b) => (a.rank || 99) - (b.rank || 99));
  const tonight = NFL.filter(g => !g.take && !g.final);
  const done = NFL.filter(g => !g.take && g.final);
  document.getElementById("nfl").innerHTML =
    '<div class="note"><p class="lbl take">Take · OL / EDGE</p><p class="body">Sibling card. Totals stay sit. Action is the clerk. Circa is the check. Never average. Never add a ticket from the second book. Cowboys–Giants is a sit.</p></div>' +
    '<p class="season">NFL OL ' + recordLine(takes) + " · 0u paper · " + tonight.length + " still open</p>" +
    '<p class="day">Sunday takes</p><div class="stack">' +
    takes.map(g => card(g, "take")).join("") +
    '</div><p class="day">Tonight · sit</p><div class="stack">' +
    tonight.map(g => card(g, "sit")).join("") +
    '</div><p class="day">Already final / handle sits</p><div class="stack">' +
    done.map(g => card(g, "sit")).join("") + "</div>";
}
renderNfl();
document.getElementById("notes").insertAdjacentHTML("beforeend",
  "<h2>The 3–6 is mixed</h2><p>Week 1 coin-toss watches 2–3 never saw Action. Saturday we kept Purdue and Kansas after the 3:18 clerk sat them (1–1). Army faded 75/70 on USF (0–1). Action clerk starts at Rutgers. Miss St covering PK is Action, not mixed. That pile is not the Action rate.</p>" +
  "<h2>Week 1 unders 5–4</h2><ol>" + W1U.map(r => "<li>" + r[0] + " " + r[1] + " → " + r[2] + " <strong>" + r[3] + "</strong></li>").join("") + "</ol>" +
  "<h2>Week 1 spreads 2–3 · no Action</h2><ol>" + W1S.map(r => "<li>" + r[0] + " → " + r[1] + " <strong>" + r[2] + "</strong></li>").join("") + "</ol>");
function show(which) {
  document.getElementById("btnCfb").classList.toggle("on", which === "cfb" || which === "watch" || which === "sit");
  document.getElementById("btnNfl").classList.toggle("on", which === "nfl");
  document.getElementById("tabPicks").classList.toggle("on", which === "cfb" || which === "watch" || which === "sit");
  document.getElementById("tabNflDock").classList.toggle("on", which === "nfl");
  document.getElementById("tabNotes").classList.toggle("on", which === "notes");
  document.getElementById("tabResults").classList.toggle("on", which === "results");
  document.getElementById("cfb").classList.toggle("hidden", which !== "cfb" && which !== "watch" && which !== "sit");
  document.getElementById("nfl").classList.toggle("hidden", which !== "nfl");
  document.getElementById("notes").classList.toggle("hidden", which !== "notes");
  document.getElementById("resultsBoard").classList.toggle("hidden", which !== "results");
  document.getElementById("leagueKicker").textContent = which === "nfl" ? "NFL W1" : which === "notes" ? "Desk" : which === "results" ? "Both leagues" : "CFB W2";
  document.getElementById("pageTitle").textContent = which === "nfl" ? "Spread picks" : which === "notes" ? "How it works" : which === "results" ? "Results" : "Spreads";
}
function setMarket(which) {
  document.getElementById("btnUnders").classList.toggle("on", which === "under");
  document.getElementById("btnWatch").classList.toggle("on", which === "watch");
  document.getElementById("btnSits").classList.toggle("on", which === "sit");
  document.getElementById("underBoard").classList.toggle("hidden", which !== "under");
  document.getElementById("watchBoard").classList.toggle("hidden", which !== "watch");
  document.getElementById("sitBoard").classList.toggle("hidden", which !== "sit");
  show(which === "under" ? "cfb" : which);
}
document.getElementById("btnUnders").onclick = function () { setMarket("under"); };
document.getElementById("btnWatch").onclick = function () { setMarket("watch"); };
document.getElementById("btnSits").onclick = function () { setMarket("sit"); };
document.getElementById("btnCfb").onclick = function () { setMarket("watch"); };
document.getElementById("btnNfl").onclick = function () { show("nfl"); };
document.getElementById("tabPicks").onclick = function () { setMarket("watch"); };
document.getElementById("tabNflDock").onclick = function () { show("nfl"); };
document.getElementById("tabNotes").onclick = function () { show("notes"); };
document.getElementById("tabResults").onclick = function () { show("results"); };
setMarket("watch");
paintSeason();
renderResults();
const KEYS = {
  rutgers: ["Rutgers", "Boston College"], kansas: ["Missouri", "Kansas"], unlv: ["UNLV", "North Texas"],
  utsa: ["UTSA", "Texas State"], purdue: ["Wake Forest", "Purdue"], ohiost: ["Ohio State", "Texas"],
  msst: ["Mississippi State", "Minnesota"], okla: ["Oklahoma", "Michigan"], oregon: ["Oregon", "Oklahoma State"],
  charlotte: ["Charlotte", "Ole Miss"], louisiana: ["Louisiana", "USC"], navy: ["Navy", "Florida Atlantic"],
  appst: ["App", "East Carolina"], cal: ["California", "Syracuse"], usm: ["Southern Miss", "Auburn"],
  mtsu: ["Middle Tennessee", "Marshall"], wku: ["Western Kentucky", "Georgia"], rice: ["Rice", "Notre Dame"],
  usu: ["Utah State", "Washington"], ucf: ["UCF", "Pittsburgh"], mem: ["Memphis", "Boise State"],
  latech: ["Louisiana Tech", "LSU"], ark: ["Arkansas", "Utah"], buf: ["Buffalo", "Florida International"],
  nmsu: ["New Mexico State", "Hawai"], army: ["South Florida", "Army"], gsu: ["Georgia State", "Kennesaw"],
  tbcin: ["Tampa Bay", "Cincinnati"], chicar: ["Chicago", "Carolina"], bufhou: ["Buffalo", "Houston"],
  wasphi: ["Washington", "Philadelphia"], dalnyg: ["Dallas", "New York Giants"], denkc: ["Denver", "Kansas City"],
  gbmin: ["Green Bay", "Minnesota"], arilac: ["Arizona", "Los Angeles Chargers"], nyjten: ["NY Jets", "Tennessee"]
};
function gradeTake(t, pts) {
  const n = t.line.replace(/[^\d.]/g, "");
  const line = parseFloat(n);
  const tot = pts.split("-").map(Number).reduce((a, b) => a + b, 0);
  if (!line) return;
  t.final = pts;
  t.result = tot < line ? "W" : tot > line ? "L" : "P";
  t.kick = "Final " + pts;
}
function gradeSpread(p, pts) {
  const parts = pts.split("-").map(Number);
  const awayPts = parts[0], homePts = parts[1];
  const m = String(p.line).match(/^(.*)\s+(PK|[+-]\d+(?:\.\d+)?)$/);
  if (!m || awayPts == null || homePts == null) return;
  const team = m[1].trim();
  const line = m[2] === "PK" ? 0 : parseFloat(m[2]);
  const awayHit = p.away.toLowerCase().indexOf(team.split(" ")[0].toLowerCase()) === 0 || team.toLowerCase() === p.away.toLowerCase();
  const margin = awayHit ? awayPts - homePts : homePts - awayPts;
  const adj = margin + line;
  p.final = pts;
  p.result = adj > 0 ? "W" : adj < 0 ? "L" : "P";
  p.kick = "Final " + pts;
}
async function refreshLive() {
  try {
    const r = await fetch("https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?dates=20260910-20260914&limit=300");
    const d = await r.json();
    for (const ev of d.events || []) {
      const st = (ev.status && ev.status.type) || {};
      const teams = (ev.competitions && ev.competitions[0] && ev.competitions[0].competitors) || [];
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
    for (const t of TAKES) {
      const row = t.key && live[t.key];
      if (row && (/final/i.test(row.clock || "") || row.state === "post") && !t.result) gradeTake(t, row.pts);
    }
    for (const w of WATCHES) {
      const row = w.key && live[w.key];
      if (row && (/final/i.test(row.clock || "") || row.state === "post") && !w.result) gradeSpread(w, row.pts);
    }
    try {
      const nr = await fetch("https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=20260909-20260915&limit=50");
      const nd = await nr.json();
      for (const ev of nd.events || []) {
        const st = (ev.status && ev.status.type) || {};
        const teams = (ev.competitions && ev.competitions[0] && ev.competitions[0].competitors) || [];
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
      for (const g of NFL) {
        const row = g.key && live[g.key];
        if (row && (/final/i.test(row.clock || "") || row.state === "post") && !g.result && g.take) gradeSpread(g, row.pts);
        if (row && (/final/i.test(row.clock || "") || row.state === "post") && !g.take) {
          g.final = row.pts;
          g.kick = "Final " + row.pts;
        }
      }
    } catch (e2) {}
    renderUnders(); renderWatches(); renderClerk();
    renderNfl();
    paintSeason();
    renderResults();
  } catch (e) {}
}
refreshLive();
setInterval(refreshLive, 45000);
