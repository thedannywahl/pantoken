---
"@pantoken/docs": patch
---

Fix the agent view's line wrapping: it used `display: flex; flex-wrap: wrap`, which wraps whole
flex items (icon/launcher/suffix/cursor) rather than the text itself — visible once the prompt grew
past a single line, breaking right after the tool name and stranding the cursor on its own
near-empty line. Switched to plain inline flow (`display: inline-block`), so it wraps at word
boundaries within the text and keeps the cursor glued to wherever the text currently ends.
