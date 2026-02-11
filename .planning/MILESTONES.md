# Milestones: Sleek Match

## v1.0 — Core Game (Complete)

**Shipped:** 2026-02-10
**Phases:** 1-3

### What Shipped
- 9x9 grid with random numbers 1-9
- Match equal numbers or sum-to-10 pairs
- 8-direction connectivity (horiz, vert, diagonal) skipping cleared cells
- Row wrapping (end of line connects to next line start)
- Add Lines (duplicate remaining numbers to bottom)
- Win detection (all cleared) and no-moves detection
- Undo last move
- Score tracking with persistent high score
- MMKV auto-save and resume on launch
- Spring scale animations and hint pulse
- Hint system (highlights valid pair)
- Sound toggle infrastructure (expo-av)
- Dark mode UI (#121212 background, #BB86FC accent)

### UAT Results
- 14/15 tests passed
- 1 skipped (MMKV persistence — requires device build)
- 2 post-UAT gaps found and fixed (board generation, diagonal connectivity)

### Key Decisions Made
- FlatList over FlashList (web compatibility)
- Zustand for state management
- MMKV v4 with graceful fallback
- RN Animated over Reanimated (simplicity)

---

## v1.1 — Settings & Theming (In Progress)

**Started:** 2026-02-11
**Phases:** 4+

### Goals
- Light/dark theme with system-default and manual override
- Settings screen (gear icon in header)
- Game Rules screen
- Report Issue (GitHub issues link)
- About page
- Privacy Policy and Terms & Conditions
