---
"@pantoken/scaffold": patch
---

Several fixes to the canvas theme editor scaffold:

- The editor's own content now follows the app chrome's dark/light appearance (previously only the chrome, not the TinyMCE editing surface, went dark).
- "None"/local CDN mode now resolves icon CSS assets (per-icon and bundle stylesheets, across all four icon sources) from local node_modules instead of always falling back to a remote CDN fetch.
- The standalone shell's Appearance menu defaults to "System" instead of showing nothing selected.
- The Color menu now shows all 13 pantoken colors (previously a hardcoded 7) with the same swatch discs used elsewhere, and long color/locale lists scroll within the dropdown instead of overflowing off-screen.
- The brand mark uses pantoken's own logomark instead of a generic palette icon, colored with the active theme color instead of a hardcoded gradient.
