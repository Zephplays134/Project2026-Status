# Project 2026 Status

**Live site:** https://zephplays134.github.io/Project2026-Status/ · **Version:** 1.3.0

A fan-run status tracker for **Project 2026**, the upcoming Roblox game from **Tableboard Studios**, the studio behind *Cruise Ship Simulator* and the *Cruise Line Simulator* games. It answers three questions with big YES / NO badges, shows where the project is on a progress tracker, keeps a dated log of updates, and links every fact to its source. It also remembers each visitor, so a return visit shows what's new, and it **checks Roblox automatically**: a GitHub bot every 6 hours, and the open page every 2 minutes. Version 1.3 is a full **revamp**: a cruise-ship themed design, an “At a glance” dashboard, search, and link previews.

> Not affiliated with Tableboard Studios or Roblox Corporation.

## Current status (28 Oct 2026)

| Question | Answer | Basis |
|---|---|---|
| Is Tableboard Studios making Project 2026? | ✅ **YES** | Listed on the official Tableboard Studios Roblox group and the founder's profile |
| Are they currently testing it internally? | ✅ **YES** | Confirmed by site owner (Zephplays134). Supported by an official “Project 2026 Testing Server” that Roblox lists in the studio's invite-only development group (also seen on Rotraces) |
| Are they finalizing internal testing? | ⚠️ **NOT CONFIRMED** | No public evidence either way |

**Progress:** Announced ✓ → In development ✓ → **Internal testing (current)** → Finalizing (not confirmed) → Release (no date)

The studio hasn't posted a public testing announcement, and the official group still lists *“Project 2026 (2026) — To be announced.”*

## Key evidence

- **Project 2026 Testing Server** (Roblox universe 9312735138) sits in **Tableboard Studios Development**, the studio's invite-only group, which Bryce_TBS owns. Its description: *“The official testing server for Tableboard Studios's newest game. This game and it's contents are NDA, nothing may be posted publicly without permission from the development team.”* It was created 7 Dec 2025, last updated 20 Oct 2026, and holds 50 players. ([Roblox games API](https://games.roblox.com/v1/games?universeIds=9312735138))
- **P26 Building Systems Development** (universe 10764157170) is in the same group. It was created 28 Aug 2026, last updated 20 Oct 2026, and has no description. ([Roblox games API](https://games.roblox.com/v1/games?universeIds=10764157170))
- **The same pattern as before.** That group has held a testing server for every Tableboard game: Cruise Line Simulator: Classic (Jun 2021), A New Era (May 2022) and Cruise Ship Simulator (21 Apr 2024). ([group games list](https://games.roblox.com/v2/groups/7714371/gamesV2?accessFilter=Public))

## What's on the site

The page, top to bottom:

- **Hero:** the three answers as big animated cards (✓ YES · ✓ YES · ? NOT CONFIRMED), each with its basis, reasoning and sources, over a hand-drawn SVG ocean with a cruise ship sailing past. Plus **Copy summary**, the last-updated stamp and the version
- **At a glance** dashboard: progress (stage 3 of 5), Cruise Ship Simulator visits with an animated count-up and a **visits sparkline**, players online, group members, favorites, the number of dated updates, and the **latest auto-check** (this page's live check, the GitHub bot's last run and its next scheduled run, a **Check now** button). Welcome-back and attention notices appear here too
- **Progress tracker:** Announced → In development → Internal testing → Finalizing → Release, with the current stage highlighted and Finalizing marked unconfirmed, plus evidence cards for the two Project 2026 test places with live “last updated” dates
- **Status updates timeline:** 22 dated entries from 2021 to today, each with a type marker (status, official, evidence, game, auto-detected). **Search** across updates and the FAQ, filter chips with counts (Status / Official / Evidence / Game / Auto-detected / New for you), “X days ago” labels, show or hide older updates
- **What we know vs. what we don't:** sourced facts on one side, open questions on the other
- **More details:** the studio, developer Bryce_TBS, Cruise Ship Simulator (description, genre, server size, badges, ship classes from the fan wiki) and a table of every Tableboard game
- **Live stats:** Cruise Ship Simulator visits, favorites, players online, like ratio, group members and last update, refreshed from Roblox through the public `roproxy.com` mirror (static numbers from the last bot run if that fails)
- **Automatic checks:** the bot's and the page's status, with the full check log (watched values, changes, recent runs) folded away
- **FAQ** (12 questions, an accordion) and **sources** (17, each with the date it was read, folded away until you open them or follow a citation)
- **Your saved data** panel

### Revamp (v1.3)

- **Design system:** system fonts with tighter headings, glassy cards (blurred, translucent), one spacing scale, and reworked colors for both the dark and light themes. Mobile-first: everything is laid out for a 390px-wide phone first, then widens to 2, 3 and 4 columns
- **Sticky top nav** with an icon for every section. It scrolls sideways on phones and highlights the section you're reading
- **Maritime theme:** CSS/SVG waves and a cruise-ship silhouette, all drawn for this site (no Roblox or game assets)
- **Animations:** answer cards and badges stamp in, sections fade up as you scroll, numbers count up. All of it is switched off when your device asks for reduced motion
- **Search:** press <kbd>/</kbd> anywhere (or tap the magnifier in the nav) to search updates and the FAQ together. Matches are highlighted, the filter chips show where they are, and matching FAQ answers open. <kbd>Esc</kbd> clears it
- **Copy summary:** copies a short text status (the three answers with their basis, the current stage, the visits count and the link) for pasting into Discord or a chat
- **Link previews:** favicon (`assets/favicon.svg`, plus PNG and Apple touch icons) and Open Graph / Twitter card tags with a 1200×630 preview image (`assets/og-image.png`), so a shared link shows the title, the three answers and the picture

Also: dark/light toggle, share / copy-link button, back-to-top button, skip link, keyboard focus styles. No build step, no frameworks, no trackers, no external fonts.

## Automatic checks (v1.2)

The tracker watches Roblox on its own, in two layers. Neither one ever changes the three YES/NO answers or the progress tracker; those stay the site owner's call.

### 1. Server check (GitHub Actions, every 6 hours)

`.github/workflows/auto-check.yml` runs `scripts/check.mjs` at **00:17, 06:17, 12:17 and 18:17 UTC** (cron `17 */6 * * *`), and whenever you start it by hand. It needs no secrets: it only reads Roblox's public APIs.

**What it reads**

| What | API |
|---|---|
| Project 2026 Testing Server, P26 Building Systems Development, Cruise Ship Simulator: name, “last updated”, visits, players, favorites | `games.roblox.com/v1/games?universeIds=9312735138,10764157170,5897329101` |
| Cruise Ship Simulator likes/dislikes | `games.roblox.com/v1/games/votes` |
| Tableboard Studios group: description (the “Project 2026 (2026) To be announced.” line), members, shout | `groups.roblox.com/v1/groups/4795028` |
| Tableboard Studios Development group: description (the “Work in Progress” list, e.g. “Project 2027 (Release: TBA)”), members, shout | `groups.roblox.com/v1/groups/7714371` |
| Public games in both groups | `games.roblox.com/v2/groups/{id}/gamesV2` |
| Bryce_TBS's “Current projects” | `users.roblox.com/v1/users/127968748` |

**What counts as a change.** Each of these adds a dated entry to the updates log, tagged **Auto-detected**:

- a test place's (or Cruise Ship Simulator's) “last updated” time moves, or a place is renamed
- a new place appears in either group, or one disappears from a public list
- a group description changes (shown as removed / added lines) or a new group shout appears
- Bryce_TBS's current projects change

Visit, player and member counts are recorded, but they don't create log entries.

**Attention flags.** For big things the bot raises a flag that the page shows near the top, in the At a glance dashboard:

- a new game in the **main** group, especially one named Project 2026 / P26 (*“Public Project 2026 game detected: consider updating Finalizing / Release”*)
- the official “Project 2026” listing, the dev group's project list (“Project 2027”, “Release: TBA”) or a group shout about the project changes
- a test place is renamed or leaves the public list
- Project 2026 drops off the founder's current projects

To dismiss a flag after you've dealt with it, set its `"resolved": true` in `data/checks.json`.

**What it writes**

- `data/checks.json`: last run time and result, every watched value, the recent changes, the last 40 runs, the attention flags and (since v1.3) a `history` series: one point per run with Cruise Ship Simulator `visits`, `playing`, `favorites` and the group's `members`, last 120 points. The page draws its visits sparkline from it. Because the bot only commits on a change or once a day, the committed history gains about one point a day
- `data/status.json`: new Auto-detected updates and a fresh `stats` snapshot. It never touches `questions`, `stages` or `lastUpdated`, and it stops with an error if they would change.

It commits as `github-actions[bot]` only when something changed, a flag was raised, or the last commit is more than a day old (a daily refresh of the stats). Other runs still show on the Actions tab and on the page.

**Run it by hand**

- On GitHub: **Actions → Auto-check → Run workflow**. Tick *Commit checks.json even if nothing changed* to force a commit.
- On your computer (Node 18 or newer, no install needed):

  ```bash
  node scripts/check.mjs            # check and write data/checks.json + data/status.json
  node scripts/check.mjs --dry-run  # only print what changed
  ```

GitHub pauses scheduled workflows in a repository with no activity for 60 days. If that happens, open the Actions tab and click **Enable workflow**.

### 2. Live check (in your browser, every 2 minutes)

While the page is open it re-reads Roblox through `roproxy.com` (a public mirror of Roblox's API that browsers are allowed to call) every **2 minutes**, and pauses while the tab is hidden. It also re-reads `data/checks.json`, and asks GitHub's API for the workflow's latest run about every 10 minutes.

- In the **At a glance** dashboard: a status dot (green OK, blue checking, pink changed, red error, grey paused), **“Last auto-check: X ago · Next in m:ss”**, the GitHub bot's last run and next scheduled run, and a **Check now** button.
- A toast and a “Changed since you opened this page” box when a test place's update time, a group's place list or the official listing changes while you're reading. If the bot commits new entries meanwhile, the updates log reloads by itself.
- **Automatic checks** section: the bot's last run and result, its latest GitHub run, every watched value, the changes it has detected and its recent runs.
- **Memory:** the page saves what it last saw (`watch` in the `p26status` key), so your next visit starts with “Auto-check since your last visit: …”.

## Memory: what the site remembers

The site stores one small entry, `p26status`, in your browser's **localStorage**. Nothing is sent to a server, and there are no cookies or analytics.

| Saved | What it does |
|---|---|
| `theme` | Your dark/light choice, applied before the page paints so it doesn't flash. With no choice saved, it follows your device setting |
| `filter` | The update filter you last picked (All, Status, Official, Evidence, Game, Auto-detected, New for you) |
| `lastVisit` / `prevVisit` | When you visited. Updates added since your previous visit get a **NEW SINCE YOUR LAST VISIT** badge, a “New for you (N)” filter appears, and the hero says “Welcome back! Your last visit was 3 days ago. 2 updates are new since then.” Loads less than 30 minutes apart count as one visit, so a refresh doesn't wipe your badges |
| `snap` / `prevSnap` | A snapshot of the live Cruise Ship Simulator visits, favorites and group members. Next visit you'll see “+3,708 since your last visit” under each stat |
| `hist` | Since v1.3: this browser's own visit-count readings (at most one every 10 minutes, the last 60). They're added to the bot's `history` points in the At a glance sparkline |
| `watch` / `prevWatch` / `lastCheck` | What the live auto-check last saw: the test places' and Cruise Ship Simulator's update times, both groups' place lists and the official listing line. Next visit the page compares and shows “Auto-check since your last visit: Project 2026 Testing Server was updated …” |

The **Your saved data** panel at the bottom of the page lists exactly what's stored, and **Clear my saved data** deletes it. If your browser blocks storage (some private modes do), the page works normally and just doesn't remember.

Every update in `data/status.json` has an `added` timestamp. That's what the “new since your last visit” badge compares against, so give new entries the time you add them.

## Files

```
index.html         page structure and the static content (details, know/don't, FAQ)
style.css          design system: dark + light themes, glass cards, waves/ship scene, responsive layout, animations
script.js          renders answers, glance dashboard, tracker, updates, stats and sources; search, copy summary,
                   sparkline, theme, share, memory, live auto-check
assets/            favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.png (1200×630 link preview)
data/status.json   source of truth for answers, progress stages, updates, stats and sources
data/checks.json   written by the auto-check bot: last run, watched values, changes, attention flags
scripts/check.mjs  the auto-check script (Node, no dependencies)
.github/workflows/auto-check.yml   runs the script every 6 hours and commits the results
README.md
CHANGELOG.md
LICENSE            MIT
```

`script.js` fetches `data/status.json`. It also carries a copy of the same data, so the page still works if you open `index.html` straight from your computer (browsers block `fetch` on `file://`).

## Updating the status

Edit `data/status.json`:

- **Change an answer:** set `"answer"` to `"YES"`, `"NO"` or `"NOT CONFIRMED"`, and `"tone"` to `"yes"`, `"no"` or `"unknown"`.
- **Move the progress tracker:** set each stage's `"state"` to `done`, `current`, `unconfirmed` or `todo`.
- **Add an update:** add an object to `"updates"` with `date` (YYYY-MM-DD, when it happened), `added` (ISO time you added it; it drives the “new” badges), `type` (`status`, `official`, `evidence` or `game`), `title`, `text` and optionally a `source` id from `"sources"`.
- **Bump** `"lastUpdated"` and `"version"`.

Then paste the same JSON into the `FALLBACK` block at the top of `script.js` so the offline copy matches. If an answer changes, also update the `og:description` / `twitter:description` tags in `index.html` and the preview picture `assets/og-image.png`, since link previews can't run JavaScript. (Auto-detected entries live only in `data/status.json`; that's fine, the live site always reads it.)

## Running it

- **Online:** GitHub Pages serves it from the `main` branch root (Settings → Pages → *Deploy from a branch* → `main` / `(root)`).
- **Locally:** open `index.html`, or run `python3 -m http.server` in the folder and visit http://localhost:8000.

## Sources (all read 28 Oct 2026)

**Official (Roblox and the studio's own channels)**
- Tableboard Studios Roblox group: https://www.roblox.com/communities/4795028/Tableboard-Studios. 46,452 members, owner Bryce_TBS. Lists “Project 2026 (2026) — To be announced” under Current Games, and Cruise Line Simulator: A New Era and Classic as discontinued
- Tableboard Studios Development (invite-only, 33 members, owner Bryce_TBS): https://www.roblox.com/communities/7714371/Tableboard-Studios-Development. Its games list (https://games.roblox.com/v2/groups/7714371/gamesV2?accessFilter=Public) holds the Project 2026 Testing Server and P26 Building Systems Development. Its description lists “Project 2027 (Release: TBA)” under Work in Progress; whether that's a typo or a separate project isn't stated
- Project 2026 Testing Server: https://games.roblox.com/v1/games?universeIds=9312735138 (the place page is private)
- P26 Building Systems Development: https://games.roblox.com/v1/games?universeIds=10764157170
- Bryce_TBS Roblox profile: https://www.roblox.com/users/127968748/profile. Joined 19 May 2016, 1,105 followers. Lists Project 2026 first under Current Projects; “Founder, CEO & Lead Developer — Tableboard Studios”
- Cruise Ship Simulator: https://www.roblox.com/games/17234598656/Cruise-Ship-Simulator. 6,263,657 visits, 35,378 favorites, 9,625 likes / 2,797 dislikes, 15-player servers, Simulation › Vehicle Sim, created 21 Apr 2024, updated 26 Oct 2026. The description says it's “currently in BETA stages”
- Tableboard Studios games (Roblox games API): https://games.roblox.com/v2/groups/4795028/gamesV2?accessFilter=Public. A New Era: created 28 Dec 2022, 5,384,286 visits, 23,017 favorites. Classic: created May 2021, 346,739 visits, 2,256 favorites
- Staff roles (Roblox groups API): https://groups.roblox.com/v1/groups/4795028/roles. 1 Lead Developer & CEO, 1 Lead Builder & COO, 3 Senior Developers, 7 Developers, 1 Community Manager, 5 Administrators, 12 Moderators
- Cruise Ship Simulator badges: https://badges.roblox.com/v1/universes/5897329101/badges. Used for the dated badge entries; “You're a Billionaire!” was created 7 Sep 2025 and had 325 owners
- Discord (public invite info): https://discord.com/invite/tableboardstudios. Says “Founded in 2019”, about 7,170 members
- TikTok @tableboard_studios: update teaser, 13 Dec 2025 (https://www.tiktok.com/@tableboard_studios/video/7583437263288175903), and “largest update ever”, 5 Jul 2025 (https://www.tiktok.com/@tableboard_studios/video/7523595238141611295). Dates come from the posts' IDs
- Tableboard Studios projects page: https://sites.google.com/view/tableboardstudios/projects. Doesn't mention Project 2026 yet

**Third-party / fan**
- Rotraces creator page for Bryce_TBS: https://rotraces.com/Bryce_TBS. Lists both Project 2026 places
- Tableboard Studios Wiki (fan-run): https://tableboard-studios.fandom.com/wiki/Cruise_Ship_Simulator. Source of the ship-class list (Ships List, edited 11 Mar 2026) and the latest patch notes (server 0.1.3.8.5B, undated). Not official

**Not found:** an official public testing announcement, a release date, a trailer, screenshots or a feature list for Project 2026, or anything saying what kind of game it is. Nothing public says testing is being finalized.

## Related

- [Elevator202](https://github.com/Zephplays134/Elevator202): the original Project 2026 status monitor

## License

MIT. See [LICENSE](LICENSE).
