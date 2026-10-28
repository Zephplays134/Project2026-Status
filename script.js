/* Project 2026 Status — renders everything from data/status.json.
   The FALLBACK copy below lets the page work when opened straight from disk (file://),
   where browsers block fetch(). Keep it in sync with data/status.json. */
(function () {
  "use strict";

  var FALLBACK = {
    "project": "Project 2026",
    "studio": "Tableboard Studios",
    "owner": "Zephplays134",
    "lastUpdated": "2026-10-28T12:05:00Z",
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
        "detail": "Supporting evidence: a third-party tracker lists a private “Project 2026 Testing Server” and a “P26 Building Systems Development” place among Bryce_TBS's experiences. Tableboard Studios has not posted an official testing announcement.",
        "sources": [
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
        "detail": "Nothing public says testing is in its final stage, and nothing says it isn't. The official listing still reads “To be announced”.",
        "sources": [
          "group"
        ]
      }
    ],
    "updates": [
      {
        "date": "2026-10-28",
        "type": "status",
        "title": "Tracker launched",
        "text": "Status set: Making Project 2026 — YES. Testing internally — YES (confirmed by site owner). Finalizing testing — NOT CONFIRMED."
      },
      {
        "date": "2026-10-28",
        "type": "official",
        "title": "Official group still says “To be announced”",
        "text": "Checked today: the Tableboard Studios group (46,452 members) lists “Project 2026 (2026) — To be announced” under Current Games. No release date, trailer or feature list.",
        "source": "group"
      },
      {
        "date": "2026-10-28",
        "type": "official",
        "title": "Founder's profile lists Project 2026",
        "text": "Checked today: Bryce_TBS (Founder, CEO & Lead Developer) lists Project 2026 first under Current Projects, ahead of Cruise Ship Simulator.",
        "source": "profile"
      },
      {
        "date": "2026-10-28",
        "type": "evidence",
        "title": "Private testing places spotted",
        "text": "Checked today: rotraces.com lists “Project 2026 Testing Server” (46 visits) and “P26 Building Systems Development” (19 visits) under Bryce_TBS. Neither is in Roblox's public game list.",
        "source": "rotraces"
      },
      {
        "date": "2026-10-28",
        "type": "evidence",
        "title": "Studio website doesn't mention it yet",
        "text": "Checked today: the Tableboard Studios projects page only covers the older Cruise Line Simulator games.",
        "source": "site"
      },
      {
        "date": "2026-10-26",
        "type": "game",
        "title": "Cruise Ship Simulator updated",
        "text": "Roblox shows Cruise Ship Simulator was last updated on 26 Oct 2026.",
        "source": "css"
      },
      {
        "date": "2026-03-20",
        "type": "game",
        "title": "“World's Largest Cruise Ship” badge added",
        "text": "Badge creation date in Cruise Ship Simulator, from Roblox's badge list.",
        "source": "badges"
      },
      {
        "date": "2025-12-20",
        "type": "game",
        "title": "Grand Cayman badge added",
        "text": "Badge creation date in Cruise Ship Simulator.",
        "source": "badges"
      },
      {
        "date": "2025-08-09",
        "type": "game",
        "title": "Oasis Class badge added",
        "text": "Badge creation date in Cruise Ship Simulator.",
        "source": "badges"
      },
      {
        "date": "2025-02-02",
        "type": "game",
        "title": "Triton Class badge added",
        "text": "Badge creation date in Cruise Ship Simulator.",
        "source": "badges"
      },
      {
        "date": "2024-04-21",
        "type": "game",
        "title": "Cruise Ship Simulator created",
        "text": "The studio's current game goes up on Roblox.",
        "source": "css"
      }
    ],
    "stats": {
      "universeId": 5897329101,
      "placeId": 17234598656,
      "readDate": "2026-10-28",
      "visits": 6263601,
      "favorites": 35378,
      "upVotes": 9625,
      "downVotes": 2797,
      "maxPlayers": 15,
      "created": "2024-04-21",
      "updated": "2026-10-26",
      "groupMembers": 46452
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
        "id": "badges",
        "name": "Cruise Ship Simulator badges — Roblox badges API",
        "url": "https://badges.roblox.com/v1/universes/5897329101/badges",
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
        "id": "owner",
        "name": "Site owner confirmation (Zephplays134)",
        "url": "https://github.com/Zephplays134",
        "kind": "Owner",
        "read": "2026-10-28"
      }
    ]
  };

  var SHOW_FIRST = 6;          // updates shown before "Show older updates"
  var state = { data: null, filter: "all", expanded: false };

  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function fmtDate(iso) {
    var p = String(iso).slice(0, 10).split("-");
    return Number(p[2]) + " " + MONTHS[Number(p[1]) - 1] + " " + p[0];
  }
  function fmtNum(n) { return Number(n).toLocaleString("en-US"); }
  function relDays(iso) {
    var then = new Date(String(iso).length <= 10 ? iso + "T12:00:00Z" : iso);
    var days = Math.floor((Date.now() - then.getTime()) / 86400000);
    if (isNaN(days)) return "";
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
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function sourceById(id) {
    return (state.data.sources || []).filter(function (s) { return s.id === id; })[0];
  }
  function kindClass(kind) { return String(kind || "").toLowerCase().replace(/[^a-z]+/g, "-"); }

  /* ---------- answers ---------- */
  function renderAnswers() {
    var grid = document.getElementById("answer-grid");
    grid.textContent = "";
    state.data.questions.forEach(function (q, i) {
      var cites = el("p", { className: "cites" }, [document.createTextNode("Sources: ")]);
      (q.sources || []).forEach(function (id, j) {
        var s = sourceById(id);
        if (!s) return;
        if (j) cites.appendChild(document.createTextNode(" · "));
        cites.appendChild(el("a", { href: s.url, target: "_blank", rel: "noopener", text: s.name.split(" — ")[0] }));
      });
      grid.appendChild(el("article", { className: "answer " + q.tone, id: "q-" + q.id }, [
        el("p", { className: "num-q", text: "Question " + (i + 1) }),
        el("h3", { className: "q", text: q.question }),
        el("p", { className: "badge", text: q.answer, "aria-label": "Answer: " + q.answer }),
        el("p", { className: "basis", text: q.basis }),
        el("p", { className: "detail", text: q.detail }),
        cites
      ]));
    });
  }

  /* ---------- updates timeline ---------- */
  function renderUpdates() {
    var list = document.getElementById("timeline");
    var btn = document.getElementById("toggle-more");
    list.textContent = "";
    var items = state.data.updates.slice().sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
    var matching = items.filter(function (u) { return state.filter === "all" || u.type === state.filter; });
    matching.forEach(function (u, i) {
      var src = u.source && sourceById(u.source);
      var li = el("li", { className: "entry", "data-type": u.type }, [
        el("div", { className: "meta" }, [
          el("time", { datetime: u.date, text: fmtDate(u.date) }),
          el("span", { className: "tag " + u.type, text: u.type }),
          el("span", { text: relDays(u.date) })
        ]),
        el("h3", { text: u.title }),
        el("p", { text: u.text }),
        src ? el("a", { className: "src", href: src.url, target: "_blank", rel: "noopener", text: "Source: " + src.name.split(" — ")[0] + " ↗" }) : null
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

  function wireFilters() {
    var chips = document.querySelectorAll("#filters .chip");
    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener("click", function () {
        state.filter = chip.getAttribute("data-filter");
        state.expanded = false;
        Array.prototype.forEach.call(chips, function (c) {
          var on = c === chip;
          c.classList.toggle("is-on", on);
          c.setAttribute("aria-pressed", String(on));
        });
        renderUpdates();
      });
    });
    document.getElementById("toggle-more").addEventListener("click", function () {
      state.expanded = !state.expanded;
      renderUpdates();
    });
  }

  /* ---------- stats ---------- */
  function setStat(key, value) {
    var node = document.querySelector('[data-stat="' + key + '"]');
    if (node) node.textContent = value;
  }
  function renderStats(st, live) {
    setStat("visits", fmtNum(st.visits));
    setStat("favorites", fmtNum(st.favorites));
    var votes = st.upVotes + st.downVotes;
    if (votes) setStat("rating", Math.round((st.upVotes / votes) * 100) + "%");
    setStat("groupMembers", fmtNum(st.groupMembers));
    setStat("updated", fmtDate(st.updated));
    setStat("created", fmtDate(st.created));
    var stamp = document.getElementById("stats-stamp");
    if (live) {
      stamp.innerHTML = "";
      stamp.appendChild(el("span", { className: "live-tag", text: "● Live " }));
      stamp.appendChild(document.createTextNode("from Roblox just now · like ratio from " + fmtDate(st.readDate)));
    } else {
      stamp.textContent = "Read from Roblox on " + fmtDate(st.readDate);
    }
  }
  // Optional live refresh through a public CORS-enabled Roblox mirror. Falls back silently.
  function liveStats() {
    var st = Object.assign({}, state.data.stats);
    if (!window.fetch || location.protocol === "file:") return;
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 6000);
    var opts = ctrl ? { signal: ctrl.signal } : {};
    var gameReq = fetch("https://games.roproxy.com/v1/games?universeIds=" + st.universeId, opts).then(function (r) { if (!r.ok) throw 0; return r.json(); });
    var groupReq = fetch("https://groups.roproxy.com/v1/groups/4795028", opts).then(function (r) { if (!r.ok) throw 0; return r.json(); }).catch(function () { return null; });
    Promise.all([gameReq, groupReq]).then(function (res) {
      clearTimeout(timer);
      var g = res[0] && res[0].data && res[0].data[0];
      if (!g || typeof g.visits !== "number") return;
      st.visits = g.visits;
      st.favorites = g.favoritedCount;
      if (g.updated) st.updated = g.updated.slice(0, 10);
      if (res[1] && typeof res[1].memberCount === "number") st.groupMembers = res[1].memberCount;
      renderStats(st, true);
    }).catch(function () { clearTimeout(timer); });
  }

  /* ---------- sources ---------- */
  function renderSources() {
    var list = document.getElementById("source-list");
    list.textContent = "";
    state.data.sources.forEach(function (s) {
      list.appendChild(el("li", { id: "src-" + s.id }, [
        el("a", { href: s.url, target: "_blank", rel: "noopener", text: s.name }),
        el("span", { className: "tag " + kindClass(s.kind), text: s.kind }),
        el("span", { className: "muted small", text: "read " + fmtDate(s.read) })
      ]));
    });
  }

  /* ---------- last updated ---------- */
  function renderStamp() {
    var t = document.getElementById("last-updated");
    t.setAttribute("datetime", state.data.lastUpdated);
    t.textContent = fmtDate(state.data.lastUpdated);
    document.getElementById("last-updated-rel").textContent = "(" + relDays(state.data.lastUpdated) + ")";
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
        Array.prototype.forEach.call(links, function (a) { a.classList.remove("active"); });
        var a = map[e.target.id];
        if (a) { a.classList.add("active"); if (a.scrollIntoView && window.innerWidth < 720) a.parentNode.scrollLeft = a.offsetLeft - 16; }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  function render(data) {
    state.data = data;
    renderStamp();
    renderAnswers();
    renderUpdates();
    renderStats(data.stats, false);
    renderSources();
    liveStats();
  }

  function boot() {
    wireFilters();
    wireNav();
    if (!window.fetch || location.protocol === "file:") return render(FALLBACK);
    fetch("data/status.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(render)
      .catch(function () { render(FALLBACK); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
