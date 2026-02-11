# Requirements: Sleek Match

**Defined:** 2026-02-10
**Core Value:** A frictionless, beautiful puzzle experience that works perfectly offline and respects the player's time.

## v1.1 Requirements

Requirements for milestone v1.1: Settings & Theming. Each maps to roadmap phases.

### Theming

- [ ] **THEME-01**: User's app theme matches device system setting by default
- [ ] **THEME-02**: User can manually override theme (Light / Dark / System) in settings
- [ ] **THEME-03**: User's theme preference persists across app restarts
- [ ] **THEME-04**: All screens adapt colors to the selected theme

### Navigation & Settings

- [ ] **NAV-01**: User can tap a gear icon in the game header to open settings
- [ ] **NAV-02**: Settings screen displays links to theme toggle, rules, report issue, about, and legal pages
- [ ] **NAV-03**: User can navigate back to the game from any screen

### Info Screens

- [ ] **INFO-01**: User can view game rules explaining matching, connectivity, add lines, hints, and win condition
- [ ] **INFO-02**: User can view About page showing app name, version, and developer
- [ ] **INFO-03**: User can tap Report Issue to open GitHub issues in device browser

### Legal

- [ ] **LEGAL-01**: User can view Privacy Policy page
- [ ] **LEGAL-02**: User can view Terms & Conditions page

## v1.0 Requirements (Validated)

Shipped and confirmed in v1.0.

### Core Gameplay

- [x] **GAME-01**: User starts with a 9x9 grid of random numbers 1-9
- [x] **GAME-02**: User can select two matching numbers (equal or sum=10) to clear them
- [x] **GAME-03**: Selection logic skips already cleared cells (connectivity check across horizontal, vertical, and diagonal)
- [x] **GAME-04**: User can "Add Lines" to duplicate remaining numbers to the bottom
- [x] **GAME-05**: Game detects "No Moves Left" state (Win or Lose condition)
- [x] **GAME-06**: User can reset the board to start over

### Grid & Visuals

- [x] **GRID-01**: Grid renders 9 columns with FlatList
- [x] **GRID-02**: Cleared cells remain visually empty (preserving grid structure)
- [x] **GRID-03**: Animations play smoothly (60fps) on match and add lines
- [x] **GRID-04**: UI is Dark Mode with minimalist aesthetic

### Helpers

- [x] **HELP-01**: User can Undo the last move
- [x] **HELP-02**: User can request a Hint (highlights a valid pair)

### Meta & Persistence

- [x] **META-01**: Game state saves automatically on every move (MMKV)
- [x] **META-02**: App resumes exactly where left off on launch
- [x] **META-03**: User can view their current High Score
- [x] **META-04**: High Score persists across sessions

### Audio

- [x] **AUDIO-01**: Sound effects infrastructure (expo-av)
- [x] **AUDIO-02**: User can toggle sound on/off

## Future Requirements

Deferred beyond v1.1.

### Modes & Stats

- **MODE-02**: Random Mode (random starting numbers)
- **MODE-03**: Quick Mode (smaller grid)
- **META-05**: Detailed Stats (Games played, win rate, time)
- **META-06**: Local Leaderboard (Top 10 scores)

### Audio

- **AUDIO-03**: Actual sound effect files bundled in assets/sounds/
- **AUDIO-04**: Background ambient music

### Polish

- **HAPTIC-01**: Haptic feedback on match and actions
- **PERF-01**: Optimize history storage for long sessions

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Online Multiplayer | Strictly single-player offline experience |
| Ads / IAP | Not in current scope |
| Social Sharing | Keep it private and local |
| In-app issue form | Report Issue opens external GitHub issues URL |
| Custom legal content | Using generated template content for v1.1 |
| Drawer/tab navigation | Settings accessed via header gear icon only |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 4 | Pending |
| NAV-02 | Phase 4 | Pending |
| NAV-03 | Phase 4 | Pending |
| THEME-01 | Phase 5 | Pending |
| THEME-02 | Phase 5 | Pending |
| THEME-03 | Phase 5 | Pending |
| THEME-04 | Phase 5 | Pending |
| INFO-01 | Phase 6 | Pending |
| INFO-02 | Phase 6 | Pending |
| INFO-03 | Phase 6 | Pending |
| LEGAL-01 | Phase 6 | Pending |
| LEGAL-02 | Phase 6 | Pending |

**Coverage:**
- v1.1 requirements: 12 total
- Mapped to phases: 12
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-11*
*Last updated: 2026-02-11 after v1.1 milestone definition*
