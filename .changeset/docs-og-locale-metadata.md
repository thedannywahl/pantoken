---
"@pantoken/docs": patch
---

Localized the docs site's page metadata and social card: the `og:description`/`twitter:description`
meta tags and the `WebSite` JSON-LD (`description`, `url`, `inLanguage`) now use each locale's
translated copy instead of always showing the English site description — previously visiting `/hu/`
still reported the English description in its structured data. The OG/Twitter card image
(`og.png`) is now generated per Latin-script locale from that locale's own home page `hero.text`/
`hero.tagline` (e.g. `og-hu.png`), so a shared `/hu/` link unfurls with a Hungarian-language card;
locales whose script the bundled card font doesn't cover fall back to the English card, matching the
existing non-Latin wordmark-logo fallback.
