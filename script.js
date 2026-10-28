/* Project 2026 Status v1.1 — renders from data/status.json and remembers each visitor in localStorage.
   FALLBACK below is a copy of data/status.json so the page also works opened from disk (file://),
   where browsers block fetch(). Keep the two in sync. */
(function () {
  "use strict";

  var FALLBACK = {
    "version": "1.1.0",
    "project": "Project 2026",
    "studio": "Tableboard Studios",
    "owner": "Zephplays134",
    "lastUpdated": "2026-10-28T12:30:00Z",
    "questions": [
      {
        "id": "making",
        "question": "Is Tableboard Studios making Project 2026?",
        "answer": "YES",
        "tone": "yes",
        "basis": "Official listing",
        "detail": "The official Tableboard Studios Roblox group lists “Project 2026 (2026) — To be announced” under Current Games, and founder Bryce_TBS lists Project 2026 first under Current Projects on his Roblox profile.",
        "sources": [
          "group",
          "profile"
        ]
      },
      {
        "id": "testing",
        "question": "Are they currently testing it internally?",
        "answer": "YES",
        "tone": "yes",
        "basis": "Confirmed by site owner (Zephplays134)",
        "detail": "Supporting evidence: Roblox lists a “Project 2026 Testing Server”, described as “the official testing server for Tableboard Studios's newest game”, in the studio's invite-only development group (created 7 Dec 2025, last updated 20 Oct 2026), next to a “P26 Building Systems Development” place. Rotraces lists both too. The studio hasn't posted a public testing announcement.",
        "sources": [
          "testserver",
          "devgroup",
          "rotraces",
          "owner"
        ]
      },
      {
        "id": "finalizing",
        "question": "Are they finalizing internal testing?",
        "answer": "NOT CONFIRMED",
        "tone": "unknown",
        "basis": "No public evidence either way",
        "detail": "Nothing public says testing is in its final stage, and nothing says it isn't. The testing places were still being updated on 20 Oct 2026, and the official listing still reads “To be announced”.",
        "sources": [
          "group",
          "testserver"
        ]
      }
    ],
    "stages": [
      {
        "id": "announced",
        "label": "Announced",
        "state": "done",
        "note": "Listed on the official group as “To be announced”"
      },
      {
        "id": "development",
        "label": "In development",
        "state": "done",
        "note": "Building-systems dev place since 28 Aug 2026"
      },
      {
        "id": "testing",
        "label": "Internal testing",
        "state": "current",
        "note": "YES: confirmed by site owner, official testing server listed"
      },
      {
        "id": "finalizing",
        "label": "Finalizing",
        "state": "unconfirmed",
        "note": "Not confirmed"
      },
      {
        "id": "release",
        "label": "Release",
        "state": "todo",
        "note": "No date announced"
      }
    ],
    "updates": [
      {
        "date": "2026-10-28",
        "added": "2026-10-28T12:30:00Z",
        "type": "status",
        "title": "Tracker v1.1: official testing-server listing found",
        "text": "New evidence for the testing answer. The “Project 2026 Testing Server” is listed by Roblox under the studio's own invite-only Tableboard Studios Development group, not only on a third-party tracker. The answers are unchanged: YES, YES, NOT CONFIRMED.",
        "source": "devgroup"
      },
      {
        "date": "2026-10-28",
        "added": "2026-10-28T12:05:00Z",
        "type": "status",
        "title": "Tracker launched",
        "text": "Status set: Making Project 2026 — YES. Testing internally — YES (confirmed by site owner). Finalizing testing — NOT CONFIRMED."
      },
      {
        "date": "2026-10-28",
        "added": "2026-10-28T12:05:00Z",
        "type": "official",
        "title": "Official group still says “To be announced”",
        "text": "Checked today: the Tableboard Studios group (46,452 members) lists “Project 2026 (2026) — To be announced” under Current Games. No release date, trailer or feature list.",
        "source": "group"
      },
      {
        "date": "2026-10-28",
        "added": "2026-10-28T12:05:00Z",
        "type": "official",
        "title": "Founder's profile lists Project 2026",
        "text": "Checked today: Bryce_TBS (Founder, CEO & Lead Developer) lists Project 2026 first under Current Projects, ahead of Cruise Ship Simulator.",
        "source": "profile"
      },
      {
        "date": "2026-10-28",
        "added": "2026-10-28T12:05:00Z",
        "type": "evidence",
        "title": "Private testing places spotted",
        "text": "Checked today: rotraces.com lists “Project 2026 Testing Server” and “P26 Building Systems Development” under Bryce_TBS. Neither is in the main group's public game list.",
        "source": "rotraces"
      },
      {
        "date": "2026-10-28",
        "added": "2026-10-28T12:05:00Z",
        "type": "evidence",
        "title": "Studio website doesn't mention it yet",
        "text": "Checked today: the Tableboard Studios projects page only covers the older Cruise Line Simulator games.",
        "source": "site"
      },
      {
        "date": "2026-10-26",
        "added": "2026-10-28T12:05:00Z",
        "type": "game",
        "title": "Cruise Ship Simulator updated",
        "text": "Roblox shows Cruise Ship Simulator was last updated on 26 Oct 2026.",
        "source": "css"
      },
      {
        "date": "2026-10-20",
        "added": "2026-10-28T12:30:00Z",
        "type": "evidence",
        "title": "Both Project 2026 test places updated",
        "text": "Roblox records the Project 2026 Testing Server as updated at 21:19 UTC and P26 Building Systems Development at 21:31 UTC on 20 Oct 2026.",
        "source": "testserver"
      },
      {
        "date": "2026-08-28",
        "added": "2026-10-28T12:30:00Z",
        "type": "evidence",
        "title": "“P26 Building Systems Development” created",
        "text": "A second Project 2026 place appears in the studio's development group, for building systems. It has no public description.",
        "source": "buildplace"
      },
      {
        "date": "2026-03-20",
        "added": "2026-10-28T12:05:00Z",
        "type": "game",
        "title": "“World's Largest Cruise Ship” badge added",
        "text": "Badge creation date in Cruise Ship Simulator, from Roblox's badge list.",
        "source": "badges"
      },
      {
        "date": "2025-12-20",
        "added": "2026-10-28T12:05:00Z",
        "type": "game",
        "title": "Grand Cayman badge added",
        "text": "Badge creation date in Cruise Ship Simulator.",
        "source": "badges"
      },
      {
        "date": "2025-12-13",
        "added": "2026-10-28T12:30:00Z",
        "type": "game",
        "title": "Studio teases a big Cruise Ship Simulator update",
        "text": "On TikTok the studio promised characters walking on ships again, animated NPC passengers and 4 new ships, “including the highly anticipated Dream Class”, expected 13–14 Dec.",
        "source": "tiktok-dec"
      },
      {
        "date": "2025-12-07",
        "added": "2026-10-28T12:30:00Z",
        "type": "evidence",
        "title": "Project 2026 Testing Server created",
        "text": "Roblox's creation date for the testing server. Its description: “The official testing server for Tableboard Studios's newest game. This game and it's contents are NDA, nothing may be posted publicly without permission from the development team.”",
        "source": "testserver"
      },
      {
        "date": "2025-09-07",
        "added": "2026-10-28T12:30:00Z",
        "type": "game",
        "title": "“You're a Billionaire!” badge added",
        "text": "For earning $1,000,000,000 in Cruise Ship Simulator. Rewards include the Njord Class Yacht with 4 exclusive musical horns. 325 players had earned it as of 28 Oct 2026.",
        "source": "badges"
      },
      {
        "date": "2025-08-09",
        "added": "2026-10-28T12:05:00Z",
        "type": "game",
        "title": "Oasis Class badge added",
        "text": "Badge creation date in Cruise Ship Simulator.",
        "source": "badges"
      },
      {
        "date": "2025-07-05",
        "added": "2026-10-28T12:30:00Z",
        "type": "game",
        "title": "Studio announces its “largest update ever”",
        "text": "On TikTok: 3 new cruise ships, tugs, LNG ships, weather, waves “and so much more” for Cruise Ship Simulator.",
        "source": "tiktok-jul"
      },
      {
        "date": "2025-02-02",
        "added": "2026-10-28T12:05:00Z",
        "type": "game",
        "title": "Triton Class badge added",
        "text": "Badge creation date in Cruise Ship Simulator.",
        "source": "badges"
      },
      {
        "date": "2024-04-21",
        "added": "2026-10-28T12:05:00Z",
        "type": "game",
        "title": "Cruise Ship Simulator created",
        "text": "The studio's current game goes up on Roblox. A “Cruise Ship Simulator Testing Server” was created the same day in the development group, the same pattern Project 2026 follows now.",
        "source": "css"
      },
      {
        "date": "2022-12-28",
        "added": "2026-10-28T12:30:00Z",
        "type": "game",
        "title": "Cruise Line Simulator: A New Era created",
        "text": "The studio's second game. It reached 5,384,286 visits and is now listed as discontinued.",
        "source": "games"
      },
      {
        "date": "2021-05-19",
        "added": "2026-10-28T12:30:00Z",
        "type": "game",
        "title": "Cruise Line Simulator: Classic created",
        "text": "The studio's first listed game (346,739 visits). Now discontinued; its page points players to Cruise Ship Simulator.",
        "source": "games"
      }
    ],
    "stats": {
      "universeId": 5897329101,
      "placeId": 17234598656,
      "testUniverseId": 9312735138,
      "buildUniverseId": 10764157170,
      "readDate": "2026-10-28",
      "visits": 6263657,
      "favorites": 35378,
      "playing": 44,
      "upVotes": 9625,
      "downVotes": 2797,
      "maxPlayers": 15,
      "created": "2024-04-21",
      "updated": "2026-10-26",
      "groupMembers": 46452,
      "testUpdated": "2026-10-20",
      "buildUpdated": "2026-10-20"
    },
    "sources": [
      {
        "id": "group",
        "name": "Tableboard Studios — official Roblox group",
        "url": "https://www.roblox.com/communities/4795028/Tableboard-Studios",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "devgroup",
        "name": "Tableboard Studios Development — invite-only Roblox group",
        "url": "https://www.roblox.com/communities/7714371/Tableboard-Studios-Development",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "devgames",
        "name": "Tableboard Studios Development — games list (Roblox games API)",
        "url": "https://games.roblox.com/v2/groups/7714371/gamesV2?accessFilter=Public",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "testserver",
        "name": "Project 2026 Testing Server — Roblox games API (place page is private)",
        "url": "https://games.roblox.com/v1/games?universeIds=9312735138",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "buildplace",
        "name": "P26 Building Systems Development — Roblox games API (place page is private)",
        "url": "https://games.roblox.com/v1/games?universeIds=10764157170",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "profile",
        "name": "Bryce_TBS — Roblox profile (founder)",
        "url": "https://www.roblox.com/users/127968748/profile",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "css",
        "name": "Cruise Ship Simulator — Roblox game page & public API",
        "url": "https://www.roblox.com/games/17234598656/Cruise-Ship-Simulator",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "games",
        "name": "Tableboard Studios games — Roblox games API",
        "url": "https://games.roblox.com/v2/groups/4795028/gamesV2?accessFilter=Public",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "roles",
        "name": "Tableboard Studios staff roles — Roblox groups API",
        "url": "https://groups.roblox.com/v1/groups/4795028/roles",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "badges",
        "name": "Cruise Ship Simulator badges — Roblox badges API",
        "url": "https://badges.roblox.com/v1/universes/5897329101/badges",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "discord",
        "name": "Tableboard Studios — Discord server (public invite info)",
        "url": "https://discord.com/invite/tableboardstudios",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "tiktok-dec",
        "name": "Tableboard Studios on TikTok — update teaser (13 Dec 2025)",
        "url": "https://www.tiktok.com/@tableboard_studios/video/7583437263288175903",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "tiktok-jul",
        "name": "Tableboard Studios on TikTok — “largest update ever” (5 Jul 2025)",
        "url": "https://www.tiktok.com/@tableboard_studios/video/7523595238141611295",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "site",
        "name": "Tableboard Studios — projects page",
        "url": "https://sites.google.com/view/tableboardstudios/projects",
        "kind": "Official",
        "read": "2026-10-28"
      },
      {
        "id": "rotraces",
        "name": "Rotraces — Bryce_TBS creator profile",
        "url": "https://rotraces.com/Bryce_TBS",
        "kind": "Third-party",
        "read": "2026-10-28"
      },
      {
        "id": "wiki",
        "name": "Tableboard Studios Wiki (fan-run) — Ships List & update notes",
        "url": "https://tableboard-studios.fandom.com/wiki/Cruise_Ship_Simulator",
        "kind": "Fan wiki",
        "read": "2026-10-28"
      },
      {
        "id": "owner",
        "name": "Site owner confirmation (Zephplays134)",
        "url": "https://github.com/Zephplays134",
        "kind": "Owner",
        "read": "2026-10-28"
      }
    ]
  };

  var SHOW_FIRST = 6;                 // updates shown before "Show older updates"
  var SESSION_GAP = 30 * 60 * 1000;   // loads closer together than this count as the same visit
  var STORE_KEY = "p26status";        // the one localStorage key this site uses (also read by the inline theme script)
  var DELTA_KEYS = ["visits", "favorites", "groupMembers"];

  var state = { data: null, filter: "all", expanded: false, mem: {}, storageOk: true, newCount: 0, live: null };
  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- helpers ---------- */
  function fmtDate(iso) {
    var p = String(iso).slice(0, 10).split("-");
    return Number(p[2]) + " " + MONTHS[Number(p[1]) - 1] + " " + p[0];
  }
  function fmtNum(n) { return Number(n).toLocaleString("en-US"); }
  function toTime(iso) { return new Date(String(iso).length <= 10 ? iso + "T12:00:00Z" : iso).getTime(); }
  function relTime(iso) {
    var ms = Date.now() - toTime(iso);
    if (isNaN(ms)) return "";
    var mins = Math.floor(ms / 60000);
    if (String(iso).length > 10 && mins < 60) return mins <= 1 ? "just now" : mins + " minutes ago";
    if (String(iso).length > 10 && mins < 1440) { var h = Math.floor(mins / 60); return h + (h === 1 ? " hour ago" : " hours ago"); }
    var days = Math.floor(ms / 86400000);
    if (days <= 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return days + " days ago";
    var months = Math.floor(days / 30);
    if (months < 12) return months + (months === 1 ? " month ago" : " months ago");
    var years = Math.floor(days / 365);
    return years + (years === 1 ? " year ago" : " years ago");
  }
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") node.textContent = attrs[k];
      else if (k === "className") node.className = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return node;
  }
  function sourceById(id) { return (state.data.sources || []).filter(function (s) { return s.id === id; })[0]; }
  function kindClass(kind) { return String(kind || "").toLowerCase().replace(/[^a-z]+/g, "-"); }
  function shortName(s) { return s.name.split(" — ")[0]; }
  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  /* ---------- memory (localStorage) ---------- */
  function loadMem() {
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      state.mem = raw ? JSON.parse(raw) || {} : {};
    } catch (e) { state.storageOk = false; state.mem = {}; }
  }
  function saveMem() {
    if (!state.storageOk) return;
    try { window.localStorage.setItem(STORE_KEY, JSON.stringify(state.mem)); }
    catch (e) { state.storageOk = false; }
    renderMemPanel();
  }
  // Starts a new "visit" when the last load was more than SESSION_GAP ago, carrying the previous
  // visit's time and stats forward so reloads within one visit keep the same "since last visit" view.
  function startVisit() {
    var m = state.mem, now = Date.now();
    if (m.lastVisit && now - toTime(m.lastVisit) > SESSION_GAP) {
      m.prevVisit = m.lastVisit;
      if (m.snap) m.prevSnap = m.snap;
    }
    m.lastVisit = new Date(now).toISOString();
    saveMem();
  }
  function clearMem() {
    try { window.localStorage.removeItem(STORE_KEY); } catch (e) {}
    state.mem = {};
    state.newCount = 0;
    if (state.filter === "new") state.filter = "all";
    syncChips();
    $("welcome").hidden = true;
    renderUpdates();
    renderDeltas();
    renderMemPanel();
    toast("Saved data cleared");
  }
  function renderMemPanel() {
    var list = $("mem-list"), m = state.mem;
    list.textContent = "";
    if (!state.storageOk) { list.appendChild(el("li", { text: "Your browser isn't allowing saved data here, so nothing is remembered." })); return; }
    var rows = [];
    if (m.theme) rows.push("Theme: " + m.theme);
    if (m.filter) rows.push("Update filter: " + m.filter);
    if (m.lastVisit) rows.push("This visit started: " + fmtDate(m.lastVisit) + " (" + relTime(m.lastVisit) + ")");
    if (m.prevVisit) rows.push("Your previous visit: " + fmtDate(m.prevVisit) + " (" + relTime(m.prevVisit) + ")");
    if (m.snap) rows.push("Stats snapshot: " + fmtNum(m.snap.visits) + " visits, " + fmtNum(m.snap.favorites) + " favorites (" + relTime(m.snap.at) + ")");
    if (!rows.length) rows.push("Nothing saved yet.");
    rows.forEach(function (r) { list.appendChild(el("li", { text: r })); });
    $("clear-btn").disabled = !rows.length || rows[0] === "Nothing saved yet.";
  }

  /* ---------- theme ---------- */
  function applyTheme(theme, save) {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = $("theme-btn"), light = theme === "light";
    btn.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    btn.setAttribute("aria-pressed", String(light));
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", light ? "#f3f7fc" : "#07111f");
    if (save) { state.mem.theme = theme; saveMem(); }
  }
  function wireTheme() {
    applyTheme(document.documentElement.getAttribute("data-theme") || "dark", false);
    $("theme-btn").addEventListener("click", function () {
      applyTheme(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light", true);
    });
  }

  /* ---------- share / back to top ---------- */
  function wireShare() {
    $("share-btn").addEventListener("click", function () {
      var url = location.href.split("#")[0];
      var payload = { title: document.title, text: "Project 2026: making it YES, testing internally YES, finalizing NOT CONFIRMED", url: url };
      if (navigator.share) { navigator.share(payload).catch(function () {}); return; }
      copyText(url).then(function () { toast("Link copied"); }, function () { toast(url); });
    });
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = el("textarea", { readonly: "", "aria-hidden": "true" });
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  }
  function wireToTop() {
    var btn = $("to-top"), ticking = false;
    function check() { btn.hidden = window.scrollY < 600; ticking = false; }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(check); } }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.querySelector(".brand").focus({ preventScroll: true });
    });
    check();
  }

  /* ---------- answers ---------- */
  function renderAnswers() {
    var grid = $("answer-grid");
    grid.textContent = "";
    state.data.questions.forEach(function (q, i) {
      var cites = el("p", { className: "cites" }, ["Sources: "]);
      (q.sources || []).forEach(function (id, j) {
        var s = sourceById(id);
        if (!s) return;
        if (j) cites.appendChild(document.createTextNode(" · "));
        cites.appendChild(el("a", { href: s.url, target: "_blank", rel: "noopener", text: shortName(s) }));
      });
      grid.appendChild(el("article", { className: "answer " + q.tone, id: "q-" + q.id }, [
        el("p", { className: "num-q", text: "Question " + (i + 1) }),
        el("h3", { className: "q", text: q.question }),
        el("p", { className: "badge", text: q.answer }),
        el("p", { className: "basis", text: q.basis }),
        el("p", { className: "detail", text: q.detail }),
        cites
      ]));
    });
  }

  /* ---------- progress tracker ---------- */
  function renderTracker() {
    var list = $("tracker");
    if (!state.data.stages) return;
    list.textContent = "";
    var label = { done: "done", current: "current stage", unconfirmed: "not confirmed", todo: "not reached" };
    state.data.stages.forEach(function (s) {
      var li = el("li", { className: "stage " + s.state }, [
        el("span", { className: "node", "aria-hidden": "true" }),
        el("span", { className: "s-label", text: s.label }),
        el("span", { className: "s-note", text: s.note })
      ]);
      li.setAttribute("aria-label", s.label + ": " + label[s.state] + ". " + s.note);
      if (s.state === "current") li.setAttribute("aria-current", "step");
      list.appendChild(li);
    });
  }

  /* ---------- updates timeline ---------- */
  function isNew(u) {
    var prev = state.mem.prevVisit;
    return !!(prev && u.added && toTime(u.added) > toTime(prev));
  }
  function renderUpdates() {
    var list = $("timeline"), btn = $("toggle-more");
    list.textContent = "";
    var items = state.data.updates.slice().sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
    state.newCount = items.filter(isNew).length;
    $("chip-new").hidden = state.newCount === 0;
    $("chip-new").textContent = "New for you (" + state.newCount + ")";
    var matching = items.filter(function (u) {
      if (state.filter === "all") return true;
      if (state.filter === "new") return isNew(u);
      return u.type === state.filter;
    });
    matching.forEach(function (u, i) {
      var src = u.source && sourceById(u.source);
      var fresh = isNew(u);
      var li = el("li", { className: "entry" + (fresh ? " is-new" : ""), "data-type": u.type }, [
        el("div", { className: "meta" }, [
          fresh ? el("span", { className: "new-badge", text: "NEW SINCE YOUR LAST VISIT" }) : null,
          el("time", { datetime: u.date, text: fmtDate(u.date) }),
          el("span", { className: "tag " + u.type, text: u.type }),
          el("span", { text: relTime(u.date) })
        ]),
        el("h3", { text: u.title }),
        el("p", { text: u.text }),
        src ? el("a", { className: "src", href: src.url, target: "_blank", rel: "noopener", text: "Source: " + shortName(src) + " ↗" }) : null
      ]);
      if (!state.expanded && i >= SHOW_FIRST) li.classList.add("is-hidden");
      list.appendChild(li);
    });
    if (!matching.length) list.appendChild(el("li", { className: "empty", text: "No updates in this category yet." }));
    var hiddenCount = Math.max(0, matching.length - SHOW_FIRST);
    btn.hidden = hiddenCount === 0;
    btn.textContent = state.expanded ? "Show fewer updates" : "Show " + hiddenCount + " older update" + (hiddenCount === 1 ? "" : "s");
    btn.setAttribute("aria-expanded", String(state.expanded));
  }
  function syncChips() {
    Array.prototype.forEach.call(document.querySelectorAll("#filters .chip"), function (c) {
      var on = c.getAttribute("data-filter") === state.filter;
      c.classList.toggle("is-on", on);
      c.setAttribute("aria-pressed", String(on));
    });
  }
  function wireFilters() {
    Array.prototype.forEach.call(document.querySelectorAll("#filters .chip"), function (chip) {
      chip.addEventListener("click", function () {
        state.filter = chip.getAttribute("data-filter");
        state.expanded = false;
        state.mem.filter = state.filter;
        saveMem();
        syncChips();
        renderUpdates();
      });
    });
    $("toggle-more").addEventListener("click", function () { state.expanded = !state.expanded; renderUpdates(); });
  }

  /* ---------- welcome line ---------- */
  function renderWelcome() {
    var w = $("welcome"), m = state.mem;
    if (!state.storageOk) { w.hidden = true; return; }
    w.textContent = "";
    if (m.prevVisit) {
      w.appendChild(el("b", { text: "Welcome back! " }));
      w.appendChild(document.createTextNode("Your last visit was " + relTime(m.prevVisit) + ". "));
      w.appendChild(document.createTextNode(state.newCount
        ? state.newCount + " update" + (state.newCount === 1 ? " is" : "s are") + " new since then, marked below."
        : "Nothing new in the updates log since then."));
    } else {
      w.appendChild(el("b", { text: "First visit? " }));
      w.appendChild(document.createTextNode("This page remembers your visit in your browser, so next time it can flag new updates and show how the stats moved."));
    }
    w.hidden = false;
  }

  /* ---------- stats ---------- */
  function setStat(key, value) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-stat="' + key + '"]'), function (n) { n.textContent = value; });
  }
  function setLiveDate(key, iso) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-live="' + key + '"]'), function (n) { n.textContent = fmtDate(iso); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-rel="' + key + '"]'), function (n) { n.textContent = "(" + relTime(iso) + ")"; });
  }
  function renderStats(st, live) {
    setStat("visits", fmtNum(st.visits));
    setStat("favorites", fmtNum(st.favorites));
    setStat("playing", fmtNum(st.playing));
    var votes = st.upVotes + st.downVotes;
    if (votes) setStat("rating", Math.round((st.upVotes / votes) * 100) + "%");
    setStat("groupMembers", fmtNum(st.groupMembers));
    setStat("updated", fmtDate(st.updated));
    setLiveDate("testUpdated", st.testUpdated);
    setLiveDate("buildUpdated", st.buildUpdated);
    var stamp = $("stats-stamp");
    stamp.textContent = "";
    if (live) {
      stamp.appendChild(el("span", { className: "live-tag", text: "● Live " }));
      stamp.appendChild(document.createTextNode("from Roblox just now · like ratio from " + fmtDate(st.readDate)));
    } else {
      stamp.textContent = "Read from Roblox on " + fmtDate(st.readDate);
    }
  }
  function renderDeltas() {
    var prev = state.mem.prevSnap, cur = state.live, hint = $("delta-hint");
    DELTA_KEYS.forEach(function (k) {
      Array.prototype.forEach.call(document.querySelectorAll('[data-delta="' + k + '"]'), function (n) {
        n.textContent = ""; n.className = "delta";
        if (!prev || !cur || typeof prev[k] !== "number" || typeof cur[k] !== "number") return;
        var d = cur[k] - prev[k];
        if (d === 0) { n.textContent = "No change since your last visit"; n.className = "delta flat"; }
        else n.textContent = (d > 0 ? "+" : "−") + fmtNum(Math.abs(d)) + " since your last visit";
      });
    });
    if (prev && cur) hint.textContent = "Compared with your last visit's numbers from " + fmtDate(prev.at) + " (" + relTime(prev.at) + ").";
    else if (prev) hint.textContent = "Live numbers didn't load, so changes since your last visit can't be shown right now.";
    else hint.textContent = "Come back later: this page remembers today's numbers and will show what changed since your visit.";
  }
  // Live refresh through a public CORS-enabled mirror of Roblox's API. Falls back to the saved numbers silently.
  function liveStats() {
    var st = Object.assign({}, state.data.stats);
    if (!window.fetch || location.protocol === "file:") { renderDeltas(); return; }
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 7000);
    var opts = ctrl ? { signal: ctrl.signal } : {};
    var ids = [st.universeId, st.testUniverseId, st.buildUniverseId].join(",");
    var gameReq = fetch("https://games.roproxy.com/v1/games?universeIds=" + ids, opts).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
    var groupReq = fetch("https://groups.roproxy.com/v1/groups/4795028", opts).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).catch(function () { return null; });
    Promise.all([gameReq, groupReq]).then(function (res) {
      clearTimeout(timer);
      var byId = {};
      ((res[0] && res[0].data) || []).forEach(function (g) { byId[g.id] = g; });
      var g = byId[st.universeId];
      if (!g || typeof g.visits !== "number") throw new Error("no data");
      st.visits = g.visits;
      st.favorites = g.favoritedCount;
      if (typeof g.playing === "number") st.playing = g.playing;
      if (g.updated) st.updated = g.updated.slice(0, 10);
      if (byId[st.testUniverseId] && byId[st.testUniverseId].updated) st.testUpdated = byId[st.testUniverseId].updated.slice(0, 10);
      if (byId[st.buildUniverseId] && byId[st.buildUniverseId].updated) st.buildUpdated = byId[st.buildUniverseId].updated.slice(0, 10);
      if (res[1] && typeof res[1].memberCount === "number") st.groupMembers = res[1].memberCount;
      renderStats(st, true);
      state.live = { visits: st.visits, favorites: st.favorites, groupMembers: st.groupMembers, at: new Date().toISOString() };
      renderDeltas();
      state.mem.snap = state.live;   // remembered for your next visit
      saveMem();
    }).catch(function () { clearTimeout(timer); renderDeltas(); });
  }

  /* ---------- sources + stamp ---------- */
  function renderSources() {
    var list = $("source-list");
    list.textContent = "";
    state.data.sources.forEach(function (s) {
      list.appendChild(el("li", { id: "src-" + s.id }, [
        el("a", { href: s.url, target: "_blank", rel: "noopener", text: s.name }),
        el("span", { className: "tag " + kindClass(s.kind), text: s.kind }),
        el("span", { className: "muted small", text: "read " + fmtDate(s.read) })
      ]));
    });
    if (location.hash.indexOf("#src-") === 0) { var t = document.querySelector(location.hash); if (t) t.scrollIntoView(); }
  }
  function renderStamp() {
    var t = $("last-updated");
    t.setAttribute("datetime", state.data.lastUpdated);
    t.textContent = fmtDate(state.data.lastUpdated);
    $("last-updated-rel").textContent = "(" + relTime(state.data.lastUpdated) + ")";
    if (state.data.version) $("version").textContent = state.data.version;
  }

  /* ---------- nav: highlight the section in view ---------- */
  function wireNav() {
    var links = document.querySelectorAll(".nav a");
    if (!("IntersectionObserver" in window)) return;
    var map = {};
    Array.prototype.forEach.call(links, function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Array.prototype.forEach.call(links, function (a) { a.classList.remove("active"); a.removeAttribute("aria-current"); });
        var a = map[e.target.id];
        if (a) {
          a.classList.add("active"); a.setAttribute("aria-current", "true");
          var nav = a.parentNode;
          if (nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: a.offsetLeft - 24, behavior: "smooth" });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = $(id); if (s) io.observe(s); });
  }

  function render(data) {
    state.data = data;
    if (state.mem.filter && (state.mem.filter !== "new" || data.updates.some(isNew))) state.filter = state.mem.filter;
    renderStamp();
    renderAnswers();
    renderTracker();
    renderUpdates();
    if (state.filter === "new" && !state.newCount) { state.filter = "all"; renderUpdates(); }
    syncChips();
    renderWelcome();
    renderStats(data.stats, false);
    renderSources();
    renderMemPanel();
    liveStats();
  }
  function boot() {
    loadMem();
    startVisit();
    wireTheme();
    wireShare();
    wireToTop();
    wireFilters();
    wireNav();
    $("clear-btn").addEventListener("click", clearMem);
    if (!window.fetch || location.protocol === "file:") return render(FALLBACK);
    fetch("data/status.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(render)
      .catch(function () { render(FALLBACK); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
