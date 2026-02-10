# Requirements: Sleek Match

**Defined:** 2025-02-10
**Core Value:** A frictionless, beautiful puzzle experience that works perfectly offline and respects the player's time with instant resume and fluid interactions.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Core Gameplay

- [ ] **GAME-01**: User starts with a fixed "Classic" board (numbers 1-19 sequence)
- [ ] **GAME-02**: User can select two matching numbers (equal or sum=10) to clear them
- [ ] **GAME-03**: Selection logic skips already cleared cells (connectivity check)
- [ ] **GAME-04**: User can "Add Lines" to duplicate remaining numbers to the bottom
- [ ] **GAME-05**: Game detects "No Moves Left" state (Win or Lose condition)
- [ ] **GAME-06**: User can reset the board to start over

### Grid & Visuals

- [ ] **GRID-01**: Grid renders 9 columns with high performance (FlashList)
- [ ] **GRID-02**: Cleared cells remain visually empty (preserving grid structure)
- [ ] **GRID-03**: Animations play smoothly (60fps) on match and add lines
- [ ] **GRID-04**: UI is strictly Dark Mode with minimalist aesthetic

### Helpers

- [ ] **HELP-01**: User can Undo the last move
- [ ] **HELP-02**: User can request a Hint (highlights a valid pair)
- [ ] **HELP-03**: Hints are finite or cooldown-based (TBD during implementation)

### Meta & Persistence

- [ ] **META-01**: Game state saves automatically on every move (MMKV)
- [ ] **META-02**: App resumes exactly where left off on launch
- [ ] **META-03**: User can view their current High Score
- [ ] **META-04**: High Score persists across sessions

### Audio

- [ ] **AUDIO-01**: Sound effects play on Tap, Match, and Add Lines
- [ ] **AUDIO-02**: User can toggle sound on/off in Settings

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Modes & Stats

- **MODE-02**: Random Mode (random starting numbers)
- **MODE-03**: Quick Mode (smaller grid)
- **META-05**: Detailed Stats (Games played, win rate, time)
- **META-06**: Local Leaderboard (Top 10 scores)

### Audio

- **AUDIO-03**: Background ambient music
- **AUDIO-04**: Custom sound themes

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Online Multiplayer | Strictly offline-first experience |
| Ads / IAP | v1 focus is on core gameplay quality |
| Light Mode | "Sleek" brand is defined by Dark Mode |
| Social Sharing | Keep it private and local |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| GAME-01 | Phase 1 | Pending |
| GAME-02 | Phase 1 | Pending |
| GAME-03 | Phase 1 | Pending |
| GAME-04 | Phase 2 | Pending |
| GAME-05 | Phase 2 | Pending |
| GAME-06 | Phase 2 | Pending |
| GRID-01 | Phase 1 | Pending |
| GRID-02 | Phase 1 | Pending |
| GRID-03 | Phase 3 | Pending |
| GRID-04 | Phase 1 | Pending |
| HELP-01 | Phase 2 | Pending |
| HELP-02 | Phase 3 | Pending |
| HELP-03 | Phase 3 | Pending |
| META-01 | Phase 2 | Pending |
| META-02 | Phase 2 | Pending |
| META-03 | Phase 2 | Pending |
| META-04 | Phase 2 | Pending |
| AUDIO-01 | Phase 3 | Pending |
| AUDIO-02 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 19 total
- Mapped to phases: 19
- Unmapped: 0 ✓

---
*Requirements defined: 2025-02-10*
*Last updated: 2025-02-10 with roadmap phases*
