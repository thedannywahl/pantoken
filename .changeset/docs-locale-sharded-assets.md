---
"@pantoken/docs": patch
---

Build the docs site one locale at a time into `assets/<locale>/` and merge the results, so no single directory approaches Netlify's 54,000-file deploy limit (the flat `assets/` directory reached ~78,000). Cross-locale navigation falls back to a full page load, since each build's client router only knows its own pages. Partial deploys now rebuild only the locales that changed and carry the previous `hashmap.json` and `sitemap.xml` forward instead of overwriting them.
