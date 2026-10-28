# Project 2026 Status

**Live site:** https://zephplays134.github.io/Project2026-Status/

A fan-run status tracker for **Project 2026**, the upcoming Roblox game from **Tableboard Studios** — the studio behind *Cruise Ship Simulator* and the *Cruise Line Simulator* games. It answers three questions with big YES / NO badges, keeps a dated log of status updates, and links every fact to where it came from.

> Not affiliated with Tableboard Studios or Roblox Corporation.

## Current status (28 Oct 2026)

| Question | Answer | Basis |
|---|---|---|
| Is Tableboard Studios making Project 2026? | ✅ **YES** | Listed on the official Tableboard Studios Roblox group and the founder's profile |
| Are they currently testing it internally? | ✅ **YES** | Confirmed by site owner (Zephplays134); supported by a private “Project 2026 Testing Server” listing |
| Are they finalizing internal testing? | ⚠️ **NOT CONFIRMED** | No public evidence either way |

The studio has not posted an official testing announcement. The official group still lists *“Project 2026 (2026) — To be announced.”*

## What's on the site

- **Three YES/NO answer cards** with the reasoning and sources for each
- **Status updates timeline** — dated entries, filter by Status / Official / Evidence / Game, show/hide older updates, “X days ago” labels
- **Cruise Ship Simulator stats** — visits, favorites, like ratio, group members, last update. Refreshes live from Roblox (through the public `roproxy.com` mirror) when it can, otherwise shows the numbers read on 28 Oct 2026
- **FAQ** and a **sources list** with the date each source was read
- **Last-updated stamp**, sticky section nav, dark mobile-first design, works with no build step

## Files

```
index.html         page structure
style.css          all styling (dark theme, responsive)
script.js          renders answers, updates, stats and sources from data/status.json
data/status.json   the single source of truth for every answer, update and source
README.md
CHANGELOG.md
LICENSE            MIT
```

`script.js` fetches `data/status.json`. It also carries a copy of the same data, so the page still works if you open `index.html` straight from your computer (browsers block `fetch` on `file://`).

## Updating the status

Edit `data/status.json`:

- Change an answer: set `"answer"` to `"YES"`, `"NO"` or `"NOT CONFIRMED"` and `"tone"` to `"yes"`, `"no"` or `"unknown"`.
- Add an update: add an object to `"updates"` with `date` (YYYY-MM-DD), `type` (`status`, `official`, `evidence` or `game`), `title`, `text` and optionally a `source` id.
- Bump `"lastUpdated"`.

Then paste the same JSON into the `FALLBACK` block at the top of `script.js` so the offline copy matches.

## Running it

- **Online:** GitHub Pages serves it from the `main` branch root — Settings → Pages → *Deploy from a branch* → `main` / `(root)`.
- **Locally:** open `index.html`, or run `python3 -m http.server` in the folder and visit http://localhost:8000.

## Sources (read 28 Oct 2026)

- Tableboard Studios official Roblox group (46,452 members): https://www.roblox.com/communities/4795028/Tableboard-Studios — lists “Project 2026 (2026) — To be announced”
- Bryce_TBS (Founder, CEO & Lead Developer) Roblox profile: https://www.roblox.com/users/127968748/profile — lists Project 2026 first under Current Projects
- Rotraces creator page for Bryce_TBS (third-party): https://rotraces.com/Bryce_TBS — lists “Project 2026 Testing Server” (46 visits) and “P26 Building Systems Development” (19 visits); neither is in Roblox's public game list
- Cruise Ship Simulator on Roblox: https://www.roblox.com/games/17234598656/Cruise-Ship-Simulator — 6,263,601 visits, 35,378 favorites, 9,625 likes / 2,797 dislikes, created 21 Apr 2024, updated 26 Oct 2026 (Roblox public API)
- Cruise Ship Simulator badges: https://badges.roblox.com/v1/universes/5897329101/badges — dates used for the game timeline
- Tableboard Studios projects page: https://sites.google.com/view/tableboardstudios/projects — doesn't mention Project 2026 yet

Not found: any official testing announcement, release date, trailer or feature list for Project 2026.

## Related

- [Elevator202](https://github.com/Zephplays134/Elevator202) — the original Project 2026 status monitor

## License

MIT — see [LICENSE](LICENSE).
