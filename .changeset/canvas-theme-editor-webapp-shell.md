---
"@pantoken/scaffold": patch
---

Add a standalone app shell for the generated Canvas Theme Editor: it now renders a browser-style top frame in standalone tabs, includes a proper web app manifest and theme metadata, and keeps the iframe-based docs preview unchanged. The shell includes Lucide locale and palette controls with a color and appearance dropdown, and it uses the system color scheme for the page background when opened as a web app.
