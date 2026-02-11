# Roadmap: Sleek Match

## Milestones

- ✅ **v1.0 MVP** - Phases 1-3 (shipped 2026-02-10)
- 🚧 **v1.1 Settings & Theming** - Phases 4-6 (in progress)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-3) - SHIPPED 2026-02-10</summary>

### Phase 1: Core Mechanics
**Goal**: Users can play the basic matching game on a static board.
**Requirements**: GAME-01, GAME-02, GAME-03, GRID-01, GRID-02, GRID-04
**Success Criteria** (what must be TRUE):
  1. User sees a 9x9 grid (81 cells) of random numbers 1-9 in a 9-column dark mode grid.
  2. User can tap two matching numbers (equal or sum=10) to clear them.
  3. User cannot select numbers that are blocked by non-empty cells (connectivity check across horizontal, vertical, and diagonal directions).
  4. Cleared cells appear visually empty but maintain the grid structure.

### Phase 2: Game Loop & Persistence
**Goal**: Users can play a full session with progress saving and helpers.
**Requirements**: GAME-04, GAME-05, GAME-06, HELP-01, META-01, META-02, META-03, META-04
**Success Criteria** (what must be TRUE):
  1. User can add new lines when running out of moves (duplicating remaining numbers).
  2. User sees "Game Over" or "Win" state when appropriate.
  3. User can undo the last move.
  4. User can close the app and resume exactly where they left off.
  5. High score updates and persists across app restarts.

### Phase 3: Polish & Experience
**Goal**: Users enjoy a fluid, responsive experience with audio feedback.
**Requirements**: GRID-03, HELP-02, HELP-03, AUDIO-01, AUDIO-02
**Success Criteria** (what must be TRUE):
  1. User sees smooth animations when matches occur or lines are added (60fps).
  2. User can request a hint to find a valid move.
  3. User hears sound effects on actions (unless toggled off).
  4. User can complete a game session with no visual jank.

</details>

### 🚧 v1.1 Settings & Theming (In Progress)

**Milestone Goal:** Add light mode support, settings screen, and informational pages so the app feels complete and app-store ready.

- [x] **Phase 4: Settings & Navigation** - Screen structure and navigation skeleton
- [x] **Phase 5: Theming** - Light/dark/system theme with persistence
- [ ] **Phase 6: Info & Legal Screens** - Rules, about, report issue, privacy, and terms

## Phase Details

### Phase 4: Settings & Navigation
**Goal**: User can access a settings hub from the game header and navigate back
**Depends on**: Phase 3 (v1.0 complete)
**Requirements**: NAV-01, NAV-02, NAV-03
**Success Criteria** (what must be TRUE):
  1. User can tap a gear icon in the game header to open the settings screen.
  2. Settings screen displays links for theme toggle, rules, report issue, about, and legal pages.
  3. User can navigate back to the game from the settings screen.
**Plans**: 1 plan

Plans:
- [x] 04-01-PLAN.md — Add stack navigation, gear icon in header, and settings hub screen

### Phase 5: Theming
**Goal**: App appearance adapts to user's theme preference with persistence
**Depends on**: Phase 4 (settings screen exists for theme toggle)
**Requirements**: THEME-01, THEME-02, THEME-03, THEME-04
**Success Criteria** (what must be TRUE):
  1. App launches in the device's system theme (light or dark) by default.
  2. User can select Light, Dark, or System from a theme toggle in settings.
  3. User's theme preference persists across app restarts.
  4. All existing screens (game, settings) render correctly in both light and dark themes.
**Plans**: 2 plans

Plans:
- [x] 05-01-PLAN.md — Theme infrastructure: color palettes, theme store, ThemeContext, and app shell wiring
- [x] 05-02-PLAN.md — Migrate all components to useTheme(), wire settings selector, visual verification

### Phase 6: Info & Legal Screens
**Goal**: User can access game rules, about info, report issues, and legal pages from settings
**Depends on**: Phase 4 (navigation exists), Phase 5 (theming applied)
**Requirements**: INFO-01, INFO-02, INFO-03, LEGAL-01, LEGAL-02
**Success Criteria** (what must be TRUE):
  1. User can view a rules screen explaining matching, connectivity, add lines, hints, and win condition.
  2. User can view an About page showing app name, version, and developer info.
  3. User can tap Report Issue to open GitHub issues in the device's browser.
  4. User can view Privacy Policy and Terms & Conditions pages from settings.
**Plans**: TBD

Plans:
- [ ] 06-01: TBD

## Progress

**Execution Order:** 4 → 5 → 6

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Core Mechanics | v1.0 | 3/3 | Complete | 2026-02-10 |
| 2. Game Loop & Persistence | v1.0 | 3/3 | Complete | 2026-02-10 |
| 3. Polish & Experience | v1.0 | 3/3 | Complete | 2026-02-10 |
| 4. Settings & Navigation | v1.1 | 1/1 | Complete | 2026-02-11 |
| 5. Theming | v1.1 | 2/2 | Complete | 2026-02-11 |
| 6. Info & Legal Screens | v1.1 | 0/? | Not started | - |
