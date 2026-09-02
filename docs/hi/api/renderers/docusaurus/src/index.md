[pantoken](../../../index.md) / docusaurus

# docusaurus

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

`@pantoken/docusaurus` — theme a Docusaurus site with Instructure tokens.

Docusaurus styles come from Infima, whose theming is driven by `--ifm-*` CSS variables. This
points those at `var(--instui-*)`, so dropping the output into `src/css/custom.css` (alongside
`@pantoken/css`, which defines the custom properties) re-skins the docs with the Instructure look
while light/dark keeps flowing through the same tokens.

## इंटरफेस

- [ToDocusaurusCssOptions](interfaces/ToDocusaurusCssOptions.md)

## वैरिएबल्स

- [INFIMA\_TO\_INSTUI](variables/INFIMA_TO_INSTUI.md)
- [docusaurusCss](variables/docusaurusCss.md)

## फंक्शन्स

- [toDocusaurusCss](functions/toDocusaurusCss.md)

## संदर्भ

### default

Renames and re-exports [docusaurusCss](variables/docusaurusCss.md)
