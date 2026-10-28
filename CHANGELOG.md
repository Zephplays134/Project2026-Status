# Changelog

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
