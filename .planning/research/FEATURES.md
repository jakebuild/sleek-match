# Feature Research

**Domain:** Number Match (Ten Pair) Game
**Researched:** 2026-02-10
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Core Matching Logic** | Fundamental gameplay: Match pairs (Equal or Sum 10). | MEDIUM | Must handle adjacent (H/V/D) and wrap-around logic. |
| **Add Lines** | Standard mechanic when no matches exist. | LOW | Duplicates remaining numbers to grid bottom. |
| **Undo** | Critical for logic puzzles; users make mistakes. | LOW | Stack-based state history. |
| **Hints** | Users get stuck; standard monetization/help hook. | MEDIUM | Pathfinding algo to find valid pair. |
| **Save/Resume** | Games can be long (endless); must not lose progress. | LOW | Auto-save on move/backgrounding. |
| **Tutorial/How-to** | Rules are slightly complex for new players. | LOW | Interactive overlay or static guide. |
| **Game Over State** | Clear condition when board is full and no matches. | LOW | Check available moves after "Add Lines". |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Offline First** | Competitors often require connection for ads. | LOW | "Sleek" value prop; no network deps. |
| **Minimalist UI** | Competitors are often cluttered/noisy. | MEDIUM | Focus on smooth anims, clean typography. |
| **Dark Mode** | Essential for night play; "Sleek" aesthetic. | LOW | Theming engine (Context API/store). |
| **Statistics Dashboard** | Long-term engagement; "Quantified Self" for gamers. | LOW | Track wins, high score, total pairs cleared. |
| **No Intrusive Ads** | Major user pain point in Easybrain version. | N/A | Business model decision; improves retention. |
| **Custom Grid Sizes** | Accessbility/Preference (e.g., Big Numbers). | MEDIUM | Dynamic layout rendering. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Interstitial Ads** | Monetization. | Destroys flow/Zen state; high churn. | Banner ads (bottom) or strictly Rewarded Video. |
| **Pay-to-Win Consumables** | "Erasers" / "Bombs". | Trivializes the puzzle challenge. | Unlimited logical hints (maybe with cooldown). |
| **Real-time Multiplayer** | "Play with friends". | High latency/complexity; niche appeal. | Leaderboards (async competition). |
| **Complex 3D Graphics** | "Looks cool". | Battery drain; distracts from logic. | Clean, high-contrast 2D (Canvas/SVG). |

## Feature Dependencies

```
[Core Matching Logic]
    └──requires──> [Grid State Management]

[Undo]
    └──requires──> [Command History Stack]
                       └──requires──> [Grid State Management]

[Hints]
    └──requires──> [Pathfinding/Scan Algorithm]
                       └──requires──> [Grid State Management]

[Statistics]
    └──requires──> [Persistence Layer]
                       └──requires──> [Game Event Triggers]

[Save/Resume]
    └──requires──> [Persistence Layer]
```

### Dependency Notes

- **Undo requires Command History:** Needs a snapshot or diff of the grid state before every move.
- **Hints requires Pathfinding:** Must efficiently scan the grid for *any* valid move according to complex adjacency rules.
- **Statistics requires Persistence:** Data must survive app restarts to be meaningful.

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [ ] **Core Game Loop:** Grid generation, matching (Same/10), Add Lines.
- [ ] **Undo System:** At least 1 level of undo, ideally infinite/stack.
- [ ] **Hint System:** Basic valid move highlighter.
- [ ] **Persistence:** Auto-save game state locally.
- [ ] **Basic UI:** Clean Light/Dark mode.
- [ ] **Tutorial:** Simple static modal explaining rules.

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] **Statistics Dashboard:** Win rates, streaks.
- [ ] **Daily Challenges:** Seeded puzzles.
- [ ] **Animations:** Polish for merging/clearing pairs.

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] **Themes:** unlockable color palettes.
- [ ] **Leaderboards:** Global rankings.
- [ ] **Advanced Modes:** "Crazy" mode, "Speed" mode.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Core Matching | CRITICAL | MEDIUM | P1 |
| Save/Resume | CRITICAL | LOW | P1 |
| Undo | HIGH | LOW | P1 |
| Hints | HIGH | MEDIUM | P1 |
| Offline Mode | HIGH | LOW | P1 |
| Dark Mode | MEDIUM | LOW | P2 |
| Statistics | MEDIUM | LOW | P2 |
| Animations (Polish) | MEDIUM | MEDIUM | P2 |
| Daily Challenges | LOW | HIGH | P3 |
| Leaderboards | LOW | HIGH | P3 |

## Competitor Feature Analysis

| Feature | Easybrain (Market Leader) | Classic Pen & Paper | Sleek Match (Us) |
|---------|---------------------------|---------------------|------------------|
| **Monetization** | Aggressive Ads + IAP | None | Free / Minimal Ads |
| **Visuals** | Standard, somewhat busy | N/A | Minimalist, Zen |
| **Game Modes** | Classic, Daily, Events | Classic | Classic, Endless |
| **Tools** | Hints, Undo, Bombs (IAP) | None | Hints, Undo (Free) |
| **Connectivity** | Online (for Ads/Events) | Offline | 100% Offline |

## Sources

- **Easybrain Number Match:** App Store reviews & gameplay analysis.
- **Genre Research:** "Ten Pair", "Take Ten", "Seeds" game rules.
- **User Feedback:** Common complaints about battery drain and ad frequency in competitor apps.
