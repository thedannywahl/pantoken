[pantoken](../../../index.md) / mintlify

# mintlify

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

`@pantoken/mintlify` — theme a Mintlify docs site with Instructure tokens.

[toMintlifyConfig](functions/toMintlifyConfig.md) maps any IR onto the `colors` + `background` keys of a Mintlify
`docs.json`; [docsJson](variables/docsJson.md) is the ready-made `rebrand` fragment. Merge it into your `docs.json`.

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

## Grensesnitt

- [MintlifyColors](interfaces/MintlifyColors.md)
- [MintlifyBackground](interfaces/MintlifyBackground.md)
- [MintlifyTheme](interfaces/MintlifyTheme.md)

## Variabler

- [docsJson](variables/docsJson.md)

## Funksjoner

- [toMintlifyConfig](functions/toMintlifyConfig.md)

## Referanser

### default

Renames and re-exports [docsJson](variables/docsJson.md)
