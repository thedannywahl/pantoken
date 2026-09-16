---
"@pantoken/docs": patch
---

Fix the home page's social card generator printing raw HTML markup (`<br/>`, `<span>`) from `hero.text`/`hero.tagline` instead of plain text, and fix the animated platform pill's icon and label rendering misaligned until the next window resize.
