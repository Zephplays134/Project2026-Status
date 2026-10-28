# Changelog

## [1.2.0] — 2026-10-28

### Added
- **Server auto-check (GitHub Actions).** `.github/workflows/auto-check.yml` runs `scripts/check.mjs` every 6 hours (`17 */6 * * *` UTC) and on demand. It reads Roblox's public APIs for the two Project 2026 test places, Cruise Ship Simulator, both Tableboard groups (descriptions, shouts, members, public games) and Bryce_TBS's current projects. It writes `data/checks.json` and adds dated **Auto-detected** entries to the updates log when something meaningful changes. It commits as `github-actions[bot]` only when something changed, a flag was raised, or once a day to refresh the stats.
- **Attention flags.** Big changes (a public Project 2026 game, the official listing changing, a test place renamed or gone) raise a flag shown in a banner at the top of the page. The bot never changes the three answers, the progress stages or `lastUpdated`.
- **Live auto-check on the page.** Re-checks Roblox every 2 minutes while the tab is open (paused when hidden): status dot, “Last auto-check: X ago · Next in m:ss”, **Check now** button, a toast and a “Changed since you opened this page” box, and an automatic reload of the updates when the bot commits.
- **Automatic checks section:** the bot's last run and result, its latest GitHub run, the watched values, detected changes and recent runs.
- **Memory:** the page remembers what the auto-check last saw and shows “Auto-check since your last visit” next time. New **Auto-detected** filter in the updates log.
- `data/checks.json`, seeded with a real run on 28 Oct 2026, and an FAQ entry about the automatic checks.

### Unchanged
- All three answers: YES / YES (confirmed by site owner) / NOT CONFIRMED, and every existing fact, source and memory feature.

## [1.1.0] — 2026-10-28

### Added
- **More details**, all sourced and dated:
  - New evidence: Roblox lists the official “Project 2026 Testing Server” (created 7 Dec 2025) and “P26 Building Systems Development” (created 28 Aug 2026) in the studio's invite-only Tableboard Studios Development group.
  - Studio profile (members, Discord, staff roles, related groups), developer profile (Bryce_TBS), deeper Cruise Ship Simulator details (description, genre, server size, badges, fan-wiki ship classes and patch notes) and a table of every Tableboard game.
  - “What we know vs. what we don't” section.
  - Expanded FAQ (11 questions) and sources (17).
  - Updates log grown from 11 to 20 dated entries (2021 to 2026).
- **Upgrades:** progress tracker strip (Announced → In development → Internal testing → Finalizing → Release), dark/light theme toggle, share / copy-link button, back-to-top button, live “last updated” dates for both test places, live players-online stat, stacked mobile table, better accessibility labels.
- **Memory:** the site now remembers each visitor in localStorage under the key `p26status`: theme, update filter, last visit (“new since your last visit” badges plus a “New for you” filter) and a stats snapshot (“+N since your last visit”). A “Your saved data” panel lists what's stored, with a **Clear my saved data** button.
- `added` timestamps on every update, and `stages` and `version` fields in `data/status.json`.

### Changed
- The testing answer's supporting evidence now cites the official Roblox listing, not only Rotraces. All three answers are unchanged: YES / YES (confirmed by site owner) / NOT CONFIRMED.

## [1.0.0] — 2026-10-28

### Added
- First release of the Project 2026 Status site: `index.html`, `style.css`, `script.js`.
- Three YES/NO answer cards: making Project 2026 (**YES**), testing internally (**YES**, confirmed by site owner), finalizing testing (**NOT CONFIRMED**).
- `data/status.json` as the single data file, with an in-script fallback for offline viewing.
- Status updates timeline with category filters and show/hide for older entries.
- Cruise Ship Simulator stats with optional live refresh from Roblox.
- FAQ, dated sources, last-updated stamp, sticky nav.
- README, MIT license.
