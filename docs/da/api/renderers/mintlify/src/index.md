[pantoken](../../../index.md) / mintlify

# mintlify

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

`@pantoken/mintlify` — tema en Mintlify docs-side med Instructure-tokens.

[toMintlifyConfig](functions/toMintlifyConfig.md) kortlægger enhver IR på `colors` + `background` nøgler af en Mintlify
`docs.json`; [docsJson](variables/docsJson.md) er det færdige `rebrand` fragment. Flet det ind i din `docs.json`.

## Eksempel

```jsonc
// docs.json
{
  "name": "My docs",
  "theme": "mint",
  "colors": { "primary": "#1D354F", "light": "#EEF4FD", "dark": "#1D354F" },
  "background": { "color": { "light": "#F2F4F5", "dark": "#10141A" } }
}
```

## Interfaces

- [MintlifyColors](interfaces/MintlifyColors.md)
- [MintlifyBackground](interfaces/MintlifyBackground.md)
- [MintlifyTheme](interfaces/MintlifyTheme.md)

## Variabler

- [docsJson](variables/docsJson.md)

## Funktioner

- [toMintlifyConfig](functions/toMintlifyConfig.md)

## Referencer

### default

Omdøber og gen-eksporterer [docsJson](variables/docsJson.md)
