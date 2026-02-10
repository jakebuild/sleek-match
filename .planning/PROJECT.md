# Sleek Match

## What This Is

A minimalist, offline-first Number Match puzzle game built with Expo. Players clear the board by matching pairs of equal numbers or sums of 10, with smooth animations and a focus on clean, dark-mode aesthetics.

## Core Value

A frictionless, beautiful puzzle experience that works perfectly offline and respects the player's time with instant resume and fluid interactions.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **Game Engine**: 9-column grid with "skip empty" connectivity logic
- [ ] **Matching Logic**: Pair matching (equal numbers or sum = 10)
- [ ] **Add Lines**: Duplicate remaining numbers to the bottom of the grid
- [ ] **Game Modes**: Standard (Clear Board) and Endless (High Score)
- [ ] **Helpers**: Undo and Hint functionality
- [ ] **UI/UX**: Minimalist dark mode design with smooth animations for matches and updates
- [ ] **Offline**: 100% offline functionality with local state persistence

### Out of Scope

- **Online Multiplayer**: Strictly single-player offline experience
- **Ads/In-App Purchases**: Focus on core gameplay first (v1)
- **Complex Theming**: Dark mode only for v1
- **Social Sharing**: Keep it private and local

## Context

Building a modern, polished version of the classic "Number Match" / "Ten Pair" logic.
- **Stack**: Expo (React Native) for cross-platform mobile.
- **State**: Must persist locally (AsyncStorage or MMKV) to allow closing and resuming app without losing progress.
- **Performance**: Animations must be 60fps; "Add Lines" can create many items, so list performance (FlashList/RecyclerListView) might be needed.

## Constraints

- **Tech Stack**: Expo (React Native)
- **Visuals**: Dark mode, minimalist, smooth animations
- **Connectivity**: 100% Offline (no server dependencies)
- **Grid**: Fixed 9-column layout

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| **Expo** | Rapid cross-platform development | — Pending |
| **Offline-First** | Core value proposition; no server costs | — Pending |
| **Dark Mode Only** | Simplifies initial design and fits "Sleek" theme | — Pending |

---
*Last updated: 2025-02-10 after initialization*
