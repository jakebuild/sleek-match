# Roadmap: Sleek Match

**Core Value:** A frictionless, beautiful puzzle experience that works perfectly offline and respects the player's time.

## Phase 1: Core Mechanics
**Goal:** Users can play the basic matching game on a static board.
**Depends On:** None

### Success Criteria
1. User sees the classic 1-19 sequence in a 9-column dark mode grid.
2. User can tap two matching numbers (equal or sum=10) to clear them.
3. User cannot select numbers that are blocked by non-empty cells (connectivity check).
4. Cleared cells appear visually empty but maintain the grid structure.

### Requirements
- **GAME-01**: User starts with a fixed "Classic" board (numbers 1-19 sequence)
- **GAME-02**: User can select two matching numbers (equal or sum=10) to clear them
- **GAME-03**: Selection logic skips already cleared cells (connectivity check)
- **GRID-01**: Grid renders 9 columns with high performance (FlashList)
- **GRID-02**: Cleared cells remain visually empty (preserving grid structure)
- **GRID-04**: UI is strictly Dark Mode with minimalist aesthetic

## Phase 2: Game Loop & Persistence
**Goal:** Users can play a full session with progress saving and helpers.
**Depends On:** Phase 1

### Success Criteria
1. User can add new lines when running out of moves (duplicating remaining numbers).
2. User sees "Game Over" or "Win" state when appropriate.
3. User can undo the last move.
4. User can close the app and resume exactly where they left off.
5. High score updates and persists across app restarts.

### Requirements
- **GAME-04**: User can "Add Lines" to duplicate remaining numbers to the bottom
- **GAME-05**: Game detects "No Moves Left" state (Win or Lose condition)
- **GAME-06**: User can reset the board to start over
- **HELP-01**: User can Undo the last move
- **META-01**: Game state saves automatically on every move (MMKV)
- **META-02**: App resumes exactly where left off on launch
- **META-03**: User can view their current High Score
- **META-04**: High Score persists across sessions

## Phase 3: Polish & Experience
**Goal:** Users enjoy a fluid, responsive experience with audio feedback.
**Depends On:** Phase 2

### Success Criteria
1. User sees smooth animations when matches occur or lines are added (60fps).
2. User can request a hint to find a valid move.
3. User hears sound effects on actions (unless toggled off).
4. User can complete a game session with no visual jank.

### Requirements
- **GRID-03**: Animations play smoothly (60fps) on match and add lines
- **HELP-02**: User can request a Hint (highlights a valid pair)
- **HELP-03**: Hints are finite or cooldown-based (TBD during implementation)
- **AUDIO-01**: Sound effects play on Tap, Match, and Add Lines
- **AUDIO-02**: User can toggle sound on/off in Settings

## Progress

| Phase | Status | Completion |
|-------|--------|------------|
| Phase 1: Core Mechanics | **Planned** | 0% |
| Phase 2: Game Loop & Persistence | Pending | 0% |
| Phase 3: Polish & Experience | Pending | 0% |
