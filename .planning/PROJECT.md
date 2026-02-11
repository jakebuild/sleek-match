# Sleek Match

## What This Is

A minimalist, offline-first Number Match puzzle game built with Expo. Players clear the board by matching pairs of equal numbers or sums of 10, with smooth animations, light/dark theming, and a clean settings experience including game rules, about, and legal pages.

## Core Value

A frictionless, beautiful puzzle experience that works perfectly offline and respects the player's time with instant resume and fluid interactions.

## Current Milestone: v1.1 Settings & Theming

**Goal:** Add light mode support, settings screen, and informational pages so the app feels complete and app-store ready.

**Target features:**
- Light/dark theme with system-default and manual override
- Settings screen accessible via header gear icon
- Game Rules explanation screen
- Report Issue (links to GitHub issues)
- About page (app name, version, developer)
- Privacy Policy page (template content)
- Terms & Conditions page (template content)

## Requirements

### Validated

- **Game Engine**: 9-column grid with "skip empty" connectivity logic (v1.0)
- **Matching Logic**: Pair matching (equal numbers or sum = 10) (v1.0)
- **Add Lines**: Duplicate remaining numbers to the bottom of the grid (v1.0)
- **Helpers**: Undo and Hint functionality (v1.0)
- **UI/UX**: Minimalist dark mode design with smooth animations (v1.0)
- **Offline**: 100% offline functionality with local state persistence (v1.0)

### Active

- [ ] **Theming**: Light/dark mode with system-default and manual override
- [ ] **Settings**: Settings screen as hub for app configuration and info pages
- [ ] **Game Rules**: Screen explaining how to play
- [ ] **Report Issue**: Link to GitHub issues from settings
- [ ] **About**: App name, version, developer info
- [ ] **Legal**: Privacy Policy and Terms & Conditions pages

### Out of Scope

- **Online Multiplayer**: Strictly single-player offline experience
- **Ads/In-App Purchases**: Not in current scope
- **Social Sharing**: Keep it private and local
- **In-app issue form**: Report Issue opens external GitHub issues URL, no in-app form
- **Custom legal content**: Using generated template content for legal pages

## Context

Building a modern, polished version of the classic "Number Match" / "Ten Pair" logic.
- **Stack**: Expo (React Native) for cross-platform mobile.
- **State**: Persists locally via MMKV with graceful fallback.
- **Performance**: Animations at 60fps using RN Animated API.
- **v1.0 shipped**: Core mechanics, game loop, persistence, polish (3 phases complete).
- **v1.1 focus**: Theming, settings hub, and informational screens.

## Constraints

- **Tech Stack**: Expo (React Native)
- **Visuals**: Light and dark mode, minimalist, smooth animations
- **Connectivity**: 100% Offline (no server dependencies)
- **Grid**: Fixed 9-column layout
- **Navigation**: Settings screen from header gear icon (no tabs or drawer)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| **Expo** | Rapid cross-platform development | ✓ Good |
| **Offline-First** | Core value proposition; no server costs | ✓ Good |
| **Dark Mode Only (v1)** | Simplified initial design | ✓ Good — expanding to light mode in v1.1 |
| **FlatList** | Web compatibility (FlashList swapped out) | ✓ Good |
| **Zustand** | Lightweight state management | ✓ Good |
| **MMKV v4** | `createMMKV()` API with graceful fallback | ✓ Good |
| **RN Animated** | Used over Reanimated for simplicity | ✓ Good |
| **9x9 Random Grid** | 81 cells of random 1-9 (not classic 1-19 sequence) | ✓ Good |
| **System + Manual Theme** | Defaults to system setting, user can override | — Pending |
| **Settings from Header** | Gear icon opens settings screen, hub for all pages | — Pending |
| **GitHub Issues for Reports** | Opens browser to GitHub issues, no in-app form | — Pending |

---
*Last updated: 2026-02-11 after v1.1 milestone start*
