---
"@pantoken/docs": patch
---

fix(docs): keep the Getting Started terminal/agent mode icons white in every state

The `-on-color` button modifier filled a solid white background (per its documented behavior), and
the scoped override meant to force white text targeted a mistyped `.on-color` class that never
matched, so the icons fell back to a theme-dependent ghost color that read poorly on hover/active.
Removed `-on-color` and replaced the dead rule with a `.instui-button.gs-started__mode-btn` color
override specific enough to win over `-without-background` in every state.
