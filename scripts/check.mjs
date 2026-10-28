#!/usr/bin/env node
/* Project 2026 Status — automatic check (v1.2)
 *
 * Reads Roblox's public APIs (no login, no secrets), compares what it sees with the last run
 * stored in data/checks.json, and:
 *   - always rewrites data/checks.json (last run, every watched value, what changed),
 *   - appends an "Auto-detected" entry to data/status.json's updates log for each meaningful change,
 *   - refreshes the stats snapshot in data/status.json,
 *   - raises "attention" flags for big things (a public Project 2026 game, the official listing changing).
 *
 * It NEVER changes the three headline answers, the progress stages or lastUpdated. Those stay
 * a human decision; a flag tells the site owner when one might need updating.
 *
 * Usage:  node scripts/check.mjs            (writes the files, prints a summary)
 *         node scripts/check.mjs --dry-run  (prints what it would change, writes nothing)
 * Node 18+ (uses the built-in fetch). No npm packages.
 *
 * When run inside GitHub Actions it writes `commit=true|false` and `summary=...` to $GITHUB_OUTPUT.
 * It asks for a commit when something meaningful changed, when an attention flag was raised, or
 * when the last committed run is over HEARTBEAT_HOURS old (keeps the page's stats fresh without
 * committing every 6 hours).
 */
import { readFile, writeFile, appendFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STATUS_PATH = path.join(ROOT, "data", "status.json");
const CHECKS_PATH = path.join(ROOT, "data", "checks.json");
const DRY = process.argv.includes("--dry-run");
const FORCE = process.argv.includes("--force") || process.env.FORCE_COMMIT === "true";
const HEARTBEAT_HOURS = 24;
const KEEP_CHANGES = 60;
const KEEP_RUNS = 40;

const IDS = {
  mainGroup: 4795028,          // Tableboard Studios
  devGroup: 7714371,           // Tableboard Studios Development (invite-only)
  founder: 127968748,          // Bryce_TBS
  css: 5897329101,             // Cruise Ship Simulator (universe)
  test: 9312735138,            // Project 2026 Testing Server (universe)
  build: 10764157170           // P26 Building Systems Development (universe)
};
const PLACE_LABEL = { css: "Cruise Ship Simulator", test: "Project 2026 Testing Server", build: "P26 Building Systems Development" };
const PLACE_SOURCE = { css: "css", test: "testserver", build: "buildplace" };
const P26_RE = /project\s*-?\s*2026|\bp26\b/i;

/* ---------------- helpers ---------------- */
async function getJSON(url, tries = 3) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 15000);
      const r = await fetch(url, { signal: ctrl.signal, headers: { "accept": "application/json", "user-agent": "Project2026-Status-autocheck (+https://github.com/Zephplays134/Project2026-Status)" } });
      clearTimeout(t);
      if (r.status === 429 || r.status >= 500) throw new Error("HTTP " + r.status);
      if (!r.ok) throw new Error("HTTP " + r.status);
      return await r.json();
    } catch (e) {
      last = e;
      await new Promise((res) => setTimeout(res, 1500 * (i + 1)));
    }
  }
  throw new Error(url + " → " + (last && last.message));
}
async function listGroupGames(groupId) {
  const out = [];
  let cursor = "";
  for (let page = 0; page < 10; page++) {
    const j = await getJSON(`https://games.roblox.com/v2/groups/${groupId}/gamesV2?accessFilter=Public&limit=50&sortOrder=Asc${cursor ? "&cursor=" + encodeURIComponent(cursor) : ""}`);
    for (const g of j.data || []) out.push({ id: g.id, name: g.name, placeId: g.rootPlace && g.rootPlace.id, created: g.created, updated: g.updated });
    if (!j.nextPageCursor) break;
    cursor = j.nextPageCursor;
  }
  return out.sort((a, b) => a.id - b.id);
}
const lines = (s) => String(s || "").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !/^-{5,}$/.test(l));
function lineDiff(a, b) {
  const A = lines(a), B = lines(b);
  return { removed: A.filter((l) => !B.includes(l)), added: B.filter((l) => !A.includes(l)) };
}
function profileProjects(desc) {
  // The "CURRENT PROJECTS" bullet list on Bryce_TBS's profile.
  const L = String(desc || "").split(/\r?\n/);
  const i = L.findIndex((l) => /current projects/i.test(l));
  if (i < 0) return [];
  const out = [];
  for (let j = i + 1; j < L.length; j++) {
    const t = L[j].trim();
    if (!t) { if (out.length) break; else continue; }
    if (!/^[•\-*]/.test(t)) break;
    out.push(t.replace(/^[•\-*]\s*/, ""));
  }
  return out;
}
function p26Line(desc) {
  // The official group's "-Project 2026 (2026)" entry plus the line right after it ("To be announced.").
  const L = lines(desc);
  const i = L.findIndex((l) => P26_RE.test(l));
  if (i < 0) return null;
  return L[i] + (L[i + 1] && !/^-/.test(L[i + 1]) ? " — " + L[i + 1] : "");
}
function wipLines(desc) {
  // The dev group's "—Work in Progress—" list (e.g. "Project 2027 (Release: TBA)").
  const L = lines(desc);
  const i = L.findIndex((l) => /work in progress/i.test(l));
  if (i < 0) return [];
  const out = [];
  for (let j = i + 1; j < L.length && !/^[—–-]{1,2}\S.*[—–-]$/.test(L[j]); j++) out.push(L[j]);
  return out;
}
const day = (iso) => String(iso || "").slice(0, 10);
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function human(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return String(iso);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
function humanTime(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return String(iso);
  return `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")} UTC on ${human(iso)}`;
}
const q = (s) => `“${s}”`;

/* ---------------- read Roblox ---------------- */
async function readRoblox() {
  const errors = [];
  const v = {};
  const safe = async (label, fn) => { try { return await fn(); } catch (e) { errors.push(`${label}: ${e.message}`); return undefined; } };

  const [games, votes, mainGroup, devGroup, founder, mainGames, devGames] = await Promise.all([
    safe("games", () => getJSON(`https://games.roblox.com/v1/games?universeIds=${IDS.css},${IDS.test},${IDS.build}`)),
    safe("votes", () => getJSON(`https://games.roblox.com/v1/games/votes?universeIds=${IDS.css}`)),
    safe("main group", () => getJSON(`https://groups.roblox.com/v1/groups/${IDS.mainGroup}`)),
    safe("dev group", () => getJSON(`https://groups.roblox.com/v1/groups/${IDS.devGroup}`)),
    safe("founder profile", () => getJSON(`https://users.roblox.com/v1/users/${IDS.founder}`)),
    safe("main group games", () => listGroupGames(IDS.mainGroup)),
    safe("dev group games", () => listGroupGames(IDS.devGroup))
  ]);

  if (games && Array.isArray(games.data)) {
    const by = Object.fromEntries(games.data.map((g) => [g.id, g]));
    for (const key of ["css", "test", "build"]) {
      const g = by[IDS[key]];
      if (!g) { errors.push(`games: ${PLACE_LABEL[key]} missing from the API answer`); continue; }
      v[key] = { name: g.name, updated: g.updated, created: g.created, visits: g.visits, playing: g.playing, favorites: g.favoritedCount, maxPlayers: g.maxPlayers };
    }
  }
  if (votes && votes.data && votes.data[0]) v.cssVotes = { up: votes.data[0].upVotes, down: votes.data[0].downVotes };
  if (mainGroup) v.mainGroup = { name: mainGroup.name, members: mainGroup.memberCount, description: mainGroup.description, shout: mainGroup.shout ? mainGroup.shout.body : null, p26: p26Line(mainGroup.description) };
  if (devGroup) v.devGroup = { name: devGroup.name, members: devGroup.memberCount, description: devGroup.description, shout: devGroup.shout ? devGroup.shout.body : null };
  if (founder) v.founder = { name: founder.name, projects: profileProjects(founder.description) };
  if (mainGames) v.mainGames = mainGames;
  if (devGames) v.devGames = devGames;
  return { values: v, errors };
}

/* ---------------- compare ---------------- */
function compare(prev, cur, now) {
  const changes = [];   // meaningful → each becomes an updates-log entry
  const flags = [];     // attention flags
  if (!prev) return { changes, flags };
  const add = (c) => changes.push(Object.assign({ at: now }, c));

  // 1. "Last updated" on the watched places
  for (const key of ["test", "build", "css"]) {
    const a = prev[key], b = cur[key];
    if (!a || !b) continue;
    if (a.updated && b.updated && a.updated !== b.updated) {
      add({ kind: "place-updated", key, date: day(b.updated), type: key === "css" ? "game" : "evidence", source: PLACE_SOURCE[key],
        title: `${PLACE_LABEL[key]} updated`,
        text: `Roblox now shows ${PLACE_LABEL[key]} as last updated at ${humanTime(b.updated)} (previous check: ${human(a.updated)}).`,
        before: a.updated, after: b.updated });
    }
    if (a.name && b.name && a.name !== b.name) {
      add({ kind: "place-renamed", key, date: day(now), type: "evidence", source: PLACE_SOURCE[key],
        title: `${PLACE_LABEL[key]} renamed`, text: `The place's name changed from ${q(a.name)} to ${q(b.name)}.`, before: a.name, after: b.name });
      if (key !== "css") flags.push({ id: `renamed-${key}`, level: "high", title: `${PLACE_LABEL[key]} was renamed`,
        text: `Now called ${q(b.name)}. Worth a look: a rename can mean the project is getting its real name.` });
    }
  }

  // 2. New or removed games in either group
  for (const [gk, label, source] of [["mainGames", "the main Tableboard Studios group", "games"], ["devGames", "the Tableboard Studios Development group", "devgames"]]) {
    const a = prev[gk], b = cur[gk];
    if (!a || !b) continue;
    const aIds = new Set(a.map((g) => g.id)), bIds = new Set(b.map((g) => g.id));
    for (const g of b.filter((g) => !aIds.has(g.id))) {
      const p26 = P26_RE.test(g.name);
      add({ kind: "new-game", group: gk, date: day(now), type: gk === "mainGames" ? "official" : "evidence", source,
        title: `New place in ${gk === "mainGames" ? "the main group" : "the dev group"}: ${g.name}`,
        text: `A new experience appeared in ${label}'s public list: ${q(g.name)}` + (g.created ? `, created ${human(g.created)}.` : ".") +
              (g.placeId ? ` Place ID ${g.placeId}.` : ""),
        after: g });
      if (gk === "mainGames") {
        flags.push(p26
          ? { id: `public-p26-${g.id}`, level: "high", title: "Public Project 2026 game detected", text: `${q(g.name)} appeared in the main Tableboard Studios group. Consider updating the Finalizing / Release answers.`, url: g.placeId ? `https://www.roblox.com/games/${g.placeId}` : undefined }
          : { id: `new-main-game-${g.id}`, level: "high", title: "New game in the main group", text: `${q(g.name)} appeared in the main Tableboard Studios group. Check whether it's Project 2026.`, url: g.placeId ? `https://www.roblox.com/games/${g.placeId}` : undefined });
      } else if (p26) {
        flags.push({ id: `new-p26-dev-${g.id}`, level: "info", title: "New Project 2026 dev place", text: `${q(g.name)} appeared in the development group.` });
      }
    }
    for (const g of a.filter((g) => !bIds.has(g.id))) {
      add({ kind: "game-removed", group: gk, date: day(now), type: "evidence", source,
        title: `${g.name} left ${gk === "mainGames" ? "the main group's" : "the dev group's"} public list`,
        text: `${q(g.name)} is no longer in ${label}'s public games list. It may have been made private, moved or deleted.`, before: g });
      if (g.id === IDS.test || g.id === IDS.build) flags.push({ id: `gone-${g.id}`, level: "high", title: `${g.name} disappeared from the public list`, text: "Check whether the testing places were made private or moved." });
    }
    for (const g of b) {
      const old = a.find((x) => x.id === g.id);
      if (old && old.name !== g.name && g.id !== IDS.test && g.id !== IDS.build && g.id !== IDS.css) {
        add({ kind: "game-renamed", group: gk, date: day(now), type: "evidence", source,
          title: `Place renamed: ${g.name}`, text: `${q(old.name)} is now called ${q(g.name)}.`, before: old.name, after: g.name });
        if (P26_RE.test(g.name) && !P26_RE.test(old.name)) flags.push({ id: `p26-rename-${g.id}`, level: "high", title: "A place was renamed to Project 2026", text: `${q(old.name)} → ${q(g.name)}.` });
      }
    }
  }

  // 3. Group descriptions and shouts
  for (const [gk, label, source] of [["mainGroup", "Official group", "group"], ["devGroup", "Dev group", "devgroup"]]) {
    const a = prev[gk], b = cur[gk];
    if (!a || !b) continue;
    if (a.description !== b.description) {
      const d = lineDiff(a.description, b.description);
      if (d.added.length || d.removed.length) {
        const parts = [];
        if (d.removed.length) parts.push("Removed " + d.removed.map(q).join(", "));
        if (d.added.length) parts.push((parts.length ? "added " : "Added ") + d.added.map(q).join(", "));
        add({ kind: "description", group: gk, date: day(now), type: "official", source,
          title: `${label} description changed`, text: parts.join("; ") + ".", before: d.removed, after: d.added });
        const touched = d.added.concat(d.removed);
        if (touched.some((l) => /project\s*202\d|to be announced|release|tba/i.test(l))) {
          flags.push({ id: `desc-${gk}-${day(now)}`, level: "high",
            title: gk === "mainGroup" ? "Official Project 2026 listing changed" : "Dev group's project list changed",
            text: parts.join("; ") + ". Check whether the answers or the release stage need updating." });
        }
      }
    }
    if ((a.shout || null) !== (b.shout || null) && b.shout) {
      add({ kind: "shout", group: gk, date: day(now), type: "official", source,
        title: `New ${gk === "mainGroup" ? "group" : "dev group"} shout`, text: q(b.shout.slice(0, 280)), after: b.shout });
      if (/2026|p26|test|release|launch/i.test(b.shout)) flags.push({ id: `shout-${gk}-${day(now)}`, level: "high", title: "Group shout mentions the project", text: q(b.shout.slice(0, 200)) });
    }
  }

  // 4. Founder's "Current projects"
  if (prev.founder && cur.founder && JSON.stringify(prev.founder.projects) !== JSON.stringify(cur.founder.projects)) {
    add({ kind: "projects", date: day(now), type: "official", source: "profile",
      title: "Bryce_TBS's current projects changed",
      text: `Profile now lists: ${cur.founder.projects.map(q).join(", ") || "(none)"}. Before: ${prev.founder.projects.map(q).join(", ") || "(none)"}.`,
      before: prev.founder.projects, after: cur.founder.projects });
    if (!cur.founder.projects.some((p) => P26_RE.test(p))) flags.push({ id: `profile-p26-${day(now)}`, level: "high", title: "Project 2026 left the founder's current projects", text: "Check whether it shipped, was renamed or was dropped." });
  }
  return { changes, flags };
}

/* ---------------- main ---------------- */
async function main() {
  const now = new Date().toISOString();
  const status = JSON.parse(await readFile(STATUS_PATH, "utf8"));
  let checks = null;
  try { checks = JSON.parse(await readFile(CHECKS_PATH, "utf8")); } catch { /* first run */ }
  const prevValues = checks && checks.values;

  const { values, errors } = await readRoblox();
  const okCount = ["css", "test", "build", "mainGroup", "devGroup", "founder", "mainGames", "devGames"].filter((k) => values[k]).length;
  // Carry forward anything this run couldn't read, so a flaky API never looks like a change.
  const merged = Object.assign({}, prevValues || {}, values);
  const { changes, flags } = compare(prevValues, merged, now);

  // --- status.json: append auto-detected entries + refresh the stats snapshot (answers untouched) ---
  const headlineBefore = JSON.stringify([status.questions, status.stages, status.lastUpdated]);
  for (const c of changes) {
    status.updates.push({
      date: c.date, added: now, type: c.type, auto: true,
      title: c.title, text: c.text,
      source: c.source
    });
  }
  const st = status.stats || {};
  if (values.css) {
    st.visits = values.css.visits; st.favorites = values.css.favorites; st.playing = values.css.playing;
    st.updated = day(values.css.updated); st.maxPlayers = values.css.maxPlayers;
  }
  if (values.cssVotes) { st.upVotes = values.cssVotes.up; st.downVotes = values.cssVotes.down; }
  if (values.mainGroup) st.groupMembers = values.mainGroup.members;
  if (values.test) st.testUpdated = day(values.test.updated);
  if (values.build) st.buildUpdated = day(values.build.updated);
  if (okCount) st.readDate = day(now);
  status.stats = st;
  if (JSON.stringify([status.questions, status.stages, status.lastUpdated]) !== headlineBefore) throw new Error("refusing to touch the headline answers");

  // --- attention flags: keep old ones, add new (deduped by id) ---
  const attention = (checks && checks.attention) || [];
  for (const f of flags) if (!attention.some((a) => a.id === f.id)) attention.unshift(Object.assign({ raisedAt: now, resolved: false }, f));

  // --- decide whether this run is worth a commit ---
  const lastCommitted = checks && checks.lastCommittedRun;
  const heartbeatDue = !lastCommitted || Date.now() - new Date(lastCommitted).getTime() > HEARTBEAT_HOURS * 3600e3;
  const commit = FORCE || changes.length > 0 || flags.length > 0 || heartbeatDue || !checks;
  const reason = !checks ? "first run (seed)" : changes.length ? `${changes.length} change(s)` : flags.length ? "attention flag" : FORCE ? "manual run" : heartbeatDue ? "daily refresh" : "nothing new";

  const run = { at: now, ok: errors.length === 0, partial: errors.length > 0 && okCount > 0, changes: changes.length, errors: errors.slice(0, 5), via: process.env.GITHUB_ACTIONS ? (process.env.GITHUB_EVENT_NAME || "actions") : "local", committed: commit, reason };
  const watched = {
    testUpdated: merged.test && merged.test.updated, buildUpdated: merged.build && merged.build.updated, cssUpdated: merged.css && merged.css.updated,
    cssVisits: merged.css && merged.css.visits, cssPlaying: merged.css && merged.css.playing, cssFavorites: merged.css && merged.css.favorites,
    groupMembers: merged.mainGroup && merged.mainGroup.members, devGroupMembers: merged.devGroup && merged.devGroup.members,
    p26Listing: merged.mainGroup && merged.mainGroup.p26,
    devGroupWip: merged.devGroup ? wipLines(merged.devGroup.description) : undefined,
    founderProjects: merged.founder && merged.founder.projects,
    mainGames: merged.mainGames && merged.mainGames.length, devGames: merged.devGames && merged.devGames.length
  };
  const out = {
    schema: 1,
    about: "Written by scripts/check.mjs (GitHub Actions, every 6 hours). Watched values, what changed, attention flags. The three headline answers are never changed automatically.",
    lastRun: now,
    lastRunOk: run.ok,
    lastCommittedRun: commit ? now : lastCommitted,
    schedule: "every 6 hours (cron 17 */6 * * *, UTC) + manual runs",
    watched,
    attention,
    changes: changes.map((c) => ({ at: c.at, kind: c.kind, type: c.type, title: c.title, text: c.text, source: c.source }))
      .concat((checks && checks.changes) || []).slice(0, KEEP_CHANGES),
    runs: [run].concat((checks && checks.runs) || []).slice(0, KEEP_RUNS),
    values: merged
  };

  const summary = `${reason}; ${changes.length} change(s), ${flags.length} new flag(s), ${errors.length} error(s)`;
  console.log("auto-check:", summary);
  for (const c of changes) console.log("  •", c.title, "—", c.text);
  for (const f of flags) console.log("  ⚑", f.title, "—", f.text);
  for (const e of errors) console.log("  ✗", e);

  if (!DRY) {
    await writeFile(CHECKS_PATH, JSON.stringify(out, null, 2) + "\n");
    await writeFile(STATUS_PATH, JSON.stringify(status, null, 2) + "\n");
  }
  if (process.env.GITHUB_OUTPUT) {
    await appendFile(process.env.GITHUB_OUTPUT, `commit=${commit && !DRY}\nsummary=${summary.replace(/\n/g, " ")}\n`);
  }
  if (okCount === 0) { console.error("auto-check: every Roblox request failed"); process.exitCode = 1; }
}

main().catch((e) => { console.error(e); process.exit(1); });
