# Project 2026 Status

**Live site:** https://zephplays134.github.io/Project2026-Status/ · **Version:** 1.1.0

A fan-run status tracker for **Project 2026**, the upcoming Roblox game from **Tableboard Studios**, the studio behind *Cruise Ship Simulator* and the *Cruise Line Simulator* games. It answers three questions with big YES / NO badges, shows where the project is on a progress tracker, keeps a dated log of updates, and links every fact to its source. It also remembers each visitor, so a return visit shows what's new.

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

- **Three YES/NO answer cards**, each with its reasoning and sources
- **Progress tracker strip:** Announced → In development → Internal testing → Finalizing → Release, with the current stage highlighted and Finalizing marked unconfirmed
- **Evidence cards** for the two Project 2026 test places, with live “last updated” dates
- **Status updates timeline:** 20 dated entries from 2021 to today. Filter by Status / Official / Evidence / Game / New for you, show or hide older updates, “X days ago” labels
- **What we know vs. what we don't:** sourced facts on one side, open questions on the other
- **More details:** the studio, developer Bryce_TBS, Cruise Ship Simulator (description, genre, server size, badges, ship classes from the fan wiki) and a table of every Tableboard game
- **Live stats:** Cruise Ship Simulator visits, favorites, players online, like ratio, group members and last update, refreshed from Roblox through the public `roproxy.com` mirror (static numbers from 28 Oct 2026 if that fails)
- **FAQ** (11 questions) and **sources** (17, each with the date it was read)
- **Upgrades:** dark/light toggle, share / copy-link button, back-to-top button, sticky section nav that tracks where you are, skip link, keyboard focus styles, reduced-motion support. No build step, no frameworks, no trackers

## Memory: what the site remembers

The site stores one small entry, `p26status`, in your browser's **localStorage**. Nothing is sent to a server, and there are no cookies or analytics.

| Saved | What it does |
|---|---|
| `theme` | Your dark/light choice, applied before the page paints so it doesn't flash. With no choice saved, it follows your device setting |
| `filter` | The update filter you last picked (All, Status, Official, Evidence, Game, New for you) |
| `lastVisit` / `prevVisit` | When you visited. Updates added since your previous visit get a **NEW SINCE YOUR LAST VISIT** badge, a “New for you (N)” filter appears, and the hero says “Welcome back! Your last visit was 3 days ago. 2 updates are new since then.” Loads less than 30 minutes apart count as one visit, so a refresh doesn't wipe your badges |
| `snap` / `prevSnap` | A snapshot of the live Cruise Ship Simulator visits, favorites and group members. Next visit you'll see “+3,708 since your last visit” under each stat |

The **Your saved data** panel at the bottom of the page lists exactly what's stored, and **Clear my saved data** deletes it. If your browser blocks storage (some private modes do), the page works normally and just doesn't remember.

Every update in `data/status.json` has an `added` timestamp. That's what the “new since your last visit” badge compares against, so give new entries the time you add them.

## Files

```
index.html         page structure and the static content (details, know/don't, FAQ)
style.css          styling: dark + light themes, responsive layout
script.js          renders answers, tracker, updates, stats and sources; theme, share, memory
data/status.json   source of truth for answers, progress stages, updates, stats and sources
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

Then paste the same JSON into the `FALLBACK` block at the top of `script.js` so the offline copy matches.

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
