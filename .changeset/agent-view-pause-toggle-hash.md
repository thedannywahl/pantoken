---
"@pantoken/docs": patch
---

"Get started" widget: fix the agent view's tool-selector popover being clipped by the terminal
chrome (ancestors no longer `overflow: hidden`; the chrome's own rounded corners are preserved by
clipping only the decorative gradient layer). Add a small pause/play toggle to the terminal chrome
that stops or restarts the typing animation on both tabs. Opening the page with a `#ai` URL hash now
starts the widget on the agent tab. The Amazon Q Developer CLI option now uses its own `amazon-q`
icon instead of a bare "q" glyph.
